const { Client, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const simplydjs = require("simply-djs");


module.exports = {
    name: 'suggest',
    description: 'Post your Suggestion in a Embed with buttons for others to vote.',
    ownerOnly: false,
    toggleOff: false,
    botpermissions: ["SEND_MESSAGES"],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        simplydjs.suggestSystem(client, message, args, {
            chid: message.channel.id,
            embedColor: "2F3136",
            credit: false,
        });
    }
};