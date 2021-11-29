const simplydjs = require('simply-djs');
const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "rock-paper-scissor",
    aliases: ["rps", "rockpaperscissors", "rock-paper", "rockpaper", "stone-paper", "stonepaperscissor", "stone-paper-scissor"],
    description: "A Rock Paper Scissor game command (Ineractive)",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        simplydjs.rps(message, {
            credit: false,
            embedColor: "2F3136",
            embedFooter: "Reubz Bot",
        })
    }
}
