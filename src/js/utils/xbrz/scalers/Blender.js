const redMask = 0xff0000
const greenMask = 0x00ff00
const blueMask = 0x0000ff

function blendComponent (mask, n, m, inPixel, setPixel) {
  const inChan = inPixel & mask
  const setChan = setPixel & mask
  const blend = setChan * n + inChan * (m - n)
  return mask & (blend / m)
}

function alphaBlend (n, m, dstPtr, col) {
  // assert n < 256 : "possible overflow of (col & redMask) * N";
  // assert m < 256 : "possible overflow of (col & redMask) * N + (dst & redMask) * (M - N)";
  // assert 0 < n && n < m : "0 < N && N < M";

  const dst = dstPtr.get()
  const redComponent = blendComponent(redMask, n, m, dst, col)
  const greenComponent = blendComponent(greenMask, n, m, dst, col)
  const blueComponent = blendComponent(blueMask, n, m, dst, col)
  const blend = (redComponent | greenComponent | blueComponent)
  dstPtr.set(blend | 0xff000000)
}

export { alphaBlend }
