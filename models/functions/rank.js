const imageDB = require('../databases/CustomRankCard');

async function rankcard(typeofcommand, targetUserID, guildID) {

    const user = await imageDB.findOne({ user: targetUserID, gid: guildID })
        
    const bgimage = user? user.img : 'https://i.imgur.com/EnPpetR.jpg'
    const lvlbar = user? user.lvlbar : '#ffffff'


    return new Promise(async (resolve) => {
        xp.rank(typeofcommand, targetUserID, guildID, {
            background: bgimage,
            lvlbar: lvlbar
        }).then((img) => {
            resolve(img)
        })
    })
}

module.exports = { rankcard: rankcard }