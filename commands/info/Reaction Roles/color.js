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
            title: 'Choose Your Color Roles (works only when bot is Online)',
            description: '<:red:877457615255396362>: <@&841210035219988530>'
                        + '\n\n<:purple:877457711967645737>: <@&841210035450937355>'
                        + '\n\n<:green:877457784902389810>: <@&841210035655933954>' 
                        + '\n\n<:pink:877457842188222485>: <@&841210036055048254>' 
                        + '\n\n<:orange:877457931640135700>: <@&841210036428079126>' 
                        + '\n\n<:yellow:877458104936181800>: <@&841210036880408586>' 
                        + '\n\n<:blue:877458169629126666>: <@&841210037220540426>',
            color: '#2F3136',
        }
        const row1 = new MessageActionRow().addComponents(
            new MessageButton().setStyle('SECONDARY').setCustomId('red').setEmoji('877457615255396362'),              
            new MessageButton().setStyle('SECONDARY').setCustomId('purple').setEmoji('877457711967645737'),                
            new MessageButton().setStyle('SECONDARY').setCustomId('green').setEmoji('877457784902389810'),
            new MessageButton().setStyle('SECONDARY').setCustomId('pink').setEmoji('877457842188222485'),
            new MessageButton().setStyle('SECONDARY').setCustomId('orange').setEmoji('877457931640135700'),               
            )
        const row2 = new MessageActionRow().addComponents(
            new MessageButton().setStyle('SECONDARY').setCustomId('yellow').setEmoji('877458104936181800'),
            new MessageButton().setStyle('SECONDARY').setCustomId('blue').setEmoji('877458169629126666'),
            )
        
        message.delete()
        message.channel.send({ embeds: [colors], components: [row1, row2]})
            
        },
    };