/* eslint-disable no-console */
const Launchpad = require(`./lib`)

const lp = new Launchpad(/^Launchpad/)

const metaRow = {}
const metaCol = {}
const grid = {}

lp.onMessage(console.log.bind(console))

lp.onMetaRowPress((note, value) => {
  if (!value) return
  const color = metaRow[note] ? lp.colors.off : lp.colors.red
  lp.metaRowSet(note, color)
  metaRow[note] = !metaRow[note]
})

lp.onMetaColPress((note, value) => {
  if (!value) return
  const color = metaCol[note] ? lp.colors.off : lp.colors.amber
  lp.metaColSet(note, color)
  metaCol[note] = !metaCol[note]
})

lp.onGridPress((note, value) => {
  if (!value) return
  const color = grid[note] ? lp.colors.off : lp.colors.green
  lp.gridSet(note, color)
  grid[note] = !grid[note]
})

lp.send([176, 0, 0])
