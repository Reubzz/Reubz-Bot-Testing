const xp = require('simply-xp');
const simplydjs = require('simply-djs')
const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'Shows the Leaderboard',
    userPermissions: ["SEND_MESSAGES"],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        /**
         * This function returns
         * {
         *   guildID: '798518088697774101',
         *   userID: '331382684188409857',
         *   xp: 82,
         *   shortxp: '82',
         *   level: 0,
         *   position: 1,
         *   username: 'Reubz',
         *   tag: 'Reubz#9153'
         * }
         */
        
        await xp.leaderboard(client, interaction.guild.id, 25).then(board => {
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
                .setDescription(`***1 - 10 Users*** **leaderboard**\n\`\`\`py\n${a.toString().replaceAll(',', '\n')}\n\`\`\``)
                .setColor('#075FFF')
         
         
            let emb2 = new MessageEmbed()
                .setTitle('Leaderboard')
                .setDescription(`***10 - 20 Users*** **leaderboard**\n\`\`\`py\n${b.toString().replaceAll(',', '\n')}\n\`\`\``)
                .setColor('#6a48d1')
         
            let pg = [emb, emb2]
            simplydjs.embedPages(client, interaction, pg, { slash: true })
        })
    }
};