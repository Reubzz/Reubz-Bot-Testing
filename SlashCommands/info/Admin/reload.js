const { Client, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);
module.exports = {
    name: "reload",
    description: "Reloads all the Slash Commands of the Bot to add new commands.",
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "command-type",
            description: "Either Slash-Commands or Chat Commands",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Slash Commands",
                    value: "sc",
                },
                {
                    name: "Chat Commands",
                    value: "cc",
                },
            ]
        }
    ],


    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const reload = interaction.options.getString('Command Type')

        if(reload === 'sc'){
        const guild  = client.guilds.cache.get("798518088697774101");
        await guild 
            //.commands.set([]) // to delete all slash commands
            .commands.set(arrayOfSlashCommands)
            .then((cmd) => {
                const getRoles = (commandName) => {
                    const permissions = arrayOfSlashCommands.find(
                        (x) => x.name === commandName
                    ).userPermissions;
                    if(!permissions) return null;
                    return guild.roles.cache.filter((x) => x.permissions.has(permissions) && !x.managed);
                };
                const fullPermissions = cmd.reduce((accumulator, x) => {
                    const roles = getRoles(x.name);
                    if(!roles) return accumulator;

                    const permissions = roles.reduce((a, v) => {
                        return [
                            ...a,
                            {
                                id: v.id,
                                type: "ROLE",
                                permission: true,
                            },
                        ];
                    }, []);

                    return [
                        ...accumulator,
                        {
                            id: x.id,
                            permissions,
                        },
                    ];
                }, []);

                guild.commands.permissions.set({ fullPermissions });
            });

        }
        else if(reload === 'cc'){
        const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
        commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
        }
    },
};