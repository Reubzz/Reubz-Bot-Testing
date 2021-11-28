const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const role = '854934251127439392';

module.exports = {
    name: "lock",
    description: "Locks a channel",
    userPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: "state",
            description: "Lock on or off",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: 'ON',
                    value: 'on',
                },
                {
                    name: 'OFF',
                    value: 'off',
                },
            ]
        }, 
        {
            name: "channel",
            description: "The channel you want to lock/unlock",
            required: false,
            type: "CHANNEL",
            channelTypes: ['GUILD_TEXT']
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction) => {

        const state = interaction.options.getString("state");
        const channel = interaction.options.getChannel("channel") || interaction.channel;

        const embeds = {
            locked: {
                author: {
                    name: `Channel locked by ${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
                },
                description: `Locked ${channel} for <@&${role}>`,
                color: '#00FF00'
            },
            unlocked: {
                author: {
                    name: `Channel Unlocked by ${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
                },
                description: `unlocked ${channel} for <@&${role}>`,
                color: '#FF0000',
            },
            error: {
                title: 'This Role is not supposed to be accessing this channel',
                description: `Error Code: \`Role's SEND_MESSAGES Perm Missing\``,
                color: '#2F3136'
            },
            error2: {
                author: {
                    name: `${channel} is not supposed to be Locked/Unlocked.`,
                },
                description: `Error Code: \`Role's SEND_MESSAGES Perm Missing\``,
                color: '#2F3136',
            }
        }
        
        const sendMessages = channel.permissionsFor(role).has("SEND_MESSAGES")
        const viewMessages = channel.permissionsFor(role).has("VIEW_CHANNEL")

        if(state.toLowerCase() === 'on' && (sendMessages === true && viewMessages === true)) {
            await channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
            });
            channel.send({ embeds: [embeds.locked]})
            interaction.followUp({ embeds: [embeds.locked] })

        }
        else if(state.toLowerCase() === "off" && viewMessages === true){
            await channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
            })
            channel.send({ embeds: [embeds.unlocked] })
            interaction.followUp({ embeds: [embeds.unlocked] })

        } 
        else if(state.toLowerCase() === "off" && (sendMessages === false && viewMessages === false)){
            interaction.followUp({ embeds: [embeds.error] })
        }
        else {
            return interaction.followUp({ embeds: [embeds.error2] })
        }
    }
}