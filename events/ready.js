const client = require("../index");
var colors = require('colors/safe')

client.on("ready", () =>
    console.log(colors.brightGreen.bold(`${client.user.tag} is up and ready to go!`))
);


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
