const { Client, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const ranksDB = require('simply-xp/models/level')

module.exports = {
    name: 'reset-level',
    description: 'Reset the users XP and Level to 0',
    userPermissions: ["ADMINISTRATOR"],
    type: 'USER',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const targetMember = await client.users.fetch(interaction.targetId);

        const user = await ranksDB.findOne({ user: targetMember.id, guild: interaction.guild.id });

        if(!user){
            const newUser = new ranksDB({
                user: targetMember.id,
                guild: interaction.guild.id,
                xp: 0,
                level: 0
            })
            
            await newUser
                .save()
                .catch((err) => { interaction.followUp({ content: err }) });

            return interaction.followUp({ content: `Resetted Levels and XP of ${targetMember}` });
        }

        user.xp = 0
        user.level = 0

        await user 
            .save()
            .catch((err) => { interaction.followUp({ content: err }) });

        interaction.followUp({ content: `Resetted Levels and XP of ${targetMember}` })
    }
};