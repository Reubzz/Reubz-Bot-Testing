const { Client, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'add-level-role',
    description: 'Adds a Level Role',
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: 'level',
            description: 'Target level for the role',
            required: true,
            type: "STRING",
        },
        {
            name: 'role',
            description: 'Role given when the level is reached',
            required: true,
            type: "ROLE",
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const level = interaction.options.getString('level');
        const role = interaction.options.getRole('role');

        xp.roleSetup.add(client, interaction.guild.id, {
            level: level,
            role: role.id,
        }).then((added) => {
            if(added) {
                interaction.followUp({ content: `Added ${role} role for ${level} Level`, allowedMentions: { parse: [] } })
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