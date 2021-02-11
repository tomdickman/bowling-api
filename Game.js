import Frame from './Frame.js';
import validNoOfPins from './utilities/helper.js';

/**
 * Game class for scoring a bowling game.
 */
export default class Game {
    /**
     * @var {Object} frames object containing frames, where keys are frame numbers and
     * value is a Frame instance.
     */
    frames = {};

    /**
     * @var {Number} currentFrameNumber integer value of the current Frame (maximum 10).
     */
    currentFrameNumber = 0;

    /**
     * Game constructor.
     *
     * @param {String} playerName the name of the player.
     */
    constructor(playerName) {
        this.playerName = playerName;
        this.frames[1] = new Frame(1);
        this.currentFrameNumber = 1;
    }

    /**
     * Record the number of pins knocked over by a roll in this game.
     *
     * @param {number} noOfPins integer number of pins knocked over by roll.
     */
    roll(noOfPins) {
        if (!validNoOfPins(noOfPins)) {
            throw new Error("Invalid 'noOfPins' value, must be an integer between 0 and 10");
        }

        const currentFrame = this.frames[this.currentFrameNumber];
        const prevFrame = this.frames[this.currentFrameNumber - 1] ?? null;
        const frameBeforeLast = this.frames[this.currentFrameNumber - 2] ?? null;

        if (this.isPrevFrameSpareRollRequired(currentFrame, prevFrame)) {
            prevFrame.spareRoll(noOfPins);
        }

        if (this.isPrevFrameStrikeRollRequired(prevFrame)) {
            prevFrame.strikeRoll(noOfPins);
        }

        if (this.isFrameBeforeLastStrikeRollRequired(prevFrame, frameBeforeLast)) {
            frameBeforeLast.strikeRoll(noOfPins);
        }

        if (this.currentFrameNumber === 10
            && currentFrame.isSpare()
            && currentFrame.spareOrStrikeRolls.length === 0
        ) {
            currentFrame.spareRoll(noOfPins);
        }

        if (this.currentFrameNumber === 10
            && currentFrame.isStrike()
            && currentFrame.spareOrStrikeRolls.length < 2
        ) {
            currentFrame.strikeRoll(noOfPins);
        }

        if (currentFrame.rolls.length < 2 && currentFrame.rollScore() < 10) {
            currentFrame.roll(noOfPins);
        }

        if ((currentFrame.rolls.length === 2 || currentFrame.isStrike())
            && this.currentFrameNumber !== 10
        ) {
            this.currentFrameNumber += 1;
            this.frames[this.currentFrameNumber] = new Frame(this.currentFrameNumber);
        }

        return this;
    }

    /**
     * Calculate the current total score for the game.
     *
     * @returns {number} integer score for game.
     */
    score() {
        return Object.values(this.frames).reduce((accum, current) => accum + current.score(), 0);
    }

    /**
     * Check if a previous frame requires spare roll.
     *
     * @param {Frame} currentFrame
     * @param {Frame} prevFrame
     */
    isPrevFrameSpareRollRequired(currentFrame, prevFrame) {
        return (
            prevFrame !== null
            && currentFrame.rolls.length === 0
            && prevFrame.isSpare()
            && prevFrame.spareOrStrikeRolls.length === 0
        );
    }

    /**
     * Check if previous frame requires a strike roll.
     *
     * @param {Frame|null} prevFrame the previous frame or null if no previous frame.
     */
    isPrevFrameStrikeRollRequired(prevFrame) {
        return (
            prevFrame !== null
            && prevFrame.isStrike()
            && prevFrame.spareOrStrikeRolls.length < 2
        );
    }

    /**
     * Check if the frame before previous frame requires a strike roll.
     *
     * @param {Frame|null} prevFrame the previous frame or null if no previous frame.
     * @param {Frame|null} frameBeforeLast the frame before last frame, or null if no such frame.
     */
    isFrameBeforeLastStrikeRollRequired(prevFrame, frameBeforeLast) {
        return (
            frameBeforeLast !== null
            && this.isPrevFrameStrikeRollRequired(prevFrame)
            && frameBeforeLast.isStrike()
            && frameBeforeLast.spareOrStrikeRolls.length === 1
        );
    }
}
