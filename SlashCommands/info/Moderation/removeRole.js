const { Client, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'remove-role',
    description: 'removes a role to the target user',
    userPermission: ["MANAGE_ROLES"],
    options: [
        {
            name: 'user',
            description: 'target user',
            required: true, 
            type: 'USER',
        },
        {
            name: 'role',
            description: 'target role',
            required: true,
            type: 'ROLE',
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        let targetUser = interaction.options.getUser('user');
        let targetRole = interaction.options.getRole('role');
        

        let role = interaction.guild.roles.cache.find((x) => x.id === targetRole.id);
        let user = interaction.guild.members.cache.get(targetUser.id)
        
        let checkUserManageable = user.manageable

        if(checkUserManageable) {
            interaction.guild.members.cache.get(targetUser.id).roles.remove(role);
            return interaction.followUp({ content: `Removed ${role} from ${user}`})
        }
        else {
            interaction.followUp({ content: 'This member\'s highest role is above my role hence I can\'t remove role from him.' , ephemeral: true })
        }
    }
};