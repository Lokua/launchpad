/* eslint-disable no-console */
const Launchpad = require(`./lib`)

const lp = new Launchpad()

// our application state
const pages = {}
const scenes = {}
const grid = {}

// lp.onMessage(console.log.bind(console))

lp.onPage(note => {
  const color = pages[note] ? lp.colors.off : lp.colors.red
  lp.setPage(note, color)
  pages[note] = !pages[note]
})

lp.onScene(note => {
  const color = scenes[note] ? lp.colors.off : lp.colors.amber
  lp.setScene(note, color)
  scenes[note] = !scenes[note]
})

lp.onGrid(note => {
  const color = grid[note] ? lp.colors.off : lp.colors.green
  lp.setGrid(note, color)
  grid[note] = !grid[note]
})

lp.allOff()
