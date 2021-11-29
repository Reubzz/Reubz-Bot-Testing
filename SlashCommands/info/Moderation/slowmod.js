const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, Permissions } = require("discord.js");
const client = require("../../..");

module.exports = {
    name: "slowmode",
    description: "Adds slowmode to a channel",
    userPermissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "time",
            description: "Duration",
            type: "INTEGER",
            required: true,
            choices: [
                {
                    name: 'Disabled (0)',
                    value: 0,
                },
                {
                    name: '5',
                    value: 5,
                },
                {
                    name: '5s',
                    value: 5,
                },
                {
                    name: '10s',
                    value: 10,
                },
                {
                    name: '15s',
                    value: 15,
                },
                {
                    name: '30s',
                    value: 30,
                },
                {
                    name: '1m',
                    value: 60,
                },
                {
                    name: '2m',
                    value: 120,
                },
                {
                    name: '5m',
                    value: 300,
                },
                {
                    name: '10m',
                    value: 600,
                },
                {
                    name: '15m',
                    value: 900,
                },
                {
                    name: '30m',
                    value: 1800,
                },
                {
                    name: '1h',
                    value: 3600,
                },
                {
                    name: '2h',
                    value: 7200,
                },
                {
                    name: '6h',
                    value: 21600,
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
        const time = interaction.options.getInteger("time");
        const channel = interaction.options.getChannel("channel") || interaction.channel;
        
        channel.setRateLimitPerUser(time)

        if(time > 60){
            var readableTime = time/60 + `mins`
        }
        else if(time > 3600){
            var readableTime = time/60/60 + `hrs`
        }
        else {
            var readableTime = time + `secs`
        }

        const embeds = {
            slowmodeSet: {
                title: "Slowmode Set",
                description: `Duration \`${readableTime}\``,
                color: "2F3136",
            }
        }
        interaction.followUp({ embeds: [embeds.slowmodeSet]})
        channel.send({ embeds: [embeds.slowmodeSet] })
    }
}