const player = require("../../client/player");


module.exports = {
    name: 'stop',
    aliases: ['dc', 'disconnect', 'leave', 'end'],
    description: 'Stops the Currently playing song and Leaves the VC',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if(!queue?.playing)
            return queue.destroy();

        await queue.destroy();
        
        interaction.followUp({ content: 'Leaving your VC' });
        
    }
}