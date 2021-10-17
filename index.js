const { rgbToHsv, hsvToRgb, rgbToHsl, hslToRgb, round } = require('./lib')

function shiftHue(shift, r, g, b) {
  const { h, s, v } = rgbToHsv(r, g, b)
  return hsvToRgb((h + shift) % 360, s, v)
}

module.exports = { rgbToHsv, hsvToRgb, rgbToHsl, hslToRgb, shiftHue, round }
