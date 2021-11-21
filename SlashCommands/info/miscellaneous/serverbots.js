const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverbots",
    description: "See all bots in the server!",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        let members = interaction.guild.members.cache.filter(u => u.user.bot).map((u) => `**${u.user.tag}** -> (\`${u.id}\`)`)
        const total_members = members.length
        members = total_members > 20 ? members.slice(0, 20).join("\n") : members.join("\n")
        if(members.length <= 0) {
            members = "No Bots"
        }

        const embed = new MessageEmbed()
        .setAuthor(`Bots found!`, client.user.displayAvatarURL())
        .setDescription(`there is a total of **${total_members}** bots in **${interaction.guild.name}**`)
        .addFields({name: "\u200B", value: `${total_members > 20 ? `${members} and ${total_members - 20} more.` : members}`})
        .setColor("RED")
        .setFooter(`Reubz Bot • Requested by ${interaction.user.tag}`, client.user.displayAvatarURL())

        return interaction.followUp({embeds: [embed]})
    }
}