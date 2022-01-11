const client = require("../index");
const config = require("../config.json");
const { MessageEmbed, MessageActionRow, MessageAttachment, MessageButton } = require("discord.js");

const obj = {} 
const cooldown = 1000 * 60


client.on("messageCreate", async(message) => {
    if (message.author.bot || !message.guild) return;

    let time = obj[message.author.id]
    
    //if(time && (time > Date.now())) return; // Checking if the user is under cooldown.
    
    xp.addXP(message, message.author.id, message.guild.id, {
        min: 60,
        max: 100
    })
    
    obj[message.author.id] = Date.now() + cooldown; // Adding Cooldown to Users.

    xp.lvlRole(message, message.author.id, message.guild.id) // Level Roles Core.
})