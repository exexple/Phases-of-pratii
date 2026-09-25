// Coordinates live in a 400 x 520 space (see the viewBox in
// ConstellationScene). `correct: true` stars form a P when connected in
// the order listed in `pathOrder`. Everything else is a decoy — tapping
// a decoy just gives a small, gentle pulse. There's no "wrong" answer.

export const stars = [
  // --- the P, in connection order ---
  { id: 'p1', x: 150, y: 430, correct: true },
  { id: 'p2', x: 150, y: 390, correct: true },
  { id: 'p3', x: 150, y: 350, correct: true },
  { id: 'p4', x: 150, y: 310, correct: true },
  { id: 'p5', x: 150, y: 270, correct: true },
  { id: 'p6', x: 150, y: 230, correct: true },
  { id: 'p7', x: 192, y: 214, correct: true },
  { id: 'p8', x: 224, y: 240, correct: true },
  { id: 'p9', x: 214, y: 274, correct: true },
  { id: 'p10', x: 172, y: 278, correct: true },

  // --- decoys, scattered around ---
  { id: 'd1', x: 60, y: 120, correct: false },
  { id: 'd2', x: 300, y: 90, correct: false },
  { id: 'd3', x: 340, y: 180, correct: false },
  { id: 'd4', x: 320, y: 340, correct: false },
  { id: 'd5', x: 280, y: 440, correct: false },
  { id: 'd6', x: 80, y: 480, correct: false },
  { id: 'd7', x: 40, y: 300, correct: false },
  { id: 'd8', x: 260, y: 60, correct: false },
  { id: 'd9', x: 350, y: 420, correct: false },
  { id: 'd10', x: 100, y: 60, correct: false },
  { id: 'd11', x: 200, y: 470, correct: false },
]

// Fixed connection order — a segment is drawn between consecutive entries
// once BOTH endpoints have been tapped, regardless of the order the
// person actually taps them in.
export const pathOrder = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10']
