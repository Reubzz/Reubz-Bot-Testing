const Canvas = require('canvas');
const { registerFont } = require('canvas')

let BackGroundImg = ''

const canvas = Canvas.createCanvas(800, 765)
ctx = canvas.getContext('2d');

let background = await Canvas.loadImage(BackGroundImg)
ctx.globalAlpha = 0.8
ctx.drawImage(background, 0, 0, 800, 765)
ctx.restore()
