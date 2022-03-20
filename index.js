const { Client, Collection } = require("discord.js");
require('dotenv').config();

const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => res.send('Reubz Message Scheduler Part - 2 Bot Active!'));

app.listen(port, () => console.log(`Example app listening at http://localhost/main:${port}`));

const client = new Client({
    intents: 32767,
});

module.exports = client;

// Discord Modals
const discordModals = require('discord-modals') // Define the discord-modals package!
discordModals(client);

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Global Variables - Leveling system

const xp = require('simply-xp')
xp.connect(client.config.mongooseURI)
global.xp = xp

// Log File 
let fs = require('fs');
let util = require('util');

// logFile(logMessage, fileName)
// logMessage = Message to be logged
// fileName = the name of the file in logs folder
logFile = function(d, fileName) { //
    let log_file = fs.createWriteStream(__dirname + "/logs/" + fileName + ".log", {flags : 'w'});
    let log_stdout = process.stdout;

    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};
global.logFile = logFile

// Initializing the project
require("./handler")(client);

client.login(process.env.TOKEN);
