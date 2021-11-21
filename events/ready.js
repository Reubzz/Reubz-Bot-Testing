const client = require("../index");
const config = require('../config.json');
var colors = require('colors/safe')


// client.on("ready", () =>
//     console.log(colors.brightGreen.bold(`${client.user.tag} is up and ready to go!`))
// );

client.on("ready", async () => {
  console.log(colors.green.bold("Success!"))
  console.log(colors.gray("Connected To"), colors.yellow(`${client.user.tag}`));
  console.log(
    colors.white("Watching"),
    colors.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    colors.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users," : "User,"}`),
    colors.red(`${client.guilds.cache.size}`),
    colors.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
  )
  console.log(
    colors.white(`Prefix:` + colors.red(` ${config.prefix}`)),
    colors.white("||"),
    colors.red(`${client.commands.size}` + ` Commands`),
    colors.white("||"),
    colors.red(`${client.slashCommands.size}` + ` Slash Commands`),
  );
  console.log("")
  console.log(colors.red.bold("——————————[Statistics]——————————"))
  console.log(colors.gray(`Running on Node ${process.version} on ${process.platform} ${process.arch}`))
  console.log(colors.gray(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))

  client.user.setActivity('with Dyno', {type: 'COMPETING' }),
  client.user.setStatus('dnd')
})


/*
 ** TEXT  COLORS **                                      ** BACKGROUND   COLORS **              

- black                         - rainbow               - bgBlack  
- red       - brightRed         - zebra                 - bgRed     - bgBrightRed  
- green     - brightGreen       - america               - bgGreen   - bgBrightGreen
- yellow    - brightYellow      - trap                  - bgYellow  - bgBrightYellow
- blue      - brightBlue                                - bgBlue    - bgBrightBlue
- magenta   - brightMagenta     - random                - bgMagenta - bgBrightMagenta
- cyan      - brightCyan                                - bgCyan    - bgBrightCyan
- white     - brightWhite                               - bgWhite   - bgBrightWhite
- gray                                                  - bgGray 
- grey                                                  - bgGrey 

 ** STYLES **

- bold
- dim
- italic
- underline
- inverse
- hidden
- strikethrough
*/
