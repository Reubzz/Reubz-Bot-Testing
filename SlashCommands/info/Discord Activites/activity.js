const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const defaultApplications = {
    'youtube':     '755600276941176913', 
    'poker':       '755827207812677713',
    'betrayal':    '773336526917861400',
    'fishing':     '814288819477020702',
    'chessdev':    '832012586023256104', 
    'chess':       '832012774040141894', 
    'zombsroyale': '519338998791929866'
};


module.exports = {
    name: "activity",
    description: "Start a Activity in your VC",
    options: [
        {
            name: "activity",
            description: "Choose the Activity you would like to Begin",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: 'Youtube Together',
                    value: 'Youtube-Together',
                },
                {
                    name: 'Chess',
                    value: 'Chess',
                },
                {
                    name: 'Betrayl.io',
                    value: 'Betrayl.io',
                },
                {
                    name: 'Fishington',
                    value: 'Fishington',
                },
                {
                    name: 'poker',
                    value: 'Poker',
                }
            ],
        },
        {
            name: 'channel',
            description: 'Choose the Voice Channel you would like to start Activity in.',
            type: 'CHANNEL',
            channelTypes: ['GUILD_VOICE'],
            required: false,
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const channel = interaction.options.getChannel("channel") || interaction.member.voice.channel;
        const activity = interaction.options.getString("activity");

        const embeds = {
            error1: {
                title: 'You need to either Mention a Channel in the Command or be connected to a VC to use this command',
                color: '#2F3136'
            },
            error2: {
                title: `I was unable to start a ${activity} session! *P* *A* *I* *N*`,
                color: '#2F3136'
            },
            final: {
                title: `${activity}`,
                description: `Click the button below to start ${activity} in your VC`,
                color: '#2F3136',
            }
        }
        
        if(!channel){
            interaction.followUp({ embeds: [embeds.error1] });
        }

        if(activity === 'Youtube-Together'){
            var activityApp = defaultApplications.youtube
        }
        if(activity === 'Chess'){
            var activityApp = defaultApplications.chess
        }
        if(activity === 'Betrayl.io'){
            var activityApp = defaultApplications.betrayal
        }
        if(activity === 'Fishington'){
            var activityApp = defaultApplications.fishing
        }
        if(activity === 'Poker'){
            var activityApp = defaultApplications.poker
        }
        

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 3600,
                max_uses: 0,
                target_application_id: activityApp,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return interaction.followUp({ embeds: [embeds.error2] })
            

            const joinBtn = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel(`${activity}`)
                    .setURL(`https://discord.com/invite/${invite.code}`)
              )

            interaction.followUp({ embeds: [embeds.final], components: [joinBtn] })
        })
    },
};