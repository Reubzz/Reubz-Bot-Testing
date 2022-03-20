const client = require("../index");
const config = require("../config.json");
const { MessageEmbed, MessageActionRow, MessageAttachment, MessageButton } = require("discord.js");

const suggestionsDB = require('../models/databases/suggestion')

client.on('modalSubmit', async (modal) => {
    if(modal.customId === 'suggestion-modal'){
        const sugTitle = modal.getTextInputValue('suggestion-title');
        const sugDesc = modal.getTextInputValue('suggestion-description');
        const specialId = Math.random().toString(36).slice(2)
        

        await modal.deferReply({ ephemeral: true })
        modal.followUp({ content: 'Suggestion Submitted'})

        let embed = new MessageEmbed()
            .setAuthor({ name: modal.user.username, iconURL: modal.user.displayAvatarURL() })
            .setTitle(sugTitle)
            .setDescription(sugDesc + `\n\n> **Special ID** - \`${specialId}\``)
            .setColor('BLURPLE')
            .setFooter('Use `/suggest` to submit your Suggestions')
            .setTimestamp()
            
            
            suggestionChannel = modal.guild.channels.cache.find((x) => x.id == '892447727189897247');
            let suggestionMessage = await suggestionChannel.send({ embeds: [embed]})
            
            await new suggestionsDB({
                user: modal.user.id,
                gid: modal.guild.id,
                sugTitle: sugTitle,
                sugDesc: sugDesc,
                specialId: specialId,
                messageId: suggestionMessage.id
            }).save()
    }
})