const Launchpad = require(`./lib`)

const lp = new Launchpad(/^Launchpad/, { ignore0Velocity: true })

// our application state
const metaRow = {}
const metaCol = {}
const grid = {}

// eslint-disable-next-line no-console
lp.onMessage(console.log.bind(console))

lp.onMetaRowPress(note => {
  const color = metaRow[note] ? lp.colors.off : lp.colors.red
  lp.metaRowSet(note, color)
  metaRow[note] = !metaRow[note]
})

lp.onMetaColPress(note => {
  const color = metaCol[note] ? lp.colors.off : lp.colors.amber
  lp.metaColSet(note, color)
  metaCol[note] = !metaCol[note]
})

lp.onGridPress(note => {
  const color = grid[note] ? lp.colors.off : lp.colors.green
  lp.gridSet(note, color)
  grid[note] = !grid[note]
})

lp.allOff()
