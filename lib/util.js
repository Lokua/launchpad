const midi = require(`midi`)

module.exports = {
  times,
  getMidiPortNumber
}

function times(n, fn) {
  for (let i = 0; i < n; i++) {
    const doBreak = fn(i)
    if (doBreak) break
  }
}

function getMidiPortNumber(portType, name) {
  const io = new midi[portType]()

  let portNumber = -1

  times(io.getPortCount(), n => {
    if (name.test(io.getPortName(n))) {
      portNumber = n
      return true
    }
  })

  return portNumber
}
