const { CommandInteractionOptionResolver, Message, MessageEmbed } = require("discord.js");
const client = require("../index");
const config = require("../config.json");
const helpPages = require('../commands/info/Select Menu/helpMenuEmbeds');
let { Database } = require('quickmongo');
let db = new Database(config.mongooseURI);
const simplydjs = require("simply-djs");


client.on("interactionCreate", async (interaction) => {

    // Slash Command Handling
    
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling 

    if(interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // ---- Select Menu Handler ----

    if(interaction.isSelectMenu()) {
        if(interaction.customId === 'helpmenu'){
            const value = interaction.values[0]
            if(value === 'helpPage1'){
                interaction.update({ emebds: [helpPages.helpPage1] })
            }
            if(value === 'helpPage2'){
                interaction.update({ embeds: [helpPages.helpPage2] })
            }
            if(value === 'helpPage3'){
                interaction.update({ embeds: [helpPages.helpPage3] })
            }
            if(value === 'helpPage4'){
                interaction.update({ embeds: [helpPages.helpPage4] })
            }
            if(value === 'helpPageMain'){
                interaction.update({ embeds: [helpPages.helpPageMain] })
            }
        }
    }

    // Suggestion System

    simplydjs.suggestBtn(interaction, db)

    // --- Buttons Command Handler -- 

    if(interaction.isButton()) {
        
        const member = interaction.guild.members.cache.get(interaction.user.id);

        // Verify Command 
        if(interaction.customId === 'Verify'){
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
            interaction.deleteReply() // Delete Reply is required to make followUp messages ephemeral.
            //const verifiedRole = '876105949138534430'
            const verifiedRole = interaction.guild.roles.cache.find((x) => x.name === 'Test Role').id
            if(member.roles.cache.has(verifiedRole)){ 
                member.roles.remove(verifiedRole); 
                return interaction.followUp({ content: 'Your Verifed Role has been removed.', ephemeral: true });
            }
            member.roles.add(verifiedRole)
            interaction.followUp({ content: 'You are now Verified', ephemeral: true });
        }

        const rolearr = [
            ["red", 'Red'], // '841210035219988530'
            ["purple", 'Purple'], // '841210035450937355'
            ["green", 'Green'], // '841210035655933954'
            ["pink", 'Pink'], // '841210036055048254'
            ["orange", 'Orange'], // '841210036428079126'
            ["yellow", 'Yellow'], // '841210036880408586'
            ["blue", 'Blue'] // '841210037220540426'
        ]

        

        rolearr.forEach(async (x) =>{
            let role = interaction.guild.roles.cache.find((y) => y.name === x[1]) || interaction.guild.roles.cache.find((y) => y.id === x[1])
            if(x[0].toLowerCase() == interaction.customId.toLowerCase()) {
                await interaction.deferReply({ ephemeral: false }).catch(() => {});
                interaction.deleteReply() // Delete Reply is required to make followUp messages ephemeral.
                switch (member.roles.cache.has(role.id)){
                    case true: 
                        await member.roles.remove(role.id);
                        interaction.followUp({ content: `Your ${role} Role was removed.`, ephemeral: true });
                        break;
                    default: 
                        await member.roles.add(role.id);
                        interaction.followUp({ content: `You were given the ${role} Role.`, ephemeral: true });
                        break;
                }
            }
        })
    }
});