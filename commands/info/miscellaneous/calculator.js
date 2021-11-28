const simplydjs = require("simply-djs")
module.exports = {
    name: "calculator",
    aliases: "calc",
    description: "Interactive Calculator for Discord",
    
    run: async (client, message, args)=>{
        simplydjs.calculator(message, {
            embedColor: "#2F3136"
        })
    }
}