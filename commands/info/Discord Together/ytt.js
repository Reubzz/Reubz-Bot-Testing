const { Client, Message, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require('node-fetch')

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
    name: 'youtube-together',
    aliases: ['ytt'],
    description: 'Watch Youtube in a vc with your friends!',

    run: async (client, message, args) => {
        const channel = message.member.voice.channel

        

        const ytterror = {
            title: 'You must be connected to a VC to use this command',
            color: '#2F3136'
        }
        const ytterror2 = {
            title: 'I was unable to start a yt together session! *P* *A* *I* *N*',
            color: '#2F3136'
        }
        const yttfinal = {
            title: 'Youtube Together',
            description: 'Click the Button below to watch YouTube in VC',
            color: '#2F3136'
        }

        if (!channel) return message.channel.send({ embeds: [ytterror] })

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 3600,
                max_uses: 0,
                target_application_id: defaultApplications.youtube,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send({ embeds: [ytterror2] })
            

            const ytt = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel('Youtube Together')
                    .setEmoji("861892278205415444")
                    .setURL(`https://discord.com/invite/${invite.code}`)
              )


            message.channel.send({ embeds: [yttfinal], components: [ytt] })
        })
    }
}