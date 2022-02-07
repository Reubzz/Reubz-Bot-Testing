const { Client, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const rankCardDB = require("../../../models/databases/CustomRankCard");
const reqRolesDB = require("../../../models/databases/reqRoles");

module.exports = {
    name: 'custom-rank-card',
    description: 'Sets a Custom Background Image for Rank Card.',
    userPermission: ["SEND_MESSAGES"],
    options: [
        {
            name: 'url',
            description: 'URL of the Image',
            type: "STRING",
            required: false,
        },
        {
            name: 'level-bar',
            description: 'Color of the Level Bar',
            type: 'STRING',
            required: false,
        },
        {
            name: 'set-default-values',
            description: 'Set Default Values for any of the Fields',
            type: 'STRING',
            required: false,
            choices: [
                {
                    name: 'default-bg-image',
                    value: 'default-img',
                },
                {
                    name: 'default-level-bar',
                    value: 'default-lvlbar'
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
        const commandUser = interaction.guild.members.cache.get(interaction.user.id);

        const imgURL = interaction.options.getString('url');
        const levelbar = interaction.options.getString('level-bar');
        const defaultValues = interaction.options.getString('set-default-values')

        // const u = new reqRolesDB({
        //     gid: interaction.guild.id,
        //     commandName: "setCustomRankCard"
        // })
        // await u
        //     .save()
        //     .catch((e) => { interaction.followUp({ content: e }) });

        let checkRoles = 0;
        let allowedRoles = [];
        console.log("initial value "+checkRoles) // debug

        const checkReqRolesDB = await reqRolesDB.findOne({ gid: interaction.guild.id, commandName: "setCustomRankCard" })
        if(!checkReqRolesDB){
            checkRoles++
            checkRoles++
            console.log("if no db found checkRoles value "+checkRoles) // debug
        }

        else if(checkReqRolesDB){
            allowedRoles = checkReqRolesDB.reqRoles
            console.log(checkReqRolesDB.reqRoles) // debug
            if(allowedRoles.length == 0){
                await reqRolesDB.deleteMany({ gid: interaction.guild.id, commandName: "setCustomRankCard" })
                checkRoles++
                checkRoles++
                console.log("if no reqRoles found in db value "+checkRoles) // debug
            }
            console.log("IMP = if reqRoles are found in db value "+checkRoles) // debug
        }
        
        console.log("Final checkRoles value "+checkRoles) // debug

        if(checkRoles == 0){
            await allowedRoles.forEach((role) => { 
                if(commandUser.roles.cache.has(role)) {
                    checkRoles++
                };
            })
        }

        if(checkRoles == 0) {
            return interaction.followUp({ 
                content: 'You cannot use this command. You need to have atleast 1 of the following Roles to use this command!\n' +
                        `<@&${allowedRoles.toString().replaceAll(',', `>\n<@&`)}>`,
                allowedMentions: { parse: ["users"] }
            })
        }

        
        const checkMember = await rankCardDB.findOne({ user: interaction.user.id, gid: interaction.guild.id })

        // Creating Default Entry in DB.

        if(!checkMember){
            const newUser = new rankCardDB({
                user: interaction.user.id,
                gid: interaction.guild.id,
            })

            await newUser
                .save()
                .catch((err) => { interaction.followUp({ content: err }) })
            
            // return interaction.followUp({ content: `BG for Rank Card set to - ${newUser.img}\n And Level bar set to - ${newUser.lvlbar}` });
        }

        // Fetching Member again in updated Db 
        const member = await rankCardDB.findOne({ user: interaction.user.id, gid: interaction.guild.id })

        // For BG Image.

        if(imgURL){

            // if((imgURL.indexOf('imgur.com') == -1) && (imgURL.indexOf('cdn.discordapp.com/attachments/') == -1)){
            //     return interaction.followUp({ content: `Please provide a link that is from Imgur. Go to - <https://imgur.com>` })
            // }
            if(imgURL.endsWith(".png") || imgURL.endsWith(".jpg") || imgURL.endsWith(".jpeg")){
                member.img = imgURL;

                await member
                .save()
                .catch((err) => { interaction.followUp({ content: err }) })

                return interaction.followUp({ content: 'Custom BG for Rank Card set to - ' + imgURL })
            }
    
            interaction.followUp({ content: `The image URL you used is unsupported. Kindly use a image link that ends with \`.jpg\` or \`.png\`\n> eg. \`https://i.imgur.com/EnPpetR.jpg\`` })
        }

        // For Level Bar.

        if(levelbar) {
            var isHexCode = /^#[0-9A-F]{6}$/i;
            const validHexCode = await isHexCode.test(levelbar) //checking whether the input is a HEX CODE -- Returns True/False

            if(!validHexCode){
                return interaction.followUp({ content:  `Please Provide a Valid 6 Digit HEX Code, or go to - <https://g.co/kgs/kEDXrw>`})
            }

            member.lvlbar = levelbar;

            await member
                .save()
                .catch((err) => { interaction.followUp({ content: err }) })
            interaction.followUp({ content: `Custom Color for Level Bar set to - \`${levelbar}\``});
        }

        // To Set Default Values.

        if(defaultValues) {
            if(defaultValues === 'default-img'){
                
                member.img = undefined;

                await member
                    .save()
                    .catch((err) => { interaction.followUp({ content: err })})

                await interaction.followUp({ content: 'Set Rank Card Background Image to Default Values' })
            }
            else if(defaultValues === 'default-lvlbar'){
                member.lvlbar = undefined;

                await member
                    .save()
                    .catch((err) => { interaction.followUp({ content: err }) })

                await interaction.followUp({ content: 'Set Rank Card Level Bar to Default Values' })
            }
        }
    }
};