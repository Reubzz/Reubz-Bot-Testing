const { Client, CommandInteraction, MessageActionRow, MessageButton, Message } = require('discord.js');
const { watchFile } = require('fs');
require('dotenv').config();

module.exports = {
    name: 'restart-bot',
    description: 'Restart the Bot.',
    userPermissions: ["ADMINISTRATOR"],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.followUp({ content: "Restarting Bot ..."})

        // Simple Restart command that throws a error to the console. 
        // And the BAT script which is a Loop that restarts bot whenever it crashes.
        // Using both we have made a simple restart command. 
        setTimeout(() => {
            throw new Error("Restarting Bot!!")
        }, 1000 * 2)
    }
};