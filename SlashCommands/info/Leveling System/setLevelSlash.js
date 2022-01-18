const { Client, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const ranksDB = require('simply-xp/models/level')

module.exports = {
    name: 'set-level',
    description: 'Resets the Target User\'s XP and Level to 0',
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: 'user',
            description: 'Targer User',
            required: true, 
            type: 'USER',
        },
        {
            name: 'level',
            description: 'The New Level - Max 100',
            required: true,
            type: 'STRING'
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const targetMember = interaction.options.getUser('user');
        const level = interaction.options.getString('level');

        const user = await ranksDB.findOne({ user: targetMember.id, guild: interaction.guild.id });

        if(!user){
            const newUser = new ranksDB({
                user: targetMember.id,
                guild: interaction.guild.id,
                xp: 0,
                level: level
            })
            
            await newUser
                .save()
                .catch((err) => { interaction.followUp({ content: err }) });

            return interaction.followUp({ content: `Resetted Levels and XP of ${targetMember}` });
        }

        user.xp = 0
        user.level = level

        await user 
            .save()
            .catch((err) => { interaction.followUp({ content: err }) });

        interaction.followUp({ content: `Resetted Levels and XP of ${targetMember}` })
        
    }
};