class Launchpad {
  static isPage(status) {
    return status === 176
  }

  static isScene(status, note) {
    return status === 144 && note % 8 === 0 && (note / 8) % 2 === 1
  }

  static isGrid(status, note) {
    return status === 144 && note % 16 < 8
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

  constructor(input, output, config = {}) {
    this.config = Object.assign(
      { isNodeMidi: Launchpad.isNodeMidiInput(input) },
      Launchpad.defaultConfig,
      config
    )

    this.input = input
    this.output = output
    this.handlers = new Map()
    this.handlers.set('page', [])
    this.handlers.set('scene', [])
    this.handlers.set('grid', [])
    this.handlers.set('all', [])

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

    if (this.config.isNodeMidi) {
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

    ;[
      'controllerToPage',
      'pageToController',
      'noteToScene',
      'sceneToNote',
      'noteToGrid',
      'gridToNote'
    ].forEach(key => {
      this[key] = this.config.normalize
        ? value => Launchpad[key](value)
        : x => x
    })
  }

  shouldIgnore(value) {
    return value === 0 && this.config.ignore0Velocity
  }

  handleMessage([status, data1, data2]) {
    this.handlers.get('all').forEach(fn => {
      fn(status, data1, data2)
    })

    if (this.shouldIgnore(data2)) {
      return
    }

    const handlersKey = Launchpad.isGrid(status, data1)
      ? 'grid'
      : Launchpad.isPage(status) ? 'page' : 'scene'

    const handlers = this.handlers.get(handlersKey)

    handlers.forEach(h => {
      h(status, data1, data2)
    })
  }

  onMessage(callback) {
    this.handlers.get('all').push(callback)
  }

  onPage(callback) {
    this.handlers.get('page').push((status, cc, value) => {
      callback(this.controllerToPage(cc), value)
    })
  }

  onScene(callback) {
    this.handlers.get('scene').push((status, note, value) => {
      callback(this.noteToScene(note), value)
    })
  }

  onGrid(callback) {
    this.handlers.get('grid').push((status, note, value) => {
      callback(this.noteToGrid(note), value)
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

  allOff() {
    this.send(176, 0, 0)
  }

  send(...message) {
    const sendMethod = this.config.isNodeMidi ? 'sendMessage' : 'send'
    this.output[sendMethod](message)
  }

  destroy() {
    this.handlers.clear()

    if (this.config.isNodeMidi) {
      this.input.removeListener('message', this.messageHandler)
    } else {
      this.input.removeEventListener('midimessage', this.messageHandler)
    }

    delete this.messageHandler
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
