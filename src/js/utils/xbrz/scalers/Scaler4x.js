import { alphaBlend } from './Blender.js'
import Scaler3x from './Scaler3x.js'

export default class Scaler4x extends Scaler3x {
  constructor () {
    super()
    this.scale = 4
  }

  blendLineShallow (col, out) {
    super.blendLineShallow(col, out)
    // alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
    // alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)

    // alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)
    alphaBlend(3, 4, out.ref(this.scale - 2, 3), col)

    // out.ref(this.scale - 1, 2).set(col)
    out.ref(this.scale - 1, 3).set(col)
  }

  blendLineSteep (col, out) {
    super.blendLineSteep(col, out)
    // alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
    // alphaBlend(1, 4, out.ref(2, this.scale - 2), col)

    // alphaBlend(3, 4, out.ref(1, this.scale - 1), col)
    alphaBlend(3, 4, out.ref(3, this.scale - 2), col)

    // out.ref(2, this.scale - 1).set(col)
    out.ref(3, this.scale - 1).set(col)
  }

  blendLineSteepAndShallow (col, out) {
    alphaBlend(3, 4, out.ref(3, 1), col)
    alphaBlend(3, 4, out.ref(1, 3), col)
    alphaBlend(1, 4, out.ref(3, 0), col)
    alphaBlend(1, 4, out.ref(0, 3), col)

    alphaBlend(1, 3, out.ref(2, 2), col)

    out.ref(3, 3).set(col)
    out.ref(3, 2).set(col)
    out.ref(2, 3).set(col)
  }

  blendLineDiagonal (col, out) {
    alphaBlend(1, 2, out.ref(this.scale - 1, this.scale / 2), col)
    alphaBlend(1, 2, out.ref(this.scale - 2, this.scale / 2 + 1), col)
    out.ref(this.scale - 1, this.scale - 1).set(col)
  }

  blendCorner (col, out) {
    alphaBlend(68, 100, out.ref(3, 3), col)
    alphaBlend(9, 100, out.ref(3, 2), col)
    alphaBlend(9, 100, out.ref(2, 3), col)
  }
}
