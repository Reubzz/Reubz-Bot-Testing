const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const scheduledSchema = require('../../../models/databases/messageScheduler')

module.exports = {
    name: 'scheduled-messages-list',
    description: 'List of all the Scheduled Messages',
    // userPermissions: ["ADMINISTRATOR"],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const query = {
            guildId: interaction.guild.id
        }
        const results = await scheduledSchema.find(query)

        let listEmbed = new MessageEmbed()
            .setTitle('List of Scheduled Messages')
            .setDescription('\u200B')
            .setColor('#2f3136')
        
        let i = 1

        for(const post of results) {
            const { guildId, channelId, content, specialId, date } = post;

            const channel = interaction.guild.channels.cache.get(channelId)

            const dateN = new Date(date).getTime()/1000
            listEmbed.addField(
                `${i} - __Scheduled Message Details:__`,
                `> Scheduled Date - **<t:${dateN}:F>**\n`+
                `> Guild Id - **\`${guildId}\`**\n`+
                `> Channel - ${channel}\n`+
                `> Special Id - **\`${specialId}\`**\n\n`+
                `** **`
            )

            i++
        }

        interaction.followUp({ embeds: [listEmbed] })
    }
};