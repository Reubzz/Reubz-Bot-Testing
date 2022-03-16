const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageCollector, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'Testing Command 1',
    userPermissions: ["ADMINISTRATOR"],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {

        interaction.followUp({ content: "enter a message"})
        const filter = (newMessage) => {
            return newMessage.author.id === interaction.user.id;
        }

        interaction.channel.awaitMessages({ 
            filter, max: 1, time: 1000 * 1, errors: ['time'] 
        })
        .then((collected) => {
            console.log("entered Collector")
            const collectedMessage = collected.first()

            if(!collectedMessage) {
                let timeoutEmbed1 = new MessageEmbed()
                    .setTitle('Error || Timeout')
                    .setDescription('You didn\'t reply in time!!')
                    .setColor('RED')
                return interaction.followUp({ embeds: [timeoutEmbed1] })
            }
            console.log(collectedMessage)
            interaction.deleteReply()
            interaction.followUp({ content: collectedMessage.content, ephemeral: true })
        })
        .catch(collected => {
            let timeoutEmbed = new MessageEmbed()
                    .setTitle('Error || Timeout')
                    .setDescription('You didn\'t reply in time!!')
                    .setColor('RED')
                return interaction.followUp({ embeds: [timeoutEmbed] })
        })


    }
};