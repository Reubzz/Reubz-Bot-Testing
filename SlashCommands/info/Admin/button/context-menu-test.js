const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const client = require("../../../../index");

module.exports = {
    name: 'sample',
    description: 'Shows a Sample of Buttons or Context Menu',
    userPermission: [""],
    options: [
        {
            name: 'sample',
            description: 'Sends a Sample Select Menu',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Select Menu',
                    value: 's',
                },
                {
                    name: 'Button Menu',
                    value: 'b'
                }
            ]
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {

        const optionSelected = interaction.options.getString('sample');

        const selectMenu = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('sample-menu')
                .setPlaceholder('Please Choose an Option')
                .setDisabled(false)
                .setMaxValues(3)
                .addOptions({
                    label: 'label 1',
                    description: 'Desc 1',
                    value: 'value 1',
                    emoji: '🔹'
                },
                {
                    label: 'label 2',
                    description: 'Desc 2',
                    value: 'value 2',
                    emoji: '🔸'
                },
                {
                    label: 'label 3',
                    description: 'Desc 3',
                    value: 'value 3',
                    emoji: '🔹'
                },
                {
                    label: 'label 4',
                    description: 'Desc 4',
                    value: 'value 4',
                    emoji: '🔸'
                },
                {
                    label: 'label 5',
                    description: 'Desc 5',
                    value: 'value 5',
                    emoji: '🔹'
                })
            )

        const embed = {
            title: 'This is a Sample Embed',
            description: 'This is a sample description',
            color: '#FFFFFF',
        }

        const button = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('test1')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('test2')
                .setLabel('Secondary')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('test3')
                .setLabel('Danger')
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('test4')
                .setLabel('Success')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setLabel('Link')
                .setURL('https://www.youtube.com/')
                .setStyle('LINK'),
        )

        if(optionSelected === 's'){
            return await interaction.followUp({ embeds: [embed], components: [selectMenu] });
        }
        else if(optionSelected === 'b'){
            return await interaction.followUp({ embeds: [embed], components: [button] });
        }
    }
};

client.on('interactionCreate', (interaction) => {
    if(interaction.isSelectMenu()){
        if(interaction.customId === 'sample-menu'){
            const value = interaction.values
        }
    }
})