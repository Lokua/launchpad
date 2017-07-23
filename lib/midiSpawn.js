/* eslint-disable no-console */

// @see https://github.com/justinlatimer/node-midi/issues/95#issuecomment-241215430

const cp = require(`child_process`)

const exitEvents = [`close`, `disconnect`, `error`, `exit`]

module.exports = (inputPortNumber, outputPortNumber, options) => {
  let outProcess = mountOutput(outputPortNumber)
  let inProcess = mountInput(inputPortNumber, outProcess, options)

  return { inProcess, outProcess }
}

function mountInput(portNumber, outProcess, options) {
  let inProcess = cp.fork(`${__dirname}/midiInChild.js`, [portNumber, JSON.stringify(options)])

  inProcess.on(`message`, m => {
    m.thing = `inProcess`
    outProcess.send(m)
  })

  exitEvents.forEach(eventType => {
    inProcess.on(eventType, () => {
      console.log(`inProcess sent ("${eventType}")`)
      outProcess.send({ method: `crash`, thing: `inProcess` })
      mountInput(portNumber, outProcess)
    })
  })

  return inProcess
}

function mountOutput(portNumber) {
  let outProcess = cp.fork(`${__dirname}/midiOutChild.js`, [portNumber])

  exitEvents.forEach(eventType => {
    outProcess.on(eventType, () => {
      console.log(`outProcess sent ("${eventType}")`)
      process.exit()
    })
  })

  return outProcess
}
