const { Client, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const imageDB = require('../../../models/CustomRankCard')

module.exports = {
    name: 'rank',
    aliases: ['r', 'level'],
    description: 'Rank Command',
    ownerOnly: false,
    toggleOff: false,
    botpermissions: ["SEND_MESSAGES"],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        
        const member = message.mentions.members.first()?.id || message.author.id
        const user = await imageDB.findOne({ user: member, gid: message.guild.id })
        
        const bgimage = user? user.img : 'https://i.imgur.com/EnPpetR.jpg'
        const lvlbar = user? user.lvlbar : '#ffffff'
        
        xp.rank(message, member, message.guild.id, {
            background: bgimage,
            lvlbar: lvlbar,
        }).then((img) => {
            message.reply({ files: [img] });
        }).catch((err) => {
            if(err = TypeError){
                return message.reply({ content: `You are not ranked.` })
            }
            message.reply(err.toString());
        });
    }
};