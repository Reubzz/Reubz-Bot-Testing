const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

//putt-party is Poker Dev
// old Yt Together = '755600276941176913',
const defaultApplications = {
  youtube: '880218394199220334',
  youtubedev: '880218832743055411',
  poker: '755827207812677713',
  betrayal: '773336526917861400',
  fishing: '814288819477020702',
  chess: '832012774040141894',
  chessdev: '832012586023256104',
  lettertile: '879863686565621790',
  wordsnack: '879863976006127627',
  doodlecrew: '878067389634314250',
  awkword: '879863881349087252',
  spellcast: '852509694341283871',
  checkers: '832013003968348200',
  puttparty: '763133495793942528', // Poker Dev 
  sketchyartist: '879864070101172255',
  zombsroyale: '519338998791929866'
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
                    name: 'Poker',
                    value: 'Poker',
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
                    name: 'Chess',
                    value: 'Chess',
                },
                {
                    name: 'Letter-Tile (New)',
                    value: 'Letter-Tile',
                },
                {
                    name: 'Word-Snack (New)',
                    value: 'Word-Snack',
                },
                {
                    name: 'Doodle-Crew (New)',
                    value: 'Doodle-Crew',
                },
                {
                    name: 'Awk-Word (New)',
                    value: 'Awk-Word',
                },
                {
                    name: 'Spell-Cast (New)',
                    value: 'Spell-Cast',
                },
                {
                    name: 'Checkers (New)',
                    value: 'Checkers',
                },
                {
                    name: 'Sketchy-Artist (New) (Not Functional) ',
                    value: 'Sketchy-Artist',
                },
                {
                    name: 'Zombs-Royale (New) (Not Functional)',
                    value: 'Zombs-Royale',
                },
                
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
            }
        }

        if(!channel){
            return interaction.followUp({ embeds: [embeds.error1] });
        }

        if(activity === 'Youtube-Together'){
            var activityApp = defaultApplications.youtube; var appstate = 'STABLE'
        }
        if(activity === 'Poker'){
            var activityApp = defaultApplications.poker; var appstate = 'STABLE'
        }
        if(activity === 'Betrayl.io'){
            var activityApp = defaultApplications.betrayal; var appstate = 'BETA'
        }
        if(activity === 'Fishington'){
            var activityApp = defaultApplications.fishing; var appstate = 'BETA'
        }
        if(activity === 'Chess'){
            var activityApp = defaultApplications.chess; var appstate = 'STABLE'
        }
        if(activity === 'Letter-Tile'){
            var activityApp = defaultApplications.lettertile; var appstate = 'BETA'
        }
        if(activity === 'Word-Snack'){
            var activityApp = defaultApplications.wordsnack; var appstate = 'BETA'
        }
        if(activity === 'Doodle-Crew'){
            var activityApp = defaultApplications.doodlecrew; var appstate = 'BETA'
        }
        if(activity === 'Awk-Word'){
            var activityApp = defaultApplications.awkword; var appstate = 'BETA'
        }
        if(activity === 'Spell-Cast'){
            var activityApp = defaultApplications.spellcast; var appstate = 'BETA'
        }
        if(activity === 'Checkers'){
            var activityApp = defaultApplications.checkers; var appstate = 'BETA'
        }
        if(activity === 'Sketchy-Artist'){
            var activityApp = defaultApplications.sketchyartist; var appstate = 'BETA'
        }
        if(activity === 'Zombs-Royale'){
            var activityApp = defaultApplications.zombsroyale; var appstate = 'BETA'
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

            const final = {
                title: `${activity}`,
                description: `Click the button below to start ${activity} in your VC\n\n **__App State__ ** ** <:arrowRight:898469274308476928>** ** ** **__${appstate}__**`,
                color: '#2F3136',
            }

            interaction.followUp({ embeds: [final], components: [joinBtn] })
        })
    },
};