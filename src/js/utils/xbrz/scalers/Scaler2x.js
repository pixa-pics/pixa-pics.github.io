import { alphaBlend } from './Blender.js'

export default class Scaler2x {
  constructor () {
    this.scale = 2
  }

  scale () {
    return this.scale
  }

  blendLineShallow (col, out) {
    alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
    alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
  }

  blendLineSteep (col, out) {
    alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
    alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
  }

  blendLineSteepAndShallow (col, out) {
    alphaBlend(1, 4, out.ref(1, 0), col)
    alphaBlend(1, 4, out.ref(0, 1), col)
    alphaBlend(5, 6, out.ref(1, 1), col)
  }

  blendLineDiagonal (col, out) {
    alphaBlend(1, 2, out.ref(1, 1), col)
  }

  blendCorner (col, out) {
    alphaBlend(21, 100, out.ref(1, 1), col)
  }
}
