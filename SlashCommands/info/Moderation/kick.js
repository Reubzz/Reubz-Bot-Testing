const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks the user Mentioned.",
    userPermissions: ["KICK_MEMBERS"],
    options: [
        {
            name: "user",
            description: "ID of the user to be Kicked.",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Reason of the Kicked.",
            type: "STRING",
            required: true,
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('Reason') || null;

        const kickEmbed = {
            author: {
                name: `${interaction.user.tag} Kicked a ${user}`,
                icon_url: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
            },
            description: `Reason - \`${reason}\``,
            color: '#ff0000',
        }

        await interaction.followUp({ emebeds: [kickEmbed] }) 

        const logChannel = client.channels.cache.get('798518089389441033'); 
        await logChannel.send({ emebeds: [kickEmbed] })

        interaction.guild.members.kick(user, { reason })
    },
};