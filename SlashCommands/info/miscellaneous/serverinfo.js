const { CommandInteraction, Client, MessageEmbed} = require('discord.js');
const emojis = {
  replyContinue: `<:replyContinue:898469274413330463>`,
  reply: `<:reply:898469274413330462>`,
  bitsRed: `<a:Sk_bits1:847774018790096897>`,
  bitsBlue: `<a:Sk_bits2:847774075345829938>`
}

module.exports = {
    name: 'serverinfo',
    description: 'serverinfo command',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
     run: async(client, interaction, args) => {
        
        let system = interaction.guild.systemChannelID ? `<#${interaction.guild.systemChannelID}>` : "`None`";
        let rules = interaction.guild.rulesChannel ? `${interaction.guild.rulesChannel}` : "`None`";

       const emojicount = interaction.guild.emojis.cache;
       const roles = interaction.guild.roles.cache.filter((r) => r.id !== interaction.guild.id).map((role) => role.toString());
       const members = interaction.guild.members.cache;
       const create = interaction.guild.createdAt.toLocaleDateString();
       const channels = interaction.guild.channels.cache;

       interaction.followUp({
         embeds: [
           new MessageEmbed()
             .setThumbnail(interaction.guild.iconURL())
             .addFields(
               {
                 name: `${emojis.bitsRed} **__INFORMATION__**`,
                 value: `${emojis.replyContinue} Server Id: \`${interaction.guild.id}\`\n` +
                        `${emojis.replyContinue} Owner Name: \`${(await interaction.guild.fetchOwner()).user.username}\`\n` +
                        `${emojis.reply} Owner id: \`${await interaction.guild.ownerId}\`\n`,
               },
               {
                 name: `${emojis.bitsBlue} **__COUNT__**`,
                 value: `${emojis.replyContinue} Members: \`${interaction.guild.memberCount.toString()}\`\n` + 
                        `${emojis.replyContinue} Roles: \`${roles.length}\`\n` + 
                        `${emojis.replyContinue} Total Channels: \`${channels.size}\`\n` + 
                        `${emojis.replyContinue} Text Channels: \`${interaction.guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").size.toString()}\`\n` +
                        `${emojis.replyContinue} Voice Channels: \`${interaction.guild.channels.cache.filter((channel) => channel.type === "GUILD_VOICE").size.toString()}\`\n` + 
                        `${emojis.replyContinue} Emojis: \`${emojicount.size}\`\n` + 
                        `${emojis.replyContinue} Boost Count \`${interaction.guild.premiumSubscriptionCount}\`\n` + 
                        `${emojis.reply} Boost Level \`${interaction.guild.premiumTier.toString()}\``,
               },
               {
                 name: `${emojis.bitsRed} **__ADDITIONAL INFORMATION__**`,
                 value: `${emojis.replyContinue} Created At: \`${create}\`\n` +
                        `${emojis.replyContinue} Server Region: ${interaction.guild.region}\n` +
                        `${emojis.replyContinue} Verification Level \`${interaction.guild.verificationLevel.toString()}\`\n` +
                        `${emojis.replyContinue} Partered: \`${interaction.guild.partnered}\`\n` +
                        `${emojis.replyContinue} Server System Channel: ${system}\n` +
                        `${emojis.reply} Server Rules Channel: ${rules}`
               }
             )
             .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())
             .setColor("#86dffc")
             .setFooter( `Requested by ${interaction.user.tag} || Reubz Bot`, interaction.user.displayAvatarURL({ dynamic: true }) ),
         ],

       });
     }
}