import validNoOfPins from './utilities/helper.js';

/**
 * Frame class for scoring an individual frame of a bowling game.
 */
export default class Frame {
    /**
     * @var {Number[]} rolls the rolls made in this frame.
     */
    rolls = [];

    /**
     * @var {Number[]} spareOrStrikeRolls rolls made in subsequent frames for
     * spares or strikes which apply to this frame.
     */
    spareOrStrikeRolls = [];

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
     * Was a spare scored in this frame?
     *
     * @returns {Boolean} true if spare was scored, false otherwise.
     */
    isSpare() {
        return (this.rolls.length === 2 && this.rollScore() === 10);
    }

    /**
     * Was a strike scored in this frame?
     *
     * @returns {Boolean} true if strike was scored, false otherwise.
     */
    isStrike() {
        return (this.rolls.length === 1 && this.rollScore() === 10);
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

    /**
     * Get the total score for the frame, including spare/strike rolls.
     *
     * @returns {number} integer total score for this frame.
     */
    score() {
        return this.rollScore() + this.spareOrStrikeRollscore();
    }

    /**
     * Get the total score for all frame spare or strike rolls.
     *
     * @returns {number} integer total of all spare rolls.
     */
    spareOrStrikeRollscore() {
        return this.spareOrStrikeRolls.reduce((a, b) => a + b, 0);
    }

    /**
     * Record the value of a spare roll for this frame.
     *
     * @param {number} noOfPins the number of pins knocked over by a roll.
     *
     * @returns {Frame} this.
     * @throws {Error} if roll was invalid.
     */
    spareRoll(noOfPins) {
        if (!validNoOfPins(noOfPins)) {
            throw new Error("Invalid 'noOfPins' value, must be an integer between 0 and 10");
        }

        if (!this.isSpare()) {
            throw new Error('Cannot add a spare roll, frame was not a spare.');
        }

        if (this.spareOrStrikeRolls.length === 1) {
            throw new Error('Cannot add a spare roll, frame already has spare roll recorded.');
        }

        this.spareOrStrikeRolls.push(noOfPins);

        return this;
    }

    /**
     * Record the value of a strike roll for this frame.
     *
     * @param {number} noOfPins the number of pins knocked over by a roll.
     *
     * @returns {Frame} this.
     * @throws {Error} if roll was invalid.
     */
    strikeRoll(noOfPins) {
        if (!validNoOfPins(noOfPins)) {
            throw new Error("Invalid 'noOfPins' value, must be an integer between 0 and 10");
        }

        if (!this.isStrike()) {
            throw new Error('Cannot add a strike roll, frame was not a strike.');
        }

        if (this.spareOrStrikeRolls.length === 2) {
            throw new Error('Cannot record more than two strike rolls per frame.');
        }

        this.spareOrStrikeRolls.push(noOfPins);

        return this;
    }
}
