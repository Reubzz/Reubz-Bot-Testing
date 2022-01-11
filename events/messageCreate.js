const client = require("../index");
const config = require("../config.json");
const { MessageEmbed, MessageActionRow, MessageAttachment, MessageButton } = require("discord.js")

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if (command.ownerOnly && !config.owner.includes(message.author.id)) return message.channel.send(" <a:No_1:841257803434688524> **Access Denied!** \n ONLY REUBZ CAN USE THIS COMMAND!");
    //Command Toggle on/off
    else if (command.toggleOff) {
        let toggleoff_embed = new MessageEmbed()
           .setTitle(
              `:x: That Command Has Been Disabled By The Onwer!`
           )
           .setColor("RED")
           .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
           .setTimestamp();
        return message.reply({ embeds: [toggleoff_embed] });
     } 
     //User Permissions
     else if (!message.member.permissions.has(command.userpermissions || [])) {
        let userperms_embed = new MessageEmbed()
           .setTitle(`:x: You Don't Have Permissions To Use The Command!`)
           .setColor("RED")
           .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
           .setTimestamp();
        return message.reply({ embeds: userperms_embed });
     } 
     //Bot Permissions
     else if (!message.guild.me.permissions.has(command.botpermissions || [])) {
        let botperms_embed = new MessageEmbed()
           .setTitle(`:x: I Don't Have Permissions To Use The Command!`)
           .setColor("RED")
           .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
           .setTimestamp();
        return message.reply({ embeds: [botperms_embed] });
     }

    await command.run(client, message, args);
});
