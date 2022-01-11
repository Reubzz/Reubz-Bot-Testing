const { Client, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const imageDB = require('../../../models/CustomRankCard');

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

        const user = await imageDB.findOne({ user: targetMember.id, gid: interaction.guild.id })
        
        const bgimage = user? user.img : 'https://i.imgur.com/EnPpetR.jpg'
        const lvlbar = user? user.lvlbar : '#ffffff'
        
        xp.rank(interaction, targetMember.id, interaction.guild.id, {
            background: bgimage,
            lvlbar: lvlbar
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