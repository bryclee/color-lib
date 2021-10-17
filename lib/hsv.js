// Reference: https://en.wikipedia.org/wiki/HSL_and_HSV
const { round } = require('./util')

function rgbToHsv(r, g, b) {
  const fr = r / 255
  const fg = g / 255
  const fb = b / 255

  const cMax = Math.max(fr, fg, fb)
  const cMin = Math.min(fr, fg, fb)
  const cDelta = cMax - cMin

  const h =
    cDelta === 0
      ? 0
      : cMax === fr
      ? 60 * (((fg - fb) / cDelta) % 6)
      : cMax === fg
      ? 60 * ((fb - fr) / cDelta + 2)
      : /* cMax === bf */ 60 * ((fr - fg) / cDelta + 4)

  const s = cMax === 0 ? 0 : cDelta / cMax
  const v = cMax

  return { h, s, v }
}

function hsvToRgb(h, s, v) {
  const c = v * s
  const fh = ((h + 360) % 360) / 60
  const x = c * (1 - Math.abs((fh % 2) - 1))
  const m = v - c

  const [rf, gf, bf] =
    0 <= fh && fh < 1
      ? [c, x, 0]
      : 1 <= fh && fh < 2
      ? [x, c, 0]
      : 2 <= fh && fh < 3
      ? [0, c, x]
      : 3 <= fh && fh < 4
      ? [0, x, c]
      : 4 <= fh && fh < 5
      ? [x, 0, c]
      : /* 5 <= fh && fh < 6 */
        [c, 0, x]

  return {
    r: round((rf + m) * 255),
    g: round((gf + m) * 255),
    b: round((bf + m) * 255),
  }
}

module.exports = { rgbToHsv, hsvToRgb }
