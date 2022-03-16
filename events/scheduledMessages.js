const client = require("../index");
const config = require('../config.json');
const scheduledSchema = require("../models/databases/messageScheduler");

client.on('ready', () => {
    const checkForPosts = async () => {
        const query = {
            date: {
                $lte: Date.now()
            }
        }

        const results = await scheduledSchema.find(query)

        for (const post of results) {
            const { guildId, channelId, content } = post

            const guild = await client.guilds.fetch(guildId)
            if(!guild) continue

            const channel = guild.channels.cache.get(channelId)
            if(!channel) continue

            channel.send({ content: content});
        }

        await scheduledSchema.deleteMany(query)
        setTimeout(checkForPosts, 1000 * 30)
    }
    checkForPosts()
})