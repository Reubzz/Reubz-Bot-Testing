const { CommandInteraction, Client, MessageEmbed} = require('discord.js');

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
       const roles = interaction.guild.roles.cache
         .filter((r) => r.id !== interaction.guild.id)
         .map((role) => role.toString());
       const members = interaction.guild.members.cache;
       const create = interaction.guild.createdAt.toLocaleDateString();
       const channels = interaction.guild.channels.cache;

       interaction.followUp({
         embeds: [
           new MessageEmbed()
             .setThumbnail(interaction.guild.iconURL())
             .addFields(
               {
                 name: `<a:Sk_bits1:847774018790096897> **__INFORMATION__**`,
                 value: `<:replyContinue:898469274413330463> Server Id: \`${
                   interaction.guild.id
                 }\`\n<:replyContinue:898469274413330463> Owner Name: \`${
                   (await interaction.guild.fetchOwner()).user.username
                 }\`\n<:reply:898469274413330462> Owner id: \`${await interaction.guild.ownerId}\`\n`,
               },
               {
                 name: `<a:Sk_bits2:847774075345829938> **__COUNT__**`,
                 value: `<:replyContinue:898469274413330463> Members: \`${interaction.guild.memberCount.toString()}\`\n<:replyContinue:898469274413330463> Roles: \`${
                   roles.length
                 }\`\n<:replyContinue:898469274413330463> Total Channels: \`${
                   channels.size
                 }\`\n<:replyContinue:898469274413330463> Text Channels: \`${interaction.guild.channels.cache
                   .filter((channel) => channel.type === "GUILD_TEXT")
                   .size.toString()}\`\n<:replyContinue:898469274413330463> Voice Channels: \`${interaction.guild.channels.cache
                   .filter((channel) => channel.type === "GUILD_VOICE")
                   .size.toString()}\`\n<:replyContinue:898469274413330463> Emojis: \`${emojicount.size}\`\n<:replyContinue:898469274413330463> Boost Count \`${
                    interaction.guild.premiumSubscriptionCount
                  }\`\n<:reply:898469274413330462> Boost Level \`${
                      interaction.guild.premiumTier.toString()}\``,
               },
               {
                 name: `<a:Sk_bits1:847774018790096897> **__ADDITIONAL INFORMATION__**`,
                 value: `<:replyContinue:898469274413330463> Created At: \`${create}\`\n<:replyContinue:898469274413330463> Server Region: ${
                        interaction.guild.region}\n<:replyContinue:898469274413330463> Verification Level \`${
                         interaction.guild.verificationLevel.toString()}\`\n<:replyContinue:898469274413330463> Partered: \`${
                             interaction.guild.partnered}\`\n<:reply:898469274413330462> Server Rules Channel: ${rules}`
               }
             )
             .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())
             .setColor("#86dffc")
             .setFooter(
               `Requested by ${interaction.user.tag} || Reubz Bot`,
               interaction.user.displayAvatarURL({ dynamic: true })
             ),
         ],
       });
     }
}