const client = require("../index");
const canvas = require("discord-canvas");
const { MessageAttachment, MessageEmbed, Message, Client, Intents, WelcomeChannel } = require("discord.js")


client.on("guildMemberAdd", async(member) => {
    if(member.guild.id === '798518088697774101'){

		const welcomeChannel = member.guild.channels.cache.get('892447727189897247')
		if(!welcomeChannel) return;

		const image = new canvas.Welcome()
        	.setBackground("https://i.imgur.com/EnPpetR.jpg")
        	.setUsername(member.user.username)
        	.setDiscriminator(member.user.discriminator)
        	.setAvatar(member.user.displayAvatarURL({ format: 'png' }))
        	.setMemberCount(member.guild.memberCount)
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

		// const welcomeTxt = `☆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☆\n` +
		// 					`      ${emojis.bitsBlue} Welcome to ${member.guild.name}'s Discord Server ${emojis.bitsBlue}\n` +
		// 					`☆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☆\n\n` +
		// 					`Hey <@${member.user.id}>, \n` +
		// 					`Be sure to check out ${rules} and follow them!\n` +
		// 					`> ${rightArrow} <#${welcomeChannel}> to know about SkRossi.\n` +
		// 					`> ${rightArrow} <#${welcomeChannel}> Gain access to the server here!!\n\n` +
		// 					`Use <#channel> to address any problems you have about the server!!`

		welcomeChannel.send({ content: welcomeTxt, files: [attachment]})}
})