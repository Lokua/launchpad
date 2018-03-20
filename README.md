# launchpad

Control a Novation Launchpad MIDI controller from Node.js or a Browser.
Attach handlers to react when buttons are pressed and set their colors
according to your program's logic.

## Install

```sh
npm i @lokua/launchpad --save
# or
yarn add @lokua/launchpad --save
```

## Usage

Launchpad is designed to work in the Browser via the
[Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess), or in
Node.js though the [midi](https://github.com/justinlatimer/node-midi) package.
In either case you must instantiate an input port and output port that
references your physical launchpad device. See the respective node/web-midi api
docs or check the [examples](/examples) folder for examples of how to
establish these ports in both environments.

## API

##### [`Launchpad(input, output, options)`](#launchpad)

Class constructor.

###### Params:

* **`input`:**
  an instance of NodeMidiInput when in Node.js or MidiInputPort in a browser

* **`output`:**
  an instance of NodeMidiOutput when in Node.js or MidiOutputPort in a browser

* **`options`:**
  * `ignore0Velocity = true`:
    Causes all registered handlers to ignore when a button is released.
    This is useful if you are using your Launchpad as a sequencer or rather than a
    push & hold style instrument. For more fine grained control you can set this false and check the
    `value` parameter in any of the `on*` methods.
  * `normalize = true`
    The Launchpad by default has some pretty odd numbering. For example, the first grid row
    runs from [0, 7] (as expected), but the second row runs from [16, 23]. This is not at
    all intuitive when it comes to mapping buttons to parameters in software etc, where one would
    expect the 64th button to be 63. Likewise, the top meta row sends CCs from [104, 111].
    With `normalize = true`, the top meta row/column sends a normalized [0, 7] range, and the grid
    runs from [0, 63].

##### [`Launchpad.colors: object`](#)

* `off`
* `redLow`
* `red`
* `amberLow`
* `amber`
* `yellow`
* `greenLow`
* `green`

##### [`#onPage(callback)`](#on-page)

Fired when a button in the top "special" row (buttons labeled 1-8) is pressed.
`callback` is called with `(note, value)`.

##### [`#onScene(callback)`](#on-scene)

Fired when a button in the right-most column (labelled A-H) is pressed.
`callback` is called with `(note, value)`.

##### [`#onGrid(callback)`](#on-grid)

Fired when a button in the grid is pressed. `callback` is called with `(note, value)`.

#### [`#onMessage(callback)`](#on-message)

Low level handler that is fired with the original, non-normalized midi message on
every launchpad page/scene/grid press. Will also
fire regardless of the `ignore0Velicty` option. `callback` will be called with
`(status, data1, data2)`.

This method is particularly useful when debugging, for example you can
`launchpad.onMessage(console.log)` to see all incoming messages.

##### [`#allOff()`](#all-off)

Turn all buttons on the Launchpad off

##### [`#setPage(number, color)`](#set-page)

Set the color of a button in the top row

##### [`#setScene(number, color)`](#set-scene)

Set the color of a button in the right column

##### [`#setGrid(number, color)`](#set-grid)

Set the color of a button on the grid

##### [`#destroy()`](#destroy)

Clears internal handlers and removes handlers attached to midi inputs/outputs.
Does not destroy or close the inputs/outputs.

## License

MIT
