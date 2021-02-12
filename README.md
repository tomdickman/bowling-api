# Bowling API

A set of Javascript APIs for scoring a bowling game.

# Requirements

The modules contained with this are ECMAScript 6 modules and as such, requires node ^14.0.0 and npm ^6.0.0

# Classes

## Game

Manage the scoring for a complete bowling game.
Automatically tracks frames and records each roll and any spare or strike rolls into previous frames.
(__Note:__ there is currently no methods for editing frame rolls, so if you make a mistake...)

Example:

```js
const game = new Game('Tom Dickman');
game.roll(4).roll(4);
console.log(game.score()) // 8
game.roll(10);
game.roll(7);
console.log(game.score()) // 32
```

### Constructor
---
`new Game(String: playerName)`

__Parameters__
- `playerName`: the name of the player this bowling game is for.

### Methods
---
`Game.roll(Number: noOfPins) : Game` - Record the number of pins knocked over by a roll in the game.

__Parameters__
- `noOfPins`: an integer Number between 0 and 10 (inclusive).

__Returns__
- `Game`: the Game itself for method chaining.
---
`Game.score() : Number` - Get the current total Game score.

__Returns__
- `Number`: The total of all recorded Frame scores within the Game.
---
---
## Frame

Manage an individual frame within a bowling game.

### Constructor
---
`new Frame(Number: number)`

__Parameters__
- `number`: an integer Number between 1 and 10 (inclusive).

### Methods
---
`Frame.roll(Number: noOfPins) : Frame` - Record the number of pins knocked over by a roll in the frame.

__Parameters__
- `noOfPins`: an integer Number between 0 and 10 (inclusive).

__Returns__
- `Frame`: the Frame itself for method chaining.
---
`Frame.rollScore() : Number` - Calculate the total score of all rolls made in this frame (excluding spare and strike rolls made in subsequent frames).

__Returns__
- `Number`: integer total between 0 and 10.
---
`Frame.spareRoll(Number: noOfPins) : Frame` - Record the number of pins knocked over in a spare roll for Frame.

__Parameters__
- `noOfPins`: an integer Number between 0 and 10 (inclusive).

__Returns__
- `Frame`: the Frame itself for method chaining.
---
`Frame.strikeRoll(Number: noOfPins) : Frame` - Record the number of pins knocked over in a strike roll for Frame.

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
