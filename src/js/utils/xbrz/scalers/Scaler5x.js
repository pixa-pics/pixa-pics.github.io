import { alphaBlend } from './Blender.js'
import Scaler4x from './Scaler4x.js'

export default class Scaler5x extends Scaler4x{
  constructor () {
    super()
    this.scale = 5
  }

  blendLineShallow (col, out) {
    super.blendLineShallow(col, out)
    // **
    // alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
    // alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)
    alphaBlend(1, 4, out.ref(this.scale - 3, 4), col)
    // alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
    // alphaBlend(3, 4, out.ref(this.scale - 2, 3), col)
    // out.ref(this.scale - 1, 2).set(col)
    // out.ref(this.scale - 1, 3).set(col)
    out.ref(this.scale - 1, 4).set(col)
    out.ref(this.scale - 2, 4).set(col)
  }

  blendLineSteep (col, out) {
    super.blendLineSteep(col, out)
    // alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
    // alphaBlend(1, 4, out.ref(2, this.scale - 2), col)
    alphaBlend(1, 4, out.ref(4, this.scale - 3), col)
    // alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
    alphaBlend(3, 4, out.ref(3, this.scale - 2), col)
    // out.ref(2, this.scale - 1).set(col)
    // out.ref(3, this.scale - 1).set(col)
    out.ref(4, this.scale - 1).set(col)
    out.ref(4, this.scale - 2).set(col)
  }

  blendLineSteepAndShallow (col, out) {
    alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
    alphaBlend(1, 4, out.ref(2, this.scale - 2), col)
    alphaBlend(3, 4, out.ref(1, this.scale - 1), col)

    alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
    alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)
    alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
    alphaBlend(2, 3, out.ref(3, 3), col)

    out.ref(2, this.scale - 1).set(col)
    out.ref(3, this.scale - 1).set(col)
    out.ref(4, this.scale - 1).set(col)

    out.ref(this.scale - 1, 2).set(col)
    out.ref(this.scale - 1, 3).set(col)
  }

  blendLineDiagonal (col, out) {
    // **
    alphaBlend(1, 8, out.ref(this.scale - 1, this.scale / 2), col)
    alphaBlend(1, 8, out.ref(this.scale - 2, this.scale / 2 + 1), col)
    alphaBlend(1, 8, out.ref(this.scale - 3, this.scale / 2 + 2), col)
    alphaBlend(7, 8, out.ref(4, 3), col)
    alphaBlend(7, 8, out.ref(3, 4), col)
    out.ref(4, 4).set(col)
  }

  blendCorner (col, out) {
    alphaBlend(86, 100, out.ref(4, 4), col)
    alphaBlend(23, 100, out.ref(4, 3), col)
    alphaBlend(23, 100, out.ref(3, 4), col)
  }
}
