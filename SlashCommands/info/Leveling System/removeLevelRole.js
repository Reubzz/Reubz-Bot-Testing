const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove-level-role',
    description: 'Removes a Level Role',
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: 'level',
            required: true,
            description: 'Remove the Target level from Database',
            type: "STRING",
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const level = interaction.options.getString('level');

        xp.roleSetup.remove(client, interaction.guild.id, {
            level: level,
        }).then((removed) => {
            if(removed) {
                interaction.followUp({ content: `Removed Level Roles for Level ${level}` })
            }
        }).catch((err) => {
            let emb = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Error || ${err}`)
                .setColor("RED")

            interaction.followUp({ embeds: [emb] })
        })
    }
};