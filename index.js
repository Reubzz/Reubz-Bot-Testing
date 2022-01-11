const { Client, Collection } = require("discord.js");
require('dotenv').config();

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Global Variables - Leveling system

const xp = require('simply-xp')
xp.connect(client.config.mongooseURI)
global.xp = xp

// Initializing the project
require("./handler")(client);

client.login(process.env.TOKEN);
