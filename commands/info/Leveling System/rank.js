const { Client, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const rankk = require('../../../models/functions/rank');

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
    
        await rankk.rankcard(message, member, message.guild.id).then((img) => {
            message.reply({ files: [img] });
        }).catch((err) => {
            if(err = TypeError){
                return message.reply({ content: `You are not ranked.` })
            }
            message.reply(err.toString());
        });
    }
};