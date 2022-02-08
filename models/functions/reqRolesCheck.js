const { MessageEmbed } = require("discord.js");
const reqRolesDB = require("../databases/reqRoles");

/**
 *  CheckRoles Value 
 *      returns NUMBER
 *      0 = Doesnt have Required Roles for that Command.
 *      1 = No Required Roles Set for the Command. (No records in DB)
 *    > 1 = (Greater than 1) has one of the Required Roles. 
 *  
 *  Allowed Roles(Roles allowed to use the Command)
 *      returns ARRAY of Role IDs
 *      eg. [ "123", "456" ]
 * 
 */

async function reqRolesChecker(msgOrInter, commandName, options = {} ){

    options.embed ??= true;

    let commandUser;
    let message;
    let interaction;
    let guildID;

    if(msgOrInter.commandId) {
        // If Interaction Command 
        interaction = msgOrInter;
        commandUser = interaction.guild.members.cache.get(interaction.user.id);
        guildID = interaction.guild.id;
    }
    else if(!msgOrInter.commandId) {
        // If Chat Command
        message = msgOrInter;
        commandUser = message.guild.members.cache.get(message.author.id);
        guildID = message.guild.id;
    }

    let checkRoles = 0;
    let allowedRoles = [];
    // console.log("initial value "+ checkRoles) // debug

    const checkReqRolesDB = await reqRolesDB.findOne({ gid: guildID, commandName: commandName })
    
    if(!checkReqRolesDB){
        checkRoles++ // 1
        // console.log("if no db found checkRoles value "+ checkRoles) // debug
    }

    else if(checkReqRolesDB){
        allowedRoles = checkReqRolesDB.reqRoles
        // console.log(checkReqRolesDB.reqRoles) // debug
        if(allowedRoles.length == 0){
            // await reqRolesDB.deleteMany({ gid: interaction.guild.id, commandName: commandName })
            checkRoles++ // 1 
            // console.log("if req roles array is empty in DB "+checkRoles) // debug
        }
    }

    if(checkRoles == 0){
        checkRoles++ // 1

        await allowedRoles.forEach((role) => { 
            if(commandUser.roles.cache.has(role)) {
                checkRoles++ // 2, 3, 4, 5
            };
        })
        if(checkRoles == 1) checkRoles--
    }

    if(checkRoles == 0) {
        if(options.embed === true) {
            let embed = new MessageEmbed()
                .setTitle("__Error__ | You cannot use this command.")
                .setDescription(
                    "You need to have atleast 1 of the following Roles to use this command!\n"+
                    `> ➤ <@&${allowedRoles.toString().replaceAll(',', `>\n> ➤ <@&`)}>`
                )
                .setColor("#2f3136")
            
            if(msgOrInter.commandId) {
                interaction.followUp({ embeds: [embed] })
            }
            else if(!msgOrInter.commandId) {
                message.reply({ embeds: [embed] })
            }
        } 
    }
                

    // console.log("Final checkRoles value "+checkRoles) // debug
    
    return {
        checkRoles: checkRoles,
        allowedRoles: allowedRoles
    }; // Final Value. 

    /**
     *  CheckRoles Value 
     *      returns NUMBER
     *      0 = Doesnt have Required Roles for that Command.
     *      1 = No Required Roles Set for the Command. (No records in DB)
     *    > 1 = (Greater than 1) has one of the Required Roles. 
     *  
     *  Allowed Roles(Roles allowed to use the Command)
     *      returns ARRAY of Role IDs
     *      eg. [ "123", "456" ]
     * 
     */
}

module.exports = { reqRolesChecker: reqRolesChecker}