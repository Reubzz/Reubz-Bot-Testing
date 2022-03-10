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
            //const verifiedRole = '876105949138534430'
            const verifiedRole = interaction.guild.roles.cache.find((x) => x.name === 'Test Role').id
            if(member.roles.cache.has(verifiedRole)){ 
                member.roles.remove(verifiedRole); 
                return interaction.reply({ content: 'Your Verifed Role has been removed.', ephemeral: true });
            }
            member.roles.add(verifiedRole)
            interaction.reply({ content: 'You are now Verified', ephemeral: true });
        }

        // Color Roles Command 
        // const redRole = interaction.guild.roles.cache.find((x) => x.name === 'Red').id // '841210035219988530'
        // const purpleRole = interaction.guild.roles.cache.find((x) => x.name === 'Purple').id // '841210035450937355'
        // const greenRole = interaction.guild.roles.cache.find((x) => x.name === 'Green').id // '841210035655933954'
        // const pinkRole = interaction.guild.roles.cache.find((x) => x.name === 'Pink').id // '841210036055048254'
        // const orangeRole = interaction.guild.roles.cache.find((x) => x.name === 'Orange').id // '841210036428079126'
        // const yellowRole = interaction.guild.roles.cache.find((x) => x.name === 'Yellow').id // '841210036880408586'
        // const blueRole = interaction.guild.roles.cache.find((x) => x.name === 'Blue').id // '841210037220540426'

        // if(interaction.customId === 'red'){
        //     if(member.roles.cache.has(redRole)){ member.roles.remove(redRole);
        //         return interaction.reply({ content: `Your <@&${redRole}> Role has been Removed!`, ephemeral: true })
        //     } else if(member.roles.cache.has(purpleRole)){ await member.roles.remove(purpleRole); member.roles.add(redRole);
        //         return interaction.reply({ content: `You were given the <@&${redRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(greenRole)){ await member.roles.remove(greenRole); member.roles.add(redRole);
        //         return interaction.reply({ content: `You were given the <@&${redRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(pinkRole)){ await member.roles.remove(pinkRole); member.roles.add(redRole);
        //         return interaction.reply({ content: `You were given the <@&${redRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(orangeRole)){ await member.roles.remove(orangeRole); member.roles.add(redRole);
        //         return interaction.reply({ content: `You were given the <@&${redRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(yellowRole)){ await member.roles.remove(yellowRole); member.roles.add(redRole);
        //         return interaction.reply({ content: `You were given the <@&${redRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(blueRole)){ await member.roles.remove(blueRole); member.roles.add(redRole);
        //         return interaction.reply({ content: `You were given the <@&${redRole}> Role`, ephemeral: true })
        //     } else{ await member.roles.add(redRole); 
        //         return interaction.reply({ content: `You were given the <@&${redRole}> Role`, ephemeral: true })
        //     }
        // }
        // if(interaction.customId === 'purple'){
        //     if(member.roles.cache.has(purpleRole)){ member.roles.remove(purpleRole); 
        //         return interaction.reply({ content: `Your <@&${purpleRole}> Role has been Removed!`, ephemeral: true })
        //     } else if(member.roles.cache.has(redRole)){ await member.roles.remove(redRole); member.roles.add(purpleRole);
        //         return interaction.reply({ content: `You were given the <@&${purpleRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(greenRole)){ await member.roles.remove(greenRole); member.roles.add(purpleRole);
        //         return interaction.reply({ content: `You were given the <@&${purpleRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(pinkRole)){ await member.roles.remove(pinkRole); member.roles.add(purpleRole);
        //         return interaction.reply({ content: `You were given the <@&${purpleRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(orangeRole)){ await member.roles.remove(orangeRole); member.roles.add(purpleRole);
        //         return interaction.reply({ content: `You were given the <@&${purpleRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(yellowRole)){ await member.roles.remove(yellowRole); member.roles.add(purpleRole);
        //         return interaction.reply({ content: `You were given the <@&${purpleRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(blueRole)){ await member.roles.remove(blueRole); member.roles.add(purpleRole);
        //         return interaction.reply({ content: `You were given the <@&${purpleRole}> Role`, ephemeral: true })
        //     } else{ await member.roles.add(purpleRole); 
        //         return interaction.reply({ content: `You were given the <@&${purpleRole}> Role`, ephemeral: true })
        //     }
        // }
        // if(interaction.customId === 'green'){
        //     if(member.roles.cache.has(greenRole)){ await member.roles.remove(greenRole); 
        //         return interaction.reply({ content: `Your <@&${greenRole}> Role has been Removed!`, ephemeral: true })
        //     } else if(member.roles.cache.has(redRole)){ await member.roles.remove(redRole); member.roles.add(greenRole);
        //         return interaction.reply({ content: `You were given the <@&${greenRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(purpleRole)){ await member.roles.remove(purpleRole); member.roles.add(greenRole);
        //         return interaction.reply({ content: `You were given the <@&${greenRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(pinkRole)){ await member.roles.remove(pinkRole); member.roles.add(greenRole);
        //         return interaction.reply({ content: `You were given the <@&${greenRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(orangeRole)){ await member.roles.remove(orangeRole); member.roles.add(greenRole);
        //         return interaction.reply({ content: `You were given the <@&${greenRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(yellowRole)){ await member.roles.remove(yellowRole); member.roles.add(greenRole);
        //         return interaction.reply({ content: `You were given the <@&${greenRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(blueRole)){ await member.roles.remove(blueRole); member.roles.add(greenRole);
        //         return interaction.reply({ content: `You were given the <@&${greenRole}> Role`, ephemeral: true })
        //     } else{ await member.roles.add(greenRole); 
        //         return interaction.reply({ content: `You were given the <@&${greenRole}> Role`, ephemeral: true })
        //     }
        // }
        // if(interaction.customId === 'pink'){
        //     if(member.roles.cache.has(pinkRole)){ await member.roles.remove(pinkRole);
        //         return interaction.reply({ content: `Your <@&${pinkRole}> Role has been Removed!`, ephemeral: true })
        //     } else if(member.roles.cache.has(redRole)){ await member.roles.remove(redRole); member.roles.add(pinkRole)
        //         return interaction.reply({ content: `You were given the <@&${pinkRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(purpleRole)){ await member.roles.remove(purpleRole); member.roles.add(pinkRole)
        //         return interaction.reply({ content: `You were given the <@&${pinkRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(greenRole)){ await member.roles.remove(greenRole); member.roles.add(pinkRole)
        //         return interaction.reply({ content: `You were given the <@&${pinkRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(orangeRole)){ await member.roles.remove(orangeRole); member.roles.add(pinkRole)
        //         return interaction.reply({ content: `You were given the <@&${pinkRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(yellowRole)){ await member.roles.remove(yellowRole); member.roles.add(pinkRole)
        //         return interaction.reply({ content: `You were given the <@&${pinkRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(blueRole)){ await member.roles.remove(blueRole); member.roles.add(pinkRole)
        //         return interaction.reply({ content: `You were given the <@&${pinkRole}> Role`, ephemeral: true })
        //     } else{ await member.roles.add(pinkRole);
        //         return interaction.reply({ content: `You were given the <@&${pinkRole}> Role`, ephemeral: true })
        //     }
        // }
        // if(interaction.customId === 'orange'){
        //     if(member.roles.cache.has(orangeRole)){ await member.roles.remove(orangeRole);
        //         return interaction.reply({ content: `Your <@&${orangeRole}> Role has been Removed!`, ephemeral: true })
        //     } else if(member.roles.cache.has(redRole)){ await member.roles.remove(redRole); member.roles.add(orangeRole)
        //         return interaction.reply({ content: `You were given the <@&${orangeRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(purpleRole)){ await member.roles.remove(purpleRole); member.roles.add(orangeRole)
        //         return interaction.reply({ content: `You were given the <@&${orangeRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(greenRole)){ await member.roles.remove(greenRole); member.roles.add(orangeRole)
        //         return interaction.reply({ content: `You were given the <@&${orangeRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(pinkRole)){ await member.roles.remove(pinkRole); member.roles.add(orangeRole)
        //         return interaction.reply({ content: `You were given the <@&${orangeRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(yellowRole)){ await member.roles.remove(yellowRole); member.roles.add(orangeRole)
        //         return interaction.reply({ content: `You were given the <@&${orangeRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(blueRole)){ await member.roles.remove(blueRole); member.roles.add(orangeRole)
        //         return interaction.reply({ content: `You were given the <@&${orangeRole}> Role`, ephemeral: true })
        //     } else { await member.roles.add(orangeRole);
        //         return interaction.reply({ content: `You were given the <@&${orangeRole}> Role`, ephemeral: true })
        //     }
        // }
        // if(interaction.customId === 'yellow'){
        //     if(member.roles.cache.has(yellowRole)){ await member.roles.remove(yellowRole);
        //         return interaction.reply({ content: `Your <@&${yellowRole}> Role has been Removed!`, ephemeral: true })
        //     } else if(member.roles.cache.has(redRole)){ await member.roles.remove(redRole); member.roles.add(yellowRole)
        //         return interaction.reply({ content: `You were given the <@&${yellowRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(purpleRole)){ await member.roles.remove(purpleRole); member.roles.add(yellowRole)
        //         return interaction.reply({ content: `You were given the <@&${yellowRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(greenRole)){ await member.roles.remove(greenRole); member.roles.add(yellowRole)
        //         return interaction.reply({ content: `You were given the <@&${yellowRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(pinkRole)){ await member.roles.remove(pinkRole); member.roles.add(yellowRole)
        //         return interaction.reply({ content: `You were given the <@&${yellowRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(orangeRole)){ await member.roles.remove(orangeRole); member.roles.add(yellowRole)
        //         return interaction.reply({ content: `You were given the <@&${yellowRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(blueRole)){ await member.roles.remove(blueRole); member.roles.add(yellowRole)
        //         return interaction.reply({ content: `You were given the <@&${yellowRole}> Role`, ephemeral: true })
        //     } else { await member.roles.add(yellowRole);
        //         return interaction.reply({ content: `You were given the <@&${yellowRole}> Role`, ephemeral: true })
        //     } 
        // }
        // if(interaction.customId === 'blue'){
        //     if(member.roles.cache.has(blueRole)){ await member.roles.remove(blueRole);
        //         return interaction.reply({ content: `Your <@&${blueRole}> Role has been Removed!`, ephemeral: true })
        //     } else if(member.roles.cache.has(redRole)){ await member.roles.remove(redRole); member.roles.add(blueRole)
        //         return interaction.reply({ content: `You were given the <@&${blueRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(purpleRole)){ await member.roles.remove(purpleRole); member.roles.add(blueRole)
        //         return interaction.reply({ content: `You were given the <@&${blueRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(greenRole)){ await member.roles.remove(greenRole); member.roles.add(blueRole)
        //         return interaction.reply({ content: `You were given the <@&${blueRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(pinkRole)){ await member.roles.remove(pinkRole); member.roles.add(blueRole)
        //         return interaction.reply({ content: `You were given the <@&${blueRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(orangeRole)){ await member.roles.remove(orangeRole); member.roles.add(blueRole)
        //         return interaction.reply({ content: `You were given the <@&${blueRole}> Role`, ephemeral: true })
        //     } else if(member.roles.cache.has(yellowRole)){ await member.roles.remove(yellowRole); member.roles.add(blueRole)
        //         return interaction.reply({ content: `You were given the <@&${blueRole}> Role`, ephemeral: true })
        //     } else{ await member.roles.add(blueRole)
        //         return interaction.reply({ content: `You were given the <@&${blueRole}> Role`, ephemeral: true })
        //     } 
        // }

        const red = interaction.guild.roles.cache.find((x) => x.name === 'Red') // '841210035219988530'
        const purple = interaction.guild.roles.cache.find((x) => x.name === 'Purple') // '841210035450937355'
        const green = interaction.guild.roles.cache.find((x) => x.name === 'Green') // '841210035655933954'
        const pink = interaction.guild.roles.cache.find((x) => x.name === 'Pink') // '841210036055048254'
        const orange = interaction.guild.roles.cache.find((x) => x.name === 'Orange') // '841210036428079126'
        const yellow = interaction.guild.roles.cache.find((x) => x.name === 'Yellow') // '841210036880408586'
        const blue = interaction.guild.roles.cache.find((x) => x.name === 'Blue') // '841210037220540426'
        const rolearr = [red, purple, green, pink, orange, yellow, blue];

        await interaction.deferReply({ ephemeral: true }).catch(() => {});

        rolearr.forEach(async (x) =>{
            if(x.name.toLowerCase() == interaction.customId.toLowerCase()) {
                if(member.roles.cache.has(x.id)) {
                    await member.roles.remove(x.id);
                    let test = ["1", interaction.guild.roles.cache.find((x) => x.name === 'Green')]
                    console.log(test[1])
                    console.log(test[0])
                    interaction.followUp({ content: `Your ${x} Role was removed.`, ephemeral: true });
                }
                else {
                    await member.roles.add(x.id);
                    interaction.followUp({ content: `You were given the ${x} Role.`, ephemeral: true });
                }
            }
        })
        // rolearr.forEach(async (x) => {
        //     if(member.roles.cache.has(x.id)) member.roles.remove(x.id);
        //     if(x.name.toLowerCase() == interaction.customId.toLowerCase()){
        //         await member.roles.add(x.id);
        //         // await interaction.deferReply({ ephemeral: true }).catch(() => {});
        //         interaction.followUp({ content: `You were given the ${x} Role`, ephemeral: true });
        //     }
        // })
    }
});