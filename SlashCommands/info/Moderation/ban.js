const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans the user Mentioned.",
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: "user",
            description: "ID of the user to be Banned",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Reason of the Ban.",
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
        const reason = interaction.options.getString('reason') || null;

        const banEmbed = new MessageEmbed()
            .setAuthor(`${interaction.user.tag} Banned a ${user}`, `${interaction.user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`Reason - \`${reason}\``)
            .setColor('RED')

        interaction.followUp({ emebeds: [banEmbed] })

        const logChannel = client.channels.cache.get('798518089389441033');
        logChannel.send({ emebeds: [banEmbed] })

        interaction.guild.members.ban(user, { reason })
    },
};