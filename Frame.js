/**
 * Frame class for scoring an individual frame of a bowling game.
 */
export default class Frame {
    /**
     * @var {Number[]} rolls the rolls made in this frame.
     */
    rolls = [];

    /**
     * Frame constructor.
     *
     * @param {Number} number the bowling frame number.
     *
     * @throws {Error} if missing required param or frame number was invalid.
     */
    constructor(number) {
        if (number === undefined) {
            throw new Error("Missing required parameter 'number'.");
        }

        if (!Number.isInteger(number) || number < 1 || number > 10) {
            throw new Error('Invalid frame number, must be an integer between 1 and 10.');
        }

        this.number = number;
    }

    /**
     * Record the number of pins knocked over by a roll in the frame.
     *
     * @param {Number} noOfPins the number of pins knocked over by a roll.
     *
     * @returns {Frame} this.
     * @throws {Error} if roll was invalid.
     */
    roll(noOfPins) {
        if (!Number.isInteger(noOfPins) || noOfPins < 0 || noOfPins > 10) {
            throw new Error("Invalid 'noOfPins' value, must be an integer between 0 and 10");
        }

        if (this.rollScore() === 10) {
            throw new Error('Cannot add a new roll, all pins have been scored already.');
        }

        if ((this.rollScore() + noOfPins) > 10) {
            throw new Error('Total for all rolls cannot exceed 10.');
        }

        if (this.rolls.length === 2) {
            throw new Error('Cannot add a new roll, two rolls already recorded.');
        }

        this.rolls.push(noOfPins);

        return this;
    }

    /**
     * Get the total score for all frame rolls.
     * (Excludes spare rolls made in other frames)
     *
     * @returns {Number} integer total of all rolls.
     */
    rollScore() {
        return this.rolls.reduce((a, b) => a + b, 0);
    }
}
