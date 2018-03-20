class Launchpad {
  static isPage(status) {
    return status >= 176 && status < 192
  }

  static isScene(status, note) {
    return !Launchpad.isPage(status) && note % 8 === 0 && (note / 8) % 2 === 1
  }

  static isGrid(status, note) {
    return !(Launchpad.isPage(status) || Launchpad.isScene(status, note))
  }

  static controllerToPage(cc) {
    return cc - 104
  }

  static pageToController(page) {
    return page + 104
  }

  static noteToScene(note) {
    return Math.floor(note / 16)
  }

  static sceneToNote(scene) {
    return scene * 16 + 8
  }

  static noteToGrid(note) {
    const [row, col] = [Math.floor(note / 16), note % 8]
    return 8 * row + col
  }

  static gridToNote(number) {
    const [row, col] = [Math.floor(number / 8), number % 8]
    return 16 * row + col
  }

  static createInputStub() {
    return {
      on() {},
      addEventListener() {}
    }
  }

  static createOutputStub() {
    return {
      send() {},
      sendMessage() {}
    }
  }

  static isNodeMidiInput(port) {
    return port && port.constructor && port.constructor.name === 'NodeMidiInput'
  }

  static create(...args) {
    return new Launchpad(...args)
  }

  constructor(input, output, config = {}) {
    this.config = Object.assign({}, Launchpad.defaultConfig, config)
    this.input = input
    this.output = output
    this.handlers = []

    if (!this.input) {
      process.env.NODE_ENV !== 'test' &&
        console.warn('[Launchpad] `input` is undefined; using stub')

      this.input = Launchpad.createInputStub()
    }

    if (!this.output) {
      process.env.NODE_ENV !== 'test' &&
        console.warn('[Launchpad] `output` is undefined; using stub')

      this.output = Launchpad.createOutputStub()
    }

    if (Launchpad.isNodeMidiInput(input)) {
      this.messageHandler = (_, data) => {
        this.handleMessage(data)
      }

      this.input.on('message', this.messageHandler)
    } else {
      this.messageHandler = ({ data }) => {
        this.handleMessage(data)
      }

      this.input.addEventListener('midimessage', this.messageHandler)
    }
  }

  handleMessage(data) {
    this.handlers.forEach(h => {
      h(...data)
    })
  }

  get normalize() {
    return this.config.normalize
  }

  controllerToPage(cc) {
    return this.normalize ? Launchpad.controllerToPage(cc) : cc
  }

  pageToController(page) {
    return this.normalize ? Launchpad.pageToController(page) : page
  }

  noteToScene(note) {
    return this.normalize ? Launchpad.noteToScene(note) : note
  }

  sceneToNote(scene) {
    return this.normalize ? Launchpad.sceneToNote(scene) : scene
  }

  noteToGrid(note) {
    return this.normalize ? Launchpad.noteToGrid(note) : note
  }

  gridToNote(number) {
    return this.normalize ? Launchpad.gridToNote(number) : number
  }

  send(...message) {
    const sendMethod = this.config.isNodeMidi ? 'sendMessage' : 'send'
    this.output[sendMethod](message)
  }

  allOff() {
    this.send(176, 0, 0)
  }

  shouldIgnore(value) {
    return value === 0 && this.config.ignore0Velocity
  }

  onMessage(fn) {
    this.handlers.push(fn)
  }

  shouldIgnoreIncomingPage(status, value) {
    return !Launchpad.isPage(status) || this.shouldIgnore(value)
  }

  shouldIgnoreIncomingScene(status, note, value) {
    return !Launchpad.isScene(status, note) || this.shouldIgnore(value)
  }

  shouldIgnoreIncomingGrid(status, note, value) {
    return !Launchpad.isGrid(status, note) || this.shouldIgnore(value)
  }

  onPage(fn) {
    this.handlers.push((status, cc, value) => {
      if (!this.shouldIgnoreIncomingPage(status, value)) {
        fn(this.controllerToPage(cc), value)
      }
    })
  }

  onScene(fn) {
    this.handlers.push((status, note, value) => {
      if (!this.shouldIgnoreIncomingScene(status, note, value)) {
        fn(this.noteToScene(note), value)
      }
    })
  }

  onGrid(fn) {
    this.handlers.push((status, note, value) => {
      if (!this.shouldIgnoreIncomingGrid(status, note, value)) {
        fn(this.noteToGrid(note), value)
      }
    })
  }

  setPage(page, color) {
    this.send(176, this.pageToController(page), color)
  }

  setScene(scene, color) {
    this.send(144, this.sceneToNote(scene), color)
  }

  setGrid(number, color) {
    this.send(144, this.gridToNote(number), color)
  }
}

Launchpad.defaultConfig = {
  ignore0Velocity: true,
  normalize: true
}

Launchpad.colors = {
  off: 12,
  redLow: 13,
  red: 15,
  amberLow: 29,
  amber: 63,
  yellow: 62,
  greenLow: 28,
  green: 60
}

module.exports = Launchpad
