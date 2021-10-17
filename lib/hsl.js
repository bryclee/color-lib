// Reference: https://en.wikipedia.org/wiki/HSL_and_HSV
const { round } = require('./util')

function rgbToHsl(r, g, b) {
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

  const l = cMax - cDelta / 2
  const s = cMax === 0 ? 0 : (cMax - l) / Math.min(l, 1 - l)

  return { h, s, l }
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const fh = ((h + 360) % 360) / 60
  const x = c * (1 - Math.abs((fh % 2) - 1))
  const m = l - c / 2

  const [fr, fg, fb] = // lowest point on rgb cube matching h and s values
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
    r: round((fr + m) * 255),
    g: round((fg + m) * 255),
    b: round((fb + m) * 255),
  }
}

// testcase: negative h to hslToRgb

module.exports = {
  rgbToHsl,
  hslToRgb,
}
