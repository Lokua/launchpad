const midi = require('midi')
const Launchpad = require('../src/index')

const input = new midi.input()
const output = new midi.output()
const findPortNumber = findPortNumberByRegExp(/Launchpad/)
input.openPort(findPortNumber('input'))
output.openPort(findPortNumber('output'))

const launchpad = new Launchpad(input, output)

const { off, red, amber, green } = Launchpad.colors

launchpad.onMessage(console.log)

launchpad.allOff()

// our application state
const pages = {}
const scenes = {}
const grid = {}

launchpad.onPage(note => {
  const color = pages[note] ? off : red
  launchpad.setPage(note, color)
  pages[note] = !pages[note]
})

launchpad.onScene(note => {
  const color = scenes[note] ? off : amber
  launchpad.setScene(note, color)
  scenes[note] = !scenes[note]
})

launchpad.onGrid(note => {
  const color = grid[note] ? off : green
  launchpad.setGrid(note, color)
  grid[note] = !grid[note]
})

setTimeout(() => {
  launchpad.destroy()
}, 1000)

function findPortNumberByRegExp(regExp) {
  return portType => {
    const port = new midi[portType]()

    for (let i = 0; i < port.getPortCount(); i++) {
      if (regExp.test(port.getPortName(i))) {
        return i
      }
    }
  }
}
