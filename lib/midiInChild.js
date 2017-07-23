// @see https://github.com/justinlatimer/node-midi/issues/95#issuecomment-241215430

const midi = require(`midi`)
const midiInput = new midi.input()
const SegfaultHandler = require(`segfault-handler`)

const args = process.argv.slice(2)
const [portNumber, options] = [+args[0], JSON.parse(args[1])]

midiInput.on(`message`, (_, bytes) => {
  if (!bytes[2] && options.ignore0Velocity) return
  process.send({ method: `midi`, bytes })
})

midiInput.openPort(portNumber)

process.send({ method: `ready` })

SegfaultHandler.registerHandler(`in-crash.log`, (signal, address, stack) => {
  // eslint-disable-next-line no-console
  console.log({ signal, address, stack })
})
