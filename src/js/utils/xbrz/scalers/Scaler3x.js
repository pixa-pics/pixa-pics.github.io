import { alphaBlend } from './Blender.js'
import Scaler2x from './Scaler2x.js'

export default class Scaler3x extends Scaler2x{
  constructor () {
    super()
    this.scale = 3
  }

  blendLineShallow (col, out) {
    super.blendLineShallow(col, out)
    // alphaBlend(1, 4, out.ref(this.scale - 1, 0), col)
    alphaBlend(1, 4, out.ref(this.scale - 2, 2), col)

    // alphaBlend(3, 4, out.ref(this.scale - 1, 1), col)

    out.ref(this.scale - 1, 2).set(col)
  }

  blendLineSteep (col, out) {
    super.blendLineSteep(col, out)
    // alphaBlend(1, 4, out.ref(0, this.scale - 1), col)
    alphaBlend(1, 4, out.ref(2, this.scale - 2), col)

    // alphaBlend(3, 4, out.ref(1, this.scale - 1), col)

    out.ref(2, this.scale - 1).set(col)
  }

  blendLineSteepAndShallow (col, out) {
    alphaBlend(1, 4, out.ref(2, 0), col)
    alphaBlend(1, 4, out.ref(0, 2), col)

    alphaBlend(3, 4, out.ref(2, 1), col)
    alphaBlend(3, 4, out.ref(1, 2), col)

    out.ref(2, 2).set(col)
  }

  blendLineDiagonal (col, out) {
    alphaBlend(1, 8, out.ref(1, 2), col)
    alphaBlend(1, 8, out.ref(2, 1), col)
    alphaBlend(7, 8, out.ref(2, 2), col)
  }

  blendCorner (col, out) {
    alphaBlend(45, 100, out.ref(2, 2), col)
  }
}
