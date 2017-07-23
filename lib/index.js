const midi = require(`midi`)
const SegfaultHandler = require(`segfault-handler`)
const onExit = require(`./onExit`)
const colors = require(`./colors`)
const { getPortNumber, isControlChange } = require(`@lokua/midi-util`)

SegfaultHandler.registerHandler(`crash.log`)

class Launchpad {
  static isMetaRowPress(status) {
    return isControlChange(status)
  }

  static isMetaColPress(note) {
    return note % 8 === 0 && (note / 8) % 2 === 1
  }

  static isGridPress(status, note) {
    return !(Launchpad.isMetaRowPress(status) || Launchpad.isMetaColPress(note))
  }

  constructor(portName = /^Launchpad/, options = { ignore0Velocity: false }) {
    const [i, o] = [
      getPortNumber(`input`, portName),
      getPortNumber(`output`, portName)
    ]

    if (i === -1 || o === -1) {
      throw new Error(`could not find port # for ${portName}`)
    }

    this.options = options
    this.input = new midi.input()
    this.output = new midi.output()

    this.input.openPort(i)
    this.output.openPort(o)

    this.colors = colors

    onExit(() => this.closePorts())
  }

  onMessage(fn) {
    this.input.on(`message`, (_, message) => fn(message))
    return this
  }

  send(...message) {
    this.output.sendMessage(Array.isArray(message[0]) ? message[0] : message)
    return this
  }

  onMetaRowPress(fn) {
    this.onMessage(([status, note, value]) => {
      if (!value && this.options.ignore0Velocity) return this
      if (Launchpad.isMetaRowPress(status)) {
        fn(note, value)
      }
    })
    return this
  }

  onMetaColPress(fn) {
    this.onMessage(([status, note, value]) => {
      if (!value && this.options.ignore0Velocity) return
      if (Launchpad.isMetaColPress(note) && !Launchpad.isMetaRowPress(status)) {
        fn(note, value)
      }
    })
    return this
  }

  onGridPress(fn) {
    this.onMessage(([status, note, value]) => {
      if (!value && this.options.ignore0Velocity) return
      if (Launchpad.isGridPress(status, note)) {
        fn(note, value)
      }
    })
    return this
  }

  closePorts() {
    this.input.closePort()
    this.output.closePort()
    return this
  }

  allOff() {
    this.send(176, 0 ,0)
  }

  metaRowSet(note, color) {
    this.send(176, note, color)
  }

  metaColSet(note, color) {
    this.send(144, note, color)
  }

  gridSet(note, color) {
    this.send(144, note, color)
  }
}

Launchpad.colors = colors

module.exports = Launchpad
