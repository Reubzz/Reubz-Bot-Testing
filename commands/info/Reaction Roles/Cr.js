const { Message, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "skrossiccr",
    aliases: [],
    ownerOnly: false,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const colors = {
                "title": "Choose Your Desired Color Roles!!",
                "description": "React to the Button corresponding to your desired Color Role.",
                "color": 3092790,
                "fields": [
                  {
                    "name": "\u200B​",
                    "value": "⚫ <a:Sk_Arrow_Right:851396861569794069> <@&844441569497972776>\n\n<:purple:877457711967645737> <a:Sk_Arrow_Right:851396861569794069> <@&848425105339711499>\n\n<:blue:877458169629126666> <a:Sk_Arrow_Right:851396861569794069> <@&847824757717205013>",
                    "inline": true
                  },
                  {
                    "name": "​\u200B",
                    "value": "<:red:877457615255396362> <a:Sk_Arrow_Right:851396861569794069> <@&819145771668471838> \n\n<:pink:877457842188222485> <a:Sk_Arrow_Right:851396861569794069> <@&839503255414767647> \n\n🟢<a:Sk_Arrow_Right:851396861569794069> <@&799164047736045569>",
                    "inline": true
                  },
                  {
                    "name": "​\u200B",
                    "value": "🟠 <a:Sk_Arrow_Right:851396861569794069> <@&851393370524876830> \n\n🟡 <a:Sk_Arrow_Right:851396861569794069> <@&851393931421286400>",
                    "inline": true
                  }
                ]
              }
        const row1 = new MessageActionRow().addComponents(              
            new MessageButton().setStyle('SECONDARY').setLabel('Black').setCustomId('black'),
            new MessageButton().setStyle('SECONDARY').setLabel('Purple').setCustomId('purple'),
            new MessageButton().setStyle('SECONDARY').setLabel('Cyan').setCustomId('cyan'), 
            new MessageButton().setStyle('SECONDARY').setLabel('Red').setCustomId('red'), 
            new MessageButton().setStyle('SECONDARY').setLabel('Pink').setCustomId('pink'),              
            )
        const row2 = new MessageActionRow().addComponents(
            new MessageButton().setStyle('SECONDARY').setLabel('Green').setCustomId('green'),
            new MessageButton().setStyle('SECONDARY').setLabel('Orange').setCustomId('orange'),
            new MessageButton().setStyle('SECONDARY').setLabel('Yellow').setCustomId('yellow'), 
            )

        message.channel.send({ embeds: [colors], components: [row1, row2]})
            
        },
    };