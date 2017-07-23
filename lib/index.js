const midi = require(`midi`)
const SegfaultHandler = require(`segfault-handler`)
const onExit = require(`./onExit`)
const colors = require(`./colors`)
const { getPortNumber } = require(`@lokua/midi-util`)
const {
  isMetaRowPress,
  isMetaColPress,
  isGridPress,
  noteToGridNumber,
  gridNumberToNote
} = require(`./util`)

SegfaultHandler.registerHandler(`crash.log`)

class Launchpad {
  constructor(portName = /^Launchpad/, options = {}) {
    const [i, o] = [
      getPortNumber(`input`, portName),
      getPortNumber(`output`, portName)
    ]

    if (i === -1 || o === -1) {
      throw new Error(`could not find port # for ${portName}`)
    }

    this.options = Object.assign({}, {
      ignore0Velocity: true,
      normalize: true
    }, options)

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
      if (isMetaRowPress(status)) {
        fn(this.options.normalize ? note - 104 : note, value)
      }
    })
    return this
  }

  onMetaColPress(fn) {
    this.onMessage(([status, note, value]) => {
      if (!value && this.options.ignore0Velocity) return
      if (isMetaColPress(note) && !isMetaRowPress(status)) {
        fn(this.options.normalize ? Math.floor(note / 16) : note, value)
      }
    })
    return this
  }

  onGridPress(fn) {
    this.onMessage(([status, note, value]) => {
      if (!value && this.options.ignore0Velocity) return
      if (isGridPress(status, note)) {
        fn(this.options.normalize ? noteToGridNumber(note) : note, value)
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

  metaRowSet(number, color) {
    const value = this.options.normalize ? number + 104 : number
    this.send(176, value, color)
  }

  metaColSet(number, color) {
    const note = this.options.normalize ? (number * 16) + 8 : number
    this.send(144, note, color)
  }

  gridSet(number, color) {
    this.send(
      144,
      this.options.normalize ? gridNumberToNote(number) : number,
      color
    )
  }
}

Launchpad.colors = colors

module.exports = Launchpad
