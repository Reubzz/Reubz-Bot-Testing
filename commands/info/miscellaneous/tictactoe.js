const simplyjs = require("simply-djs");

module.exports ={
    name: "tictactoe",
    aliases: ["x&o", "xo", "ox"],
    description: "A interactive Tic Tac Toe Command.",

    run: async (client, message, args) => {
        simplyjs.tictactoe(message, {
            embedColor: "#2F3136", 
            embedFoot: "GLHF",
            resultBtn: true
        })
    }
}