const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, MessageCollector } = require('discord.js');
const scheduledSchema = require('../../../models/databases/messageScheduler')
const momentTimezone = require('moment-timezone')

module.exports = {
    name: 'schedule-message',
    description: 'Schedules a Message to a future date.',
    // userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: 'channel',
            description: 'Target Channel',
            required: true,
            type: 'CHANNEL',
        },
        {
            name: 'date',
            description: 'Target Date - DD/MM/YYYY',
            required: true,
            type: 'STRING',
        },
        {
            name: 'time',
            description: 'Target Time - HH:MM',
            required: true,
            type: 'STRING',
        },
        {
            name: 'clock-type',
            description: 'AM or PM',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'am',
                    value: 'am',
                },
                {
                    name: 'pm',
                    value: 'pm',
                }
            ]
        },
        {
            name: 'timezone',
            description: 'The Current Timezone you are in.',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'asia/calcutta',
                    value: 'Asia/Calcutta'
                },
            ],
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const channel = interaction.options.getChannel('channel');
        const date = interaction.options.getString('date');
        const time = interaction.options.getString('time');
        const clockType = interaction.options.getString('clock-type');
        const timezone = interaction.options.getString('timezone');

        console.log(date)
        console.log(time)
        console.log(clockType)
        console.log(timezone)

        const specialid = Math.random().toString(36).slice(2);

        let embeds = {
            dateErrEmbed: new MessageEmbed()
                .setTitle('Error || Incorrect Date Format.')
                .setDescription('Please Provide a Valid Date in `DD/MM/YYYY` or `D/M/YYYY` Format')
                .setColor('RED'),
            timeErrEmbed: new MessageEmbed()
                .setTitle('Error || Incorrect Time Format.')
                .setDescription('Please Provide Time in `HH:MM`(12 hr clock) with clock-type `am`/`pm`')
                .setColor('RED'),
            enterMessage: new MessageEmbed()
                .setTitle('Type a Message')
                .setDescription('Enter the Message you would like to schedule.\n\n You have 5 mins to send your message. ')
                .setColor('BLUE'),
            timeoutEmbed: new MessageEmbed()
                .setTitle('Error || Timeout')
                .setDescription('You didn\'t reply in time!!')
                .setColor('RED'),
            opCancelled: new MessageEmbed()
                .setTitle('Message Discarded')
                .setDescription('Please Rerun the Command if you want to schedule a new message.')
                .setColor('RED')
        }
        
        // Checking if date is in Correct Format. 
        if(validatedate(date) != true) {
            return interaction.followUp({ embeds: [embeds.dateErrEmbed] })
        }
        // Checking if Time is in correct Format
        const validTime = validatetime(time, clockType)
        if(validTime == false) {
            return interaction.followUp({ embeds: [embeds.timeErrEmbed] })
        }

        // Date and Time 
        const targetDate = momentTimezone.tz(
            `${date} ${validTime[0]}`,
            `${validTime[1]}`,
            `${timezone}`
        ).valueOf()
        const epoachTime = targetDate/1000
        
        interaction.followUp({ embeds: [embeds.enterMessage] })
         
        const filter = (newMessage) => {
            return newMessage.author.id === interaction.user.id;
        }
    
        interaction.channel.awaitMessages({ 
            filter, max: 1, time: 1000 * 30, errors: ['time'] 
        })
        .then(async (collected) => {
            console.log("entered Collector") // Debug
            const collectedMessage = collected.first()
            collectedMessage.delete()
            // Debug
            console.log(targetDate)
            console.log(collectedMessage.content)
            console.log(interaction.guild.id)
            console.log(channel.id)
            console.log(specialid)
            
            let confirmEmbed = new MessageEmbed()
                .setTitle('Message Recorded!!')
                .setDescription(
                    '** **\n'+
                    '**__Scheduled Message Details:__**\n'+
                    `> Scheduled Date - **<t:${epoachTime}:F>**\n`+
                    `> Guild Id - **\`${interaction.guild.name}\`**\n`+
                    `> Channel - ${channel}\n`+
                    `> Special Id - **\`${specialid}\`**\n`
                )
                .addField(
                    `Recorded Message:`,
                    `\`\`\`${collectedMessage.content}\`\`\``
                )
                .setColor("BLACK")
            let acceptRejectRow = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel('Confirm')
                    .setCustomId('confirm')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setLabel('Cancel')
                    .setCustomId('cancel')
                    .setStyle('DANGER'),
            )
            let acceptRejectEmbed = await interaction.followUp({ embeds: [confirmEmbed], components: [acceptRejectRow], ephemeral: true })
            
            // Confirm Reject Collector
            const filter = i => {
                // i.deferUpdate();
                return i.user.id === interaction.user.id;
            };

            acceptRejectEmbed.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 1000 * 300 })
	            .then(async (int) => {
                    int.deferReply({ ephemeral: false })
                    int.deleteReply()
                    if(int.customId === 'cancel'){
                        return interaction.followUp({ embeds: [embeds.opCancelled] })
                    }
                    else if(int.customId === 'confirm'){
                        let opConfirmed = new MessageEmbed()
                            .setTitle('Message Confirmed')
                            .setDescription(
                                '** **\n'+
                                '**__Scheduled Message Details:__**\n'+
                                `> Scheduled Date - **<t:${epoachTime}:F>**\n`+
                                `> Guild Id - **\`${interaction.guild.name}\`**\n`+
                                `> Channel - ${channel}\n`+
                                `> Special Id - **\`${specialid}\`**\n`
                            )
                            .addField(
                                `Recorded Message:`,
                                `\`\`\`${collectedMessage.content}\`\`\``
                            )
                            .setColor('GREEN')
                        interaction.followUp({ embeds: [opConfirmed] })

                        await new scheduledSchema({
                            date: targetDate,
                            content: collectedMessage.content,
                            guildId: interaction.guild.id,
                            channelId: channel.id,
                            specialId: specialid
                        }).save()
                    }
                })
	            .catch(err => console.log(`No interactions were collected.`));
      
        })
        .catch((e) => {
            return interaction.followUp({ embeds: [embeds.timeoutEmbed] })  
        })
    }
};

