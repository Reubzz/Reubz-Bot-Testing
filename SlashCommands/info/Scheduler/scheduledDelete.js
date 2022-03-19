const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const scheduledSchema = require('../../../models/databases/messageScheduler')

module.exports = {
    name: 'scheduled-message-delete',
    description: 'Deletes a already Scheduled Message.',
    // userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: 'special-id',
            description: 'special id of the scheduled message',
            required: true,
            type: 'STRING',
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        interaction.deleteReply()
        const specialId = interaction.options.getString('special-id');

        const query = { specialId: specialId }
 
        const results = await scheduledSchema.find(query)
        console.log(results)

        if(!results[0]) {
            return interaction.followUp({ content: "Incorrect Special ID", ephemeral: true });
        }
        
        const date = new Date(results[0].date).getTime()/1000
        let deleteEmbed = new MessageEmbed()
            .setTitle('Are you sure you want to Delete this Scheduled Message')
            .setDescription(
                '** **\n'+
                '**__Scheduled Message Details:__**\n'+
                `> Scheduled Date - **<t:${date}:F>**\n`+
                `> Guild Id - **\`${results[0].guildId}\`**\n`+
                `> Channel - ${results[0].channelId}\n`+
                `> Special Id - **\`${results[0].specialId}\`**\n`
            )
            .addField(
                `Recorded Message:`,
                `\`\`\`${results[0].content}\`\`\``
            )
            .setColor('#2f3136')
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

        let acceptRejectEmbed = await interaction.followUp({ embeds: [deleteEmbed], components: [acceptRejectRow], ephemeral: true });
        
        const filter = i => {
            // i.deferUpdate();
            return i.user.id === interaction.user.id;
        };

        acceptRejectEmbed.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 1000 * 10 })
            .then(async (int) => {
                int.deferReply({ ephemeral: false })
                int.deleteReply()
                if(int.customId === 'cancel'){
                    let opCancelled = new MessageEmbed()
                        .setTitle('Message Discarded')
                        .setDescription('Please Rerun the Command if you want to schedule a new message.')
                        .setColor('RED')
                    return interaction.followUp({ embeds: [opCancelled] })
                }
                else if(int.customId === 'confirm'){
                    let opConfirmed = new MessageEmbed()
                        .setTitle('Scheduled Message Deleted')
                        .setDescription(
                            '** **\n'+
                            '**__Deleted Scheduled Message Details:__**\n'+
                            `> Scheduled Date - **<t:${date}:F>**\n`+
                            `> Guild Id - **\`${results[0].guildId}\`**\n`+
                            `> Channel - ${results[0].channelId}\n`+
                            `> Special Id - **\`${results[0].specialId}\`**\n\n`+
                            `> Deleted By - ${interaction.user}`
                        )
                        .addField(
                            `Recorded Message:`,
                            `\`\`\`${results[0].content}\`\`\``
                        )
                        .setColor('RED')

                    await scheduledSchema.deleteMany(query)
                    return interaction.followUp({ embeds: [opConfirmed] })
                    
                }
            }).catch(err => console.log(`No interactions were collected.`));
    }
};