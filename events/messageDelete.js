const simplydjs = require('simply-djs');
const client = require("../index");
const config = require("../config.json");

// Simply - DJS --->> Starboard Command

client.on("messageDelete", async (message) => {
    simplydjs.starboard(client, message, {
        event: "messageDelete",
        chid: "892447727189897247",
        embedColor: "2F3136",
        min: 1,
        credit: false,
        embedFoot: "Starboard - Reubz Bot",
    });
})