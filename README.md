# launchpad

Node.js script to control a Novation Launchpad MIDI controller.
Attach handlers to react when buttons are pressed and set their colors
according to your program's logic.

See [./example.js](example.js) for a basic usage example.

## API

##### [`Launchpad(portName, options)`](#)

Class constructor.

###### Params:

+ **`portName`:**
An exact string or regexp. Defaults to `/^Launchpad/`

+ **`options`:**
  + `ignore0Velocity = false`:
  Causes all registered handlers to ignore when a button is released.
  This is useful if you are using your Launchpad as a sequencer rather than a
  push & hold style instrument. For more fine grained control you can check the
  `value` parameter in any of the `on*` methods.

##### [`Launchpad.colors: object`](#)

+ `off`
+ `redLow`
+ `red`
+ `amberLow`
+ `amber`
+ `yellow`
+ `greenLow`
+ `green`

##### [`#onMetaRowPress(fn)`](#onMetaRowPress)

Fired when a button in the top "special" row (buttons labeled 1-8) is pressed. `fn` is called with `(note, value)`.

##### [`#onMetaColPress(fn)`](#onMetaColPress)

Fired when a button in the right-most column (those labelled A-H) is pressed. `fn` is called with `(note, value)`.

##### [`#onGridPress(fn)`](#onGridPress)

Fired when a button in the grid is pressed. `fn` is called with `(note, value)`.

##### [`#closePorts()`](#closePorts)

Close the internal ports used to communicate with Launchpad. This only
needs to be called if you wish to kill connections while your program is still running, otherwise the library will handle that automatically on process
termination.

##### [`#allOff()`](#allOff)

Turn all buttons on the Launchpad off

##### [`#metaRowSet(note, color)`](#metaRowSet)

Set the color of a button in the top row

##### [`#metaColSet(note, color)`](#metaColSet)

Set the color of a button in the right column

##### [`#gridSet(note, color)`](#gridSet)

Set the color of a button in the grid

## License
MIT
