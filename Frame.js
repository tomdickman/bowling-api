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
}
