const { Message, Client, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "buttons",
    aliases: 'btn',
    ownerOnly: false,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('test1')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('test2')
                .setLabel('Secondary')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('test3')
                .setLabel('Danger')
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('test4')
                .setLabel('Success')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setLabel('Link')
                .setURL('https://www.youtube.com/')
                .setStyle('LINK'),
        )
        message.channel.send({ content: 'These are all the Buttons available for you to use in Discord.', components: [row1]})
    },
};