const client = require("../index");
const config = require("../config.json");
const { MessageEmbed, MessageActionRow, MessageAttachment, MessageButton } = require("discord.js");

client.on("messageCreate", async (message) => {
    if(message.channel.id !== '940833000168488980') return
    // if(message.author.id !== '940833066069393469') return


    let guild = client.guilds.cache.get('798518088697774101')
    let freeGamesChannel = guild.channels.cache.get('854566494004707379')
    
    const newMessage = message.content.replace("@Free Games:", "<@!331382684188409857> :")
    freeGamesChannel.send({ content: newMessage})
})