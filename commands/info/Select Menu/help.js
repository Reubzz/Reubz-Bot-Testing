const { Message, MessageActionRow, MessageSelectMenu } = require("discord.js");


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
        const helpMainPage = {
            "title": "Bot Prefix - `!`",
            "description": "Please Select the Menu Option Below to view that Page of the Help Menu",
            "color": '#2F3136',
            "fields": [
              {
                "name": "Options:",
                "value": "<a:Discord_logo:841258530689384468> Discord Together\n<:slash_commands:877591934913372170> Slash Commands",
                "inline": true
              },
              {
                "name": "\u200B",
                "value": "<a:Load:855794725599313940> Reaction Roles",
                "inline": true
              },
              {
                "name": "\u200B",
                "value": "<a:NoOneCares:877591346267967569> Miscellaneous",
                "inline": true
              },
              
            ],
            "author": {
              "name": "Reubz Bot || Dynamic Help Command"
            }
          }
        const helpPage1 = {
            "title": "<a:Discord_logo:841258530689384468> Discord Together <a:Discord_logo:841258530689384468>",
            "description": "> `!youtube-together` or `!ytt`\n > Watch YouTube together in a VC. \n\n> `!betrayl.io` or `!betrayl`\n > Play Betrayl.io Game in a VC.\n\n> `!chess-together` or `!chess`\n > Play Chess in the Park in a VC.\n\n> `!chessdev`\n> Play the Dev Version of Chess.\n\n> `!fishington` or `!fishing`\n > Play Fishington game in a VC.\n\n> `!poker`\n > Play Poker in a VC",
            "color": '#2F3136',
            "author": {
              "name": "Reubz Bot || Dynamic Help Command"
            }
        }
        const helpPage2 = {
            "title": "<a:Load:855794725599313940> Reaction Roles <a:Load:855794725599313940>",
            "description": "> `!color` or `!cr`\n > Get Access to some Custom Color Roles of this Server.",
            "color": '#2F3136',
            "author": {
              "name": "Reubz Bot || Dynamic Help Command"
            }
        }
        const helpPage3 = {
            "title": "<a:NoOneCares:877591346267967569> Miscellaneous <a:NoOneCares:877591346267967569>",
            "description": "> `!ping`\n > To get the Bot's Ping from Discord API.\n\n> `!buttons` or `!btn`\n> Shows all the Types of Buttons Discord has.",
            "color": '#2F3136',
            "author": {
              "name": "Reubz Bot || Dynamic Help Command"
            }
        }
        const helpPage4 = {
            "title": "<:slash_commands:877591934913372170> Slash Commands <:slash_commands:877591934913372170>",
            "description": "> `/ping` \n> To get the Bot's Ping from Discord API.\n\n> `/role`\n> Brings up the User Verification role menu.",
            "color": 3092790,
            "author": {
              "name": "Reubz Bot || Dynamic Help Command"
            }
        }
        const helpPageExpired = {
            title: 'This help menu has Expired Please Use `!help` or `!h` again!',
            color: 3092790,
        }
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
            embeds: [helpMainPage], 
            components: helpMenu(false),
         })

        const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ 
            filter, 
            componentType: 'SELECT_MENU', 
            time: 1 * 30000
         })

        collector.on('collect', async(collected) => {
            const value = collected.values[0];
            if(value === 'helpPage1'){
                return collected.update({ embeds: [helpPage1] })
            } 
            else if(value === 'helpPage2'){
                return collected.update({ embeds: [helpPage2] })
            } 
            else if(value === 'helpPage3'){
                return collected.update({ embeds: [helpPage3] })
            } 
            else if(value === 'helpPage4'){
                return collected.update({ embeds: [helpPage4] })
            } 
            else if(value === 'helpMainPage'){
                return collected.update({ embeds: [helpMainPage] })
            }
        })

        collector.on('end', () => {
            initialMessage.edit({ embeds: [helpPageExpired], components: helpMenu(true) })
        })
        


    }
}