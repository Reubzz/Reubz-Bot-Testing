const { Client, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "role",
    description: "This is a Verify Button Role Command!",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
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