const { MessageEmbed } = require("discord.js");
const player = require("../../client/player");
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: "lyrics",
    description: "Get lyrics for the currently playing song",
  

    run: async function (client, interaction, args) {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No music is currently being played",
            }).catch(console.error);

    let lyrics = null;


    try {
      lyrics = await lyricsFinder("", queue.current.title);
      if (!lyrics) lyrics = `No lyrics found for ${queue.current.title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.current.title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`${queue.current} — Lyrics`, )
      .setThumbnail(queue.current.img)
      .setColor("#2F3136")
      .setDescription(lyrics)
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return interaction.followUp({embeds: [lyricsEmbed] }).catch(console.error);
  },
};
