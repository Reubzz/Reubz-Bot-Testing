const client = require("../../../index");
const canvas = require("discord-canvas");
const { MessageAttachment, MessageEmbed, Message, Client, Intents } = require("discord.js")

module.exports = {
    name: 'welcomeTest',
    aliases: 'wt',
    ownerOnly: true,

    run: async(client, message, args) => {
        const image = new canvas.Welcome()
            .setBackground("https://i.imgur.com/EnPpetR.jpg")
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
            .setAvatar(message.author.displayAvatarURL({ format: 'png' }))
            .setMemberCount(message.guild.memberCount)
            .toAttachment()

	    const attachment = new MessageAttachment((await image).toBuffer(), 'welcome.png');

		let rules = member.guild.rulesChannel ? `${member.guild.rulesChannel}` : "`None`";

		const emojis = {
			bitsBlue: member.guild.emojis.cache.find(emoji => emoji.name == "bitsBlue"),
			bitsRed: member.guild.emojis.cache.find(emoji => emoji.name == "bitsRed"),
			rightArrow: member.guild.emojis.cache.find(emoji => emoji.name == "rightArrow"),
		}

		const welcomeTxt = `☆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☆\n` +
							`      ${emojis.bitsBlue} Welcome to ${member.guild.name}'s ${emojis.bitsBlue}\n` +
							`☆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☆\n\n` +
							`Hey <@${member.user.id}>, \n` +
							`Be sure to check out ${rules} and follow them!\n`

	    message.channel.send({ content: welcomeTxt, files: [attachment] });
    }
}