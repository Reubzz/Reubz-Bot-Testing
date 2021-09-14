const momentTimezone = require('moment-timezone')
const { MessageCollector } = require('discord.js')

const scheduledSchema = require('./scheduled-schema')

module.exports = {
  name: 'schedule',
  aliases: 'sc',
  expectedArgs: '**`<Channel Tag>`** **`<DD/MM/YYYY>`** **`<HH:MM>`** **`<"AM" or "PM">`** **`<Timezone>`**',
  minArgs: 5,
  maxArgs: 5,

  init: (client) => {
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
            if (!guild) {
                continue
            };

            const channel = guild.channels.cache.get(channelId)
            if (!channel) {
                continue
            };

            channel.send(content)
        }

        await scheduledSchema.deleteMany(query)

        setTimeout(checkForPosts, 1000 * 10)
      }

      checkForPosts()
  },


  run: async ( message, args ) => {

    const targetChannel = message.mentions.channels.first()
    if (!targetChannel) {
      message.reply('Please tag a Channel to send your scheduled message.')
      return
    }

    //Remove the Channel Tag from the args array.
    args.shift()

    const [date, time, clockType, timeZone] = args

    if (clockType !== 'AM' && clockType !== 'PM') {
      message.reply(`**You Must Provide either __"AM" or "PM"__.** \n You provided: \n "${clockType}"`)
      return
    }

    const validTimeZones = momentTimezone.tz.names()
    if (!validTimeZones.includes(timeZone)) {
      messsage.reply('Unkown Timezone!!! Please use one of the following - <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c3ae60cb6e562f78300> `eg. Asia/Calcutta`')
      return
    }
    
    const targetDate = momentTimezone.tz(
      `${date} ${time} ${clockType}`,
      'DD-MM-YYYY HH:mm A',
      timeZone
    )

    message.reply(`<a:PepeDance:856035043762634752><a:dogedance:856034847998214164> **__SUCCESS!!__** <a:dogedance:856034847998214164><a:PepeDance:856035043762634752> \n\n> **__Current Settings__**\n> Target Channel - ${targetChannel}\n> Date - ${date}\n> Time - ${time}${clockType} \n\n<a:typing:841258320282386463> Please enter the message You would like to send. <a:typing:841258320282386463>\n<a:Load:855794725599313940> **You have 5 Minutes to enter your Message!** <a:Load:855794725599313940>`)

    const filter = (newMessage) => {
      return newMessage.author.id === message.author.id
    }

    const collector = new MessageCollector(message, filter, {
      max: 1,
      time: 1000 * 300 //5 minutes
    })

    collector.on('end', async (collected) => {
      const collectedMessage = collected.first()

      if (!collectedMessage) {
        message.reply('<a:No_1:841257803434688524> **__ERROR__** <a:No_1:841257803434688524>\nYou didnt reply in Time. <a:walkaway:855791140594253875>');
        return
      };


      message.reply('<a:cooldoge:773771689238593567> Your Message Has Been scheduled!! <a:cooldoge:773771689238593567>')
      collectedMessage.react('841257676545327114');


      await new scheduledSchema({
        date: targetDate.valueOf(),
        content:  collectedMessage.content,
        guildId: message.guildId,
        channelId: targetChannel.id
      }).save()
    })
  },
}

