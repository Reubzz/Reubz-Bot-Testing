const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const reqRolesDB = require("../../../models/databases/reqRoles");

const commandChoices = [
    {
        name: 'Set Custom Rank Card',
        value: 'customRankCard',
    }
]

module.exports = {
    name: 'req-role',
    description: 'Sets/Removes a Required Roles for a Specific Command',
    userPermissions: ["ADMINISTRATOR"],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'add',
            description: 'Adds Required Roles for a Command',
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'command-name',
                    description: 'Target Command',
                    type: 'STRING',
                    required: true,
                    choices: commandChoices
                },
                {
                    name: 'role',
                    description: 'Target Role',
                    required: true,
                    type: 'ROLE'
                }
            ]
        },
        {
            name: 'remove',
            type: 'SUB_COMMAND',
            description: 'Removes Required Roles for a Command',
            options: [
                {
                    name: 'command-name',
                    description: 'Target Command',
                    type: 'STRING',
                    required: true,
                    choices: commandChoices
                },
                {
                    name: 'role',
                    description: 'Target Role',
                    required: true,
                    type: 'ROLE'
                }
            ]
        },
        {
            name: 'list',
            type: 'SUB_COMMAND',
            description: 'Shows the List of Set Required Roles for a Command',
            options: [
                {
                    name: 'command-name',
                    description: 'Target Command',
                    type: 'STRING',
                    required: true,
                    choices: commandChoices
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
        const role = interaction.options.getRole('role');
        const commandName = interaction.options.getString('command-name');

        let [sub] = args

        const searchDB1 = await reqRolesDB.findOne({ gid: interaction.guild.id, commandName: commandName })
        if(!searchDB1) {
            const newEntry = new reqRolesDB({
                gid: interaction.guild.id,
                commandName: commandName,
            })
            await newEntry.save().catch((e) => { interaction.followUp({ content: e }) } )
        }

        const searchDB2 = await reqRolesDB.findOne({ gid: interaction.guild.id, commandName: commandName })

        // add
        if(sub == 'add') {

            //console.log('ADD Sub_Command Executed') // debug

            let checkAlreadyAdded = 0
            
            await searchDB2.reqRoles.forEach((x) => { 
                if(x == role.id){
                    checkAlreadyAdded++
                }
                //console.log(x) //debug
            })
            if(checkAlreadyAdded > 0) return interaction.followUp({ content: `<@&${role.id}> is already added as required role for ${commandName}`, allowedMentions: { parse: [] } })
            
            searchDB2.reqRoles.push(`${role.id}`)
            await searchDB2
                .save()
                .catch((e) => { interaction.followUp({ content: e }) })
            
            let embed = new MessageEmbed()
                .setTitle(`Updated Required Role/s for the Command \`${commandName}\``)
                .setDescription(`All Required Roles Set for this Command is:\n> ➤ <@&${searchDB2.reqRoles.toString().replaceAll(',', `>\n> ➤ <@&`)}>`)
                .setColor('#2f3136')
            interaction.followUp({ embeds: [embed] })
        }

        // remove
        if(sub == 'remove') {

            // console.log('REMOVE Sub_Command Executed') // debug

            let newArray = arrayRemove(searchDB2.reqRoles, role.id)
            // console.log(newArray) // debug

            searchDB2.reqRoles = newArray
            await searchDB2
                .save()
                .catch((e) => { interaction.followUp({ content: e }) })

            let currentSetOfReqRoles = rolesSet(newArray);
            
            let embed = new MessageEmbed()
                .setTitle(`Updated Required Role/s for the Command \`${commandName}\``)
                .setDescription(
                    `Removed Role - <@&${role.id}>\n\n` +
                    `Current Set of Requried Roles for ${commandName} is:\n${currentSetOfReqRoles}`
                )
                .setColor('#2f3136')
            interaction.followUp({ embeds: [embed] })
        }

        // list
        if(sub == 'list') {

            let currentSetOfReqRoles = rolesSet(searchDB2.reqRoles);

            let embed = new MessageEmbed()
                .setTitle(`Required Role/s for the Command \`${commandName}\``)
                .setDescription(`All Required Set for this Command is:\n${currentSetOfReqRoles}`)
                .setColor('#2f3136')
            interaction.followUp({ embeds: [embed] })
        }

    }
};

// Function to remove a element from an Array
function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

// Function to make an Array of Role IDs to a String and a more readable formating 
function rolesSet(array){
    let setOfRoles;
    
    if(array == 0) {
        setOfRoles = `> ➤ \`Null\``
    }
    else if(array == 1) {
        setOfRoles = `> ➤ <@&${array.toString()}>`
    }
    else{
        setOfRoles = `> ➤ <@&${array.toString().replaceAll(',', `>\n> ➤ <@&`)}>`
    }

    return setOfRoles

}