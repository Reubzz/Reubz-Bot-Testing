const { Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const helpPages = require('./helpMenuEmbeds') 


module.exports = {
    name: 'help',
    aliases: 'h',
    description: `Shows All the bot's commands`,
    onwerOnly: false,

    /**
     * @param {client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
      
        
        const helpMenu = (state) => [
            new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('helpmenu')
                .setPlaceholder('Please Choose an Option')
                .setDisabled(state)
                .addOptions({
                    label: 'Discord Together',
                    description: 'Shows help menu for Discord Together',
                    value: 'helpPage1',
                    emoji: '<a:Discord_logo:841258530689384468>'
                },
                {
                    label: 'Reaction Roles',
                    description: 'Shows help menu for Reaction Roles',
                    value: 'helpPage2',
                    emoji: '<a:Load:855794725599313940>'
                },
                {
                    label: 'Miscellaneous',
                    description: 'Shows help menu for Miscellaneous Commands',
                    value: 'helpPage3',
                    emoji: '<a:NoOneCares:877591346267967569>'
                },
                {
                    label: 'Slash Commands',
                    description: 'Shows help menu for Slash Commands',
                    value: 'helpPage4',
                    emoji: '<:slash_commands:877591934913372170>'
                },
                {
                    label: 'Main Page',
                    description: 'Goes back to the Main Page',
                    value: 'helpMainPage',
                    emoji: '<a:chipped:841258442181836831>'
                })
        )
    ]

        const initialMessage = await message.channel.send({ 
            embeds: [helpPages.helpMainPage], 
            components: helpMenu(false),
         })

        const filter = (interaction) => interaction.isSelectMenu()

        const collector = message.channel.createMessageComponentCollector({ 
            filter, 
            componentType: 'SELECT_MENU', 
            time: 1 * 3000
         })

        // collector.on('collect', async(collected) => {
        //     const value = collected.values[0];
        //     if(value === 'helpPage1'){
        //         return collected.update({ embeds: [helpPages.helpPage1] })
        //     } 
        //     else if(value === 'helpPage2'){
        //         return collected.update({ embeds: [helpPages.helpPage2] })
        //     } 
        //     else if(value === 'helpPage3'){
        //         return collected.update({ embeds: [helpPages.helpPage3] })
        //     } 
        //     else if(value === 'helpPage4'){
        //         return collected.update({ embeds: [helpPages.helpPage4] })
        //     } 
        //     else if(value === 'helpMainPage'){
        //         return collected.update({ embeds: [helpPages.helpMainPage] })
        //     }
        // })

        collector.on('end', () => {
            initialMessage.edit({ embeds: [helpPages.helpPageExpired], components: helpMenu(true) })
        })


    }
}