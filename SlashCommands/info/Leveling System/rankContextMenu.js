const { Client, CommandInteraction, MessageActionRow, MessageButton, ContextMenuInteraction } = require('discord.js');
const imageDB = require('../../../models/CustomRankCard');

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

        const user = await imageDB.findOne({ user: targetMember.id, gid: interaction.guild.id })
        
        const bgimage = user? user.img : 'https://i.imgur.com/EnPpetR.jpg'
        const lvlbar = user? user.lvlbar : '#ffffff'
        
        xp.rank(interaction, targetMember.id, interaction.guild.id, {
            background: bgimage,
            lvlbar: lvlbar,
        }).then((img) => {
            interaction.followUp({ files: [img] });
        }).catch((err) => {
            if(err = TypeError){
                return interaction.followUp({ content: `You are not ranked.` })
            }
            interaction.followUp(err.toString());
        });
    }
};