const { Client, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const simplydjs = require("simply-djs")

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'Leaderboard Command',
    ownerOnly: false,
    toggleOff: false,
    botpermissions: ["SEND_MESSAGES"],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        await xp.leaderboard(client, message.guild.id, 30).then(board => {
            let a = []
            let b = []
         
            board.forEach(user => {
                if (user.position <= 10) {
                    a.push(`@ ${user.username}   • •   'Lvl: ${user.level}'\n--------------------------------------`)
                } else if (user.position > 10 && user.position <= 20) {
                    b.push(`@ ${user.username}   • •   'Lvl: ${user.level}'\n--------------------------------------`)
                }
            })
         
            let emb = new MessageEmbed()
                .setTitle('Leaderboard')
                .setDescription(`***1 - 10 Users*** **leaderboard**\n\`\`\`\n${a.toString().replaceAll(',', '\n')}\n\`\`\``)
                .setColor('#075FFF')
         
         
            let emb2 = new MessageEmbed()
                .setTitle('Leaderboard')
                .setDescription(`***10 - 20 Users*** **leaderboard**\n\`\`\`\n${b.toString().replaceAll(',', '\n')}\n\`\`\``)
                .setColor('#6a48d1')
         
            let pg = [emb, emb2]
            simplydjs.embedPages(client, message, pg, { slash: false })
        })
    }
};