const { Message, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "color",
    aliases: [],
    ownerOnly: false,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const colors = {
            title: 'Choose Your Color Roles',
            description: '<:red:877457615255396362>: <@&841210035219988530>\n\n<:purple:877457711967645737>: <@&841210035450937355>\n\n<:green:877457784902389810>: <@&841210035655933954>\n\n<:pink:877457842188222485>: <@&841210036055048254>\n\n<:orange:877457931640135700>: <@&841210036428079126>\n\n<:yellow:877458104936181800>: <@&841210036880408586>\n\n<:blue:877458169629126666>: <@&841210037220540426>',
            color: '#2F3136',
        }
        const row1 = new MessageActionRow().addComponents(
            new MessageButton().setStyle('SECONDARY').setLabel('Red').setCustomId('red'),              
            new MessageButton().setStyle('SECONDARY').setLabel('Purple').setCustomId('purple'),                
            new MessageButton().setStyle('SECONDARY').setLabel('Green').setCustomId('green'),
            new MessageButton().setStyle('SECONDARY').setLabel('Pink').setCustomId('pink'),
            new MessageButton().setStyle('SECONDARY').setLabel('Orange').setCustomId('orange'),               
            )
        const row2 = new MessageActionRow().addComponents(
            new MessageButton().setStyle('SECONDARY').setLabel('Yellow').setCustomId('yellow'),
            new MessageButton().setStyle('SECONDARY').setLabel('Blue').setCustomId('blue'),
            )

        message.channel.send({ embeds: [colors], components: [row1, row2]})
            
        },
    };