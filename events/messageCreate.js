const client = require("../index");
const config = require("../config.json");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if (command.ownerOnly && !config.owner.includes(message.author.id)) return message.channel.send(" <a:No_1:841257803434688524> **Access Denied!** \n ONLY REUBZ CAN USE THIS COMMAND!");
    
    await command.run(client, message, args);
});
