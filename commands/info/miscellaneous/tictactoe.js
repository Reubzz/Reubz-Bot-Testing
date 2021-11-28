const simplyjs = require("simply-djs");
const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports ={
    name: "tictactoe",
    aliases: ["x&o", "xo", "ox"],
    description: "A interactive Tic Tac Toe Command.",
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        simplyjs.tictactoe(message, {
            embedColor: "#2F3136", 
            embedFoot: "GLHF",
            resultBtn: true
        })
    }
}