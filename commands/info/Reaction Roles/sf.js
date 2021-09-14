const { Message, MessageActionRow, MessageButton } = require("discord.js");

// Roles 
const freeGamesRole = '78185987118333955';
const CasinoRole = '749961603889365003';
const valorantRole = '836212808545730633';
const genshinRole = '836222337224933416';
const apexLegendsRole = '836213081671204904';
const csgoRole = '836212571282472980';
const lolRole = '836213003468537917';
const codWarzoneRole = '836212926288625684';

module.exports = {
    name: 'sf',
    description: 'This is a Self Roles Command',
    ownerOnly: false,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const selfRolesEmbed = {
            title: 'Self Roles',
            description: '\u200B',
            fields: [
                {
                    name: 'Channel Access Roles',
                    value: `> <@&${freeGamesRole}>\n > Get Pinged in <#750679324230680588> for each freebie\n\n > <@&${CasinoRole}\n > Gets Pinged in <#821034169269485618> for Casino Cash Giveaways`,
                    inline: false,
                },
                {
                    name: 'Game Roles `[You may be pinged in <#750672623444164648> by Others]`',
                    value: `> <a:Sk_Valorant:836174987866013706> <@&${valorantRole}>\n\n > <:Sk_Logo_csgo:785873905201315860> <@&${csgoRole}>\n\n > <:Sk_Apex_Legends:836194756231954442> <@&${apexLegendsRole}>\n\n > <:Sk_Genshin_Impact:836196887253090325> <@&${genshinRole}>\n\n > <:Sk_LOL_Wild_Rift:836194866089426974> <@&${lolRole}>\n\n > <:Sk_COD:836199524917706832> <@&${codWarzoneRole}>`,
                    inline: false,
                },
            ],
            footer: {
                text: 'Click the appropriate Button to get the Role listed above!\nSetup By | Reubz',
            }
        };

        const row1 = new MessageActionRow().addComponents(
            new MessageButton().setStyle('PRIMARY').setLabel('Free Games').setCustomId('freegamesrole'),
            new MessageButton().setStyle('PRIMARY').setLabel('Casino Role').setCustomId('casinorole'),
        )
        const row2 = new MessageActionRow().addComponents(
            new MessageButton().setStyle('SECONDARY').setLabel('Valorant').setCustomId('valorantrole').setEmoji('836174987866013706'),
            new MessageButton().setStyle('SECONDARY').setLabel('CS:GO').setCustomId('csgorole').setEmoji('785873905201315860'),
            new MessageButton().setStyle('SECONDARY').setLabel('Apex Legends').setCustomId('apexlegendsrole').setEmoji('836194756231954442'),
            new MessageButton().setStyle('SECONDARY').setLabel('Genshin Impact').setCustomId('genshinrole').setEmoji('836196887253090325'),
            new MessageButton().setStyle('SECONDARY').setLabel('League of Legends').setCustomId('lolrole').setEmoji('836194866089426974'),
        )
        const row3 = new MessageActionRow().addComponents(
            new MessageButton().setStyle('SECONDARY').setLabel('COD').setCustomId('codrole').setEmoji('836199524917706832')
        )

        message.channel.send({ embeds: [selfRolesEmbed], components: [row1, row2, row3] })
        
    }
}