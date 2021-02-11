# Bowling API

A set of Javascript APIs for scoring a bowling game.

## Frame

Manage an individual frame within a bowling game.

### Constructor
---
`new Frame(number)`

__Parameters__
- `number`: an integer Number between 1 and 10 (inclusive).

### Methods
---
`Frame.roll(noOfPins) : Frame` - Record the number of pins knocked over by a roll in the frame.

__Parameters__
- `noOfPins`: an integer Number between 0 and 10 (inclusive).

__Returns__
- `Frame`: the Frame itself for method chaining.
---
`Frame.rollScore() : Number` - Calculate the total score of all rolls made in this frame (excluding spare and strike rolls made in subsequent frames).

__Returns__
- `Number`: integer total between 0 and 10.
---
`Frame.spareRoll(noOfPins) : Frame` - Record the number of pins knocked over in a spare roll for Frame.

__Parameters__
- `noOfPins`: an integer Number between 0 and 10 (inclusive).

__Returns__
- `Frame`: the Frame itself for method chaining.
---
`Frame.strikeRoll(noOfPins) : Frame` - Record the number of pins knocked over in a strike roll for Frame.

__Parameters__
- `noOfPins`: an integer Number between 0 and 10 (inclusive).

__Returns__
- `Frame`: the Frame itself for method chaining.
---
`Frame.isSpare() : Boolean` - Check if the Frame score constitutes a spare.

__Returns__
- `Boolean`: `true` if the total across the two rolls was 10 (excluding if the Frame was a strike), `false` otherwise.
---
`Frame.isStrike() : Boolean` - Check if the Frame score constitutes a strike.

__Returns__
- `Boolean`: `true` if the first and only roll in the Frame was a 10.
---
`Frame.score() : Number` - Get the current total Frame score.

__Returns__
- `Number`: The total of all recorded Frame rolls and spare or strike rolls.
