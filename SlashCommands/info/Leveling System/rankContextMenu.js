const { Client, CommandInteraction, MessageActionRow, MessageButton, ContextMenuInteraction } = require('discord.js');
const rankk = require('../../../models/functions/rank');

module.exports = {
    name: 'view-rank',
    description: 'Shows the Rank of a user [Context Menu]',
    type: 'USER',

    /**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const targetMember = await client.users.fetch(interaction.targetId);

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