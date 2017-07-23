/* eslint-disable no-console */

// @see https://github.com/justinlatimer/node-midi/issues/95#issuecomment-241215430

const midi = require(`midi`)
const midiOutput = new midi.output()
const SegfaultHandler = require(`segfault-handler`)

let crashedThing = null

midiOutput.openPort(+process.argv[2])

process.on(`message`, (m) => {
  if (m.method === `crash` && !crashedThing) {
    console.log(`${crashedThing} crashed!`)
    return
  }

  if (m.method === `ready` && m.thing === crashedThing) {
    console.log(`${crashedThing} is back online!`)
    crashedThing = null
    return
  }

  if (m.method === `midi`) midiOutput.sendMessage(m.bytes)
})

SegfaultHandler.registerHandler(`out-crash.log`, (signal, address, stack) => {
  // eslint-disable-next-line no-console
  console.log({ signal, address, stack })
})
