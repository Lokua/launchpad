const assert = require('assert')
const LP = require('./index')

const fill = n =>
  Array(n)
    .fill(null)
    .map((_, i) => i)

const zeroUpTo8 = fill(8)
const zeroUpTo64 = fill(64)
const pageNumbers = [104, 105, 106, 107, 108, 109, 110, 111]
const sceneNumbers = [8, 24, 40, 56, 72, 88, 104, 120]

// prettier-ignore
const gridNumbers = [
  0, 1, 2, 3, 4, 5, 6, 7, 
  16, 17, 18, 19, 20, 21, 22, 23, 
  32, 33, 34, 35, 36, 37, 38, 39, 
  48, 49, 50, 51, 52, 53, 54, 55,
  64, 65, 66, 67, 68, 69, 70, 71,
  80, 81, 82, 83, 84, 85, 86, 87, 
  96, 97, 98, 99, 100, 101, 102, 103,
  112, 113, 114, 115, 116, 117, 118, 119
]

const test = (desc, fn) => fn()

test('does not throw', () => assert.doesNotThrow(() => new LP()))
test('does not throw', () => assert.doesNotThrow(LP.create))

test('.isPage', () => {
  pageNumbers.forEach(x => {
    assert.ok(LP.isPage(176, x))
  })
  sceneNumbers.forEach(x => {
    assert.ok(!LP.isPage(144, x))
  })
  gridNumbers.forEach(x => {
    assert.ok(!LP.isPage(144, x))
  })
})

test('.isScene', () => {
  sceneNumbers.forEach(x => {
    assert.ok(LP.isScene(144, x))
  })
  pageNumbers.forEach(x => {
    assert.ok(!LP.isScene(176, x))
  })
  gridNumbers.forEach(x => {
    assert.ok(!LP.isScene(144, x))
  })
})

test('.isGrid', () => {
  gridNumbers.forEach(x => {
    assert.ok(LP.isGrid(144, x))
  })
  sceneNumbers.forEach(x => {
    assert.ok(!LP.isGrid(144, x))
  })
  pageNumbers.forEach(x => {
    assert.ok(!LP.isGrid(176, x))
  })
})

test('.controllerToPage', () => {
  assert.deepEqual(pageNumbers.map(LP.controllerToPage), zeroUpTo8)
})

test('.pageToController', () => {
  assert.deepEqual(zeroUpTo8.map(LP.pageToController), pageNumbers)
})

test('.noteToScene', () => {
  const equalsN = a => b => assert.equal(a, b)
  ;[0, 1, 2, 3, 4, 5, 6, 7].map(LP.noteToScene).every(equalsN(0))
  ;[16, 17, 18, 19, 20, 21, 22, 23].map(LP.noteToScene).every(equalsN(1))
  ;[32, 33, 34, 35, 36, 37, 38, 39].map(LP.noteToScene).every(equalsN(2))
  ;[48, 49, 50, 51, 52, 53, 54, 55].map(LP.noteToScene).every(equalsN(3))
  ;[64, 65, 66, 67, 68, 69, 70, 71].map(LP.noteToScene).every(equalsN(4))
  ;[80, 81, 82, 83, 84, 85, 86, 87].map(LP.noteToScene).every(equalsN(5))
  ;[96, 97, 98, 99, 100, 101, 102, 103].map(LP.noteToScene).every(equalsN(6))
  ;[112, 113, 114, 115, 116, 117, 118, 11].map(LP.noteToScene).every(equalsN(7))
})

test('.sceneToNote', () => {
  assert.deepEqual(zeroUpTo8.map(LP.sceneToNote), sceneNumbers)
})

test('.noteToGrid', () => {
  assert.deepEqual(gridNumbers.map(LP.noteToGrid), zeroUpTo64)
})

test('.onMessage', () => {
  let x = 0

  const input = {
    addEventListener(event, fn) {
      this.fn = fn
    }
  }

  const lp = new LP(input)

  lp.onMessage((...args) => {
    x = args
  })

  input.fn({ data: [1, 2, 3] })
  assert.deepEqual(x, [1, 2, 3])
})

test('.on*', () => {
  const last = new Map()

  const input = {
    addEventListener(event, fn) {
      this.fn = fn
    }
  }

  const output = {
    send(message) {
      this.lastMessage = message
    }
  }

  const lp = new LP(input, output)

  lp.onPage((note, value) => {
    last.set('page', [note, value])
  })
  lp.onScene((note, value) => {
    last.set('scene', [note, value])
  })
  lp.onGrid((note, value) => {
    last.set('grid', [note, value])
  })

  pageNumbers.forEach((x, i) => {
    input.fn({ data: [176, x, 1] })
    assert.deepEqual(last.get('page'), [zeroUpTo8[i], 1])
  })

  sceneNumbers.forEach((x, i) => {
    input.fn({ data: [144, x, 1] })
    assert.deepEqual(last.get('scene'), [zeroUpTo8[i], 1])
  })

  gridNumbers.forEach((x, i) => {
    input.fn({ data: [144, x, 1] })
    assert.deepEqual(last.get('grid'), [zeroUpTo64[i], 1])
  })
})

test('.on* (ignore0Velocity)', () => {
  const last = new Map()

  const input = {
    addEventListener(event, fn) {
      this.fn = fn
    }
  }

  const output = {
    send(message) {
      this.lastMessage = message
    }
  }

  const lp = new LP(input, output)

  lp.onPage((note, value) => {
    last.set('page', [note, value])
  })
  lp.onScene((note, value) => {
    last.set('scene', [note, value])
  })
  lp.onGrid((note, value) => {
    last.set('grid', [note, value])
  })

  pageNumbers.forEach((x, i) => {
    input.fn({ data: [176, x, 0] })
  })

  sceneNumbers.forEach((x, i) => {
    input.fn({ data: [144, x, 0] })
  })

  gridNumbers.forEach((x, i) => {
    input.fn({ data: [144, x, 0] })
  })

  assert.equal(last.size, 0)
})
