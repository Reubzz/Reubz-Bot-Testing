const simplydjs = require("simply-djs")
const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "calculator",
    aliases: "calc",
    description: "Interactive Calculator for Discord",
    
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    
    run: async (client, message, args)=>{
        simplydjs.calculator(message, {
            embedColor: "#2F3136",
            credit: false
        })
    }
}