const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const { mongooseConnectionString } = require("../config.json");
const mongoose = require("mongoose");
var colors = require('colors/safe')

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
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

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/**/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        const guild  = client.guilds.cache.get("798518088697774101");
        // Register for a single guild
        // to register slash command for a guild
        await guild 
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

            //.commands.set([]) // to delete all slash commands 


        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands);
    });

    

    // mongoose 

    
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => console.log(colors.brightCyan.bgBlack.bold('Connected to Database')));

};
