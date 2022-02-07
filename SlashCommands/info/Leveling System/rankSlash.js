const { Client, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const rankk = require('../../../models/functions/rank')

module.exports = {
    name: 'rank',
    description: 'shows the rank card of the user',
    options: [
        {
            name: 'user',
            description: 'Target Member',
            type: "USER",
            required: false,
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const targetMember = interaction.options.getUser('user') || interaction.user;

        await rankk.rankcard(interaction, targetMember.id, interaction.guild.id).then((img) => {
            interaction.followUp({ files: [img] });
        }).catch((err) => {
            if(err = TypeError){
                return interaction.followUp({ content: `You are not ranked.` })
            }
            interaction.followUp(err.toString());
        });
    }
};