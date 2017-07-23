const { isControlChange } = require(`@lokua/midi-util`)

module.exports = {
  isMetaRowPress,
  isMetaColPress,
  isGridPress,
  noteToGridNumber,
  gridNumberToNote
}

function isMetaRowPress(status) {
  return isControlChange(status)
}

function isMetaColPress(note) {
  return note % 8 === 0 && (note / 8) % 2 === 1
}

function isGridPress(status, note) {
  return !(isMetaRowPress(status) || isMetaColPress(note))
}

function noteToGridNumber(n) {
  const [row, col] = [Math.floor(n / 16), n % 8]
  return 8 * row + col
}

function gridNumberToNote(n) {
  const [row, col] = [Math.floor(n / 8), n % 8]
  return 16 * row + col
}