// Extra Functions

function validatedate(dateString){      
    let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])[\/]\d{4}$/;      
          
    // Match the date format through regular expression      
    if(dateString.match(dateformat)){      
        let operator = dateString.split('/');      
      
        // Extract the string into month, date and year      
        let datepart = [];      
        if (operator.length>1){      
            pdatepart = dateString.split('/');      
        }      
        let day = parseInt(datepart[0]);
        let month= parseInt(datepart[1]);            
        let year = parseInt(datepart[2]);
              
        // Create list of days of a month      
        let ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];      
        if (month==1 || month>2){      
            if (day>ListofDays[month-1]){      
                ///This check is for Confirming that the date is not out of its range      
                return false;      
            }      
        }else if (month==2){      
            let leapYear = false;      
            if ( (!(year % 4) && year % 100) || !(year % 400)) {      
                leapYear = true;      
            }      
            if ((leapYear == false) && (day>=29)){      
                return false;      
            }else      
            if ((leapYear==true) && (day>29)){      
                console.log('Invalid date format!');      
                return false;      
            }      
        }      
    }else{      
        console.log("Invalid date format!");      
        return false;      
    }      
    return true      
} 
function validatetime(timeString, clockType){
    // let timeformat = /^(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)(am|pm)$/;
    let timeformat12 = /^(1[0-2]|0?[1-9]):([0-5][0-9])$/;
    let timeformat24 = /^(2[0-4]|1[0-9]|0?[1-9]):([0-5][0-9])$/;
    let arr = [];

    if(timeString.match(timeformat12)){
        return arr = [`${timeString} ${clockType}`, 'DD-MM-YYYY HH:mm A'];
    }
    else if(timeString.match(timeformat24)) 
        return arr = [timeString, 'DD-MM-YYYY HH:mm'];
    else 
        return false
}