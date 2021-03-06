# launchpad

Node.js program to control a Novation Launchpad MIDI controller.
Attach handlers to react when buttons are pressed and set their colors
according to your program's logic.

See [./example.js](example.js) for a basic usage example.

## Install

`launchpad` has been developed on node@8.1.4 and npm@5.3.0, though should work with any node
installation that supports arrow functions, const, let, object property shorthand, destructuring.

```sh
npm i @lokua/launchpad --save
# or
yarn add @lokua/launchpad --save
```

## API

##### [`Launchpad(portName, options)`](#)

Class constructor.

###### Params:

+ **`portName`:**
An exact string or regexp. Defaults to `/^Launchpad/`

+ **`options`:**
  + `ignore0Velocity = true`:
  Causes all registered handlers to ignore when a button is released.
  This is useful if you are using your Launchpad as a sequencer rather than a
  push & hold style instrument. For more fine grained control you can set this false and check the
  `value` parameter in any of the `on*` methods.
  + `normalize = true`
  The Launchpad by default has some pretty odd numbering. For example, the first grid row
  runs from [0, 7] (as expected), but the second row runs from [16, 23]. This is not at
  all intuitive when it comes to mapping buttons to parameters in software etc, where one would
  expect the 64th button to be 63. Likewise, the top meta row sends CCs from [104, 111].
  With `normalize = true`, the top meta row/column sends a normalized [0, 7] range, and the grid
  runs from [0, 63].

##### [`Launchpad.colors: object`](#)

+ `off`
+ `redLow`
+ `red`
+ `amberLow`
+ `amber`
+ `yellow`
+ `greenLow`
+ `green`

##### [`#onPage(fn)`](#onPage)

Fired when a button in the top "special" row (buttons labeled 1-8) is pressed.
`fn` is called with `(note, value)`.

##### [`#onScene(fn)`](#onScene)

Fired when a button in the right-most column (labelled A-H) is pressed.
`fn` is called with `(note, value)`.

##### [`#onGrid(fn)`](#onGrid)

Fired when a button in the grid is pressed. `fn` is called with `(note, value)`.

##### [`#closePorts()`](#closePorts)

Close the internal ports used to communicate with Launchpad. This only
needs to be called if you wish to kill connections while your program is still running,
otherwise the library will handle that automatically on process termination.

##### [`#allOff()`](#allOff)

Turn all buttons on the Launchpad off

##### [`#setPage(number, color)`](#setPage)

Set the color of a button in the top row

##### [`#setScene(number, color)`](#setScene)

Set the color of a button in the right column

##### [`#setGrid(number, color)`](#setGrid)

Set the color of a button in the grid

## License
MIT
