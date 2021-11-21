const { Client, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "membercount",
    description: "See the Server's Member Count",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        
        interaction.followUp({content: `**${interaction.guild.name}** has **${interaction.guild.memberCount}** members!` })
    }
}