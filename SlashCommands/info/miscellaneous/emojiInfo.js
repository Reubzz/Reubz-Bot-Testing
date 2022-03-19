const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emoji-info',
    description: 'Gives all the available info about the Emoji.',
    // userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "emoji-name",
            type: "STRING",
            description: "Name of the Emoji you want info about.",
            required: true,
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        let searchEmoji = interaction.options.getString('emoji-name');
        searchEmoji = searchEmoji.startsWith("<a:")? searchEmoji.replace(/\d+|<a|:|>/g, "") : searchEmoji.replace(/\d+|<|:|>/g, "")

        const emoji = interaction.guild.emojis.cache.find(e => e.name == searchEmoji);

        if(!emoji) return interaction.followUp({ content: "Invalid Emoji Name. Make sure the Emoji is from this server. [You can enter either Emoji itself or only the Name]", ephemeral: true });

        let embed = new MessageEmbed()
            .setTitle('Emoji Info')
            .setDescription(`**__Emoji:__** ${emoji}`+
                            `\n**__Emoji Name:__** \`${emoji.name}\``+
                            `\n**__Emoji ID:__** \`${emoji.id}\``+
                            `\n**__Emoji Code:__** \`${emoji}\``)
            .setImage(`${emoji.url}`)
            .setColor('2F3136')

        interaction.followUp({ embeds: [embed]})
    }
};