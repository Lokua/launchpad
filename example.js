/* eslint-disable no-console */
const Launchpad = require(`./lib`)

const lp = new Launchpad()
const { off, red, amber, green } = Launchpad.colors

// our application state
const pages = {}
const scenes = {}
const grid = {}

// lp.onMessage(console.log.bind(console))

lp.onPage(note => {
  const color = pages[note] ? off : red
  lp.setPage(note, color)
  pages[note] = !pages[note]
})

lp.onScene(note => {
  const color = scenes[note] ? off : amber
  lp.setScene(note, color)
  scenes[note] = !scenes[note]
})

lp.onGrid(note => {
  const color = grid[note] ? off : green
  lp.setGrid(note, color)
  grid[note] = !grid[note]
})

lp.allOff()
