const { CommandInteraction, Client, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'serverinfo command',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} message 
     * @param {String[]} args 
     */
     run: async(client, message, args) => {
        
        let system = message.guild.systemChannelID ? `<#${message.guild.systemChannelID}>` : "`None`";
        let rules = message.guild.rulesChannel ? `${message.guild.rulesChannel}` : "`None`";

       const emojicount = message.guild.emojis.cache;
       const roles = message.guild.roles.cache.filter((r) => r.id !== message.guild.id).map((role) => role.toString());
       const members = message.guild.members.cache;
       const create = message.guild.createdAt.toLocaleDateString();
       const channels = message.guild.channels.cache;

       message.reply({
         embeds: [
           new MessageEmbed()
             .setThumbnail(message.guild.iconURL())
             .addFields(
               {
                 name: `🔸 **__INFORMATION__**`,
                 value: ` • Server Id: \`${message.guild.id}\`\n` 
                        + `• Owner Name: \`${(await message.guild.fetchOwner()).user.username}\`\n` 
                        + `• Owner id: \`${await message.guild.ownerId}\`\n`,
               },
               {
                 name: `🔸 **__COUNT__**`,
                 value: ` • Members: \`${message.guild.memberCount.toString()}\`\n` 
                        + `• Roles: \`${roles.length}\`\n` 
                        + `• Total Channels: \`${channels.size}\`\n`
                        + `• Text Channels: \`${message.guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").size.toString()}\`\n`
                        + `• Voice Channels: \`${message.guild.channels.cache.filter((channel) => channel.type === "GUILD_VOICE").size.toString()}\`\n • Emojis: \`${emojicount.size}\`\n • Boost Count \`${message.guild.premiumSubscriptionCount}\`\n`
                        + `• Boost Level \`${message.guild.premiumTier.toString()}\``,
               },
               {
                 name: `🔸 **__ADDITIONAL INFORMATION__**`,
                 value: ` • Created At: \`${create}\`\n`
                        + `• Server Region: ${message.guild.region}\n`
                        + `• Verification Level \`${message.guild.verificationLevel.toString()}\`\n`
                        + `• Partered: \`${message.guild.partnered}\`\n • Server Rules Channel: ${rules}`
               }
             )
             .setAuthor(`${message.guild.name}`, message.guild.iconURL())
             .setColor("#86dffc")
             .setFooter( `Requested by ${message.author.tag} || Reubz Bot`, message.author.displayAvatarURL({ dynamic: true }) ),
         ],
       });
     }
}