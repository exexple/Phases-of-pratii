// Renders text to an offscreen canvas and samples it into a list of
// {x, y} points wherever the text is "ink". Used to morph constellation
// stars into the shape of her name.
export async function textToPoints(
  text,
  { width = 600, height = 160, fontSize = 90, step = 5, maxPoints = 160 } = {},
) {
  if (typeof document === 'undefined') return []

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready
    } catch {
      // fall back to whatever font is available — still produces a
      // legible, if slightly different, letter shape
    }
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return []

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `600 ${fontSize}px "Playfair Display", serif`
  ctx.fillText(text, width / 2, height / 2)

  const { data } = ctx.getImageData(0, 0, width, height)
  const points = []

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = data[(y * width + x) * 4 + 3]
      if (alpha > 128) points.push({ x, y })
    }
  }

  if (points.length <= maxPoints) return points

  // Evenly subsample down to maxPoints so density stays consistent
  // however busy the text rendering turned out to be.
  const result = []
  const spacing = points.length / maxPoints
  for (let i = 0; i < maxPoints; i++) {
    result.push(points[Math.floor(i * spacing)])
  }
  return result
}
