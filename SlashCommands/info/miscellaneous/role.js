const { Client, CommandInteraction, MessageActionRow, MessageButton, Permissions } = require("discord.js");
const color = require("../../../commands/info/Reaction Roles/color");

module.exports = {
    name: "verify",
    description: "This is a Verify Button Role Command!",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const checkVerifiedRole = interaction.guild.roles.cache.find((x) => x.name === 'Test Role')
        const checkRolePerms = interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES) // permissionsFor(client).has(Permissions.FLAGS.MANAGE_ROLES);

        if(!checkVerifiedRole && !checkRolePerms){
            return interaction.followUp({ content: 'I can\'t find a Role Named **Test**, Missing Perms `MANAGE_ROLES` hence couldn\'t create a New Test Role.', ephemeral: 1 })
        }
        else if(!checkVerifiedRole && checkRolePerms){
            await interaction.guild.roles.create({ name: 'Test Role', 
                                                   permissions: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL],
                                                   color: 'BLURPLE',
                                                   hoist: 1,
                                                   mentionable: 1,
                                                   reason: 'Created a Verify Role as the Server didn\'t have one.',
                                                })                       
            const verifiedRole = interaction.guild.roles.cache.find((role) => role.name === 'Test Role')
            console.log('New Test Role Created.')
            interaction.followUp({ content: `I could not find a **Test** Role here, So I Created it - ${verifiedRole}. Create Permision Overides for this Role in your server.`})
        }
        
        
        const embed1 = {
            
            title: 'Server Verification',
            description: `Please read the Rules and Regulations of this Server and then click the Button below to gain access to the server.`,
            color: '#2F3136'
            }

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('Verify')
                .setLabel('Verify!')
                .setStyle('SUCCESS')
        )

        interaction.followUp({ embeds: [embed1], components: [row] });
    },
};