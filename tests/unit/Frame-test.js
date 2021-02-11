'use strict';

import { assert } from 'chai';
import Frame from '../../Frame.js';

describe('Frame', () => {
    describe('constructor', () => {
        it('should allocate a frame number between 1 and 10', () => {
            assert.throws(() => new Frame(), "Missing required parameter 'number'.");
            assert.throws(() => new Frame(0), 'Invalid frame number, must be an integer between 1 and 10.');
            assert.throws(() => new Frame(1.25), 'Invalid frame number, must be an integer between 1 and 10.');
            assert.throws(() => new Frame(11), 'Invalid frame number, must be an integer between 1 and 10.');
            assert.throws(() => new Frame('1'), 'Invalid frame number, must be an integer between 1 and 10.');
            let frame = new Frame(1);
            assert.equal(frame.number, 1);
            frame = new Frame(10);
            assert.equal(frame.number, 10);
        });
    });

    describe('roll', () => {
        it('should not accept a roll value which is not an integer between 0 and 10 (inclusive).', () => {
            const frame = new Frame(1);
            assert.throws(() => frame.roll(), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.roll(-1), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.roll(11), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.roll('1'), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.roll(1.25), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
        });

        it('should be able to record a score between 0 and 10 for each roll.', () => {
            const frame = new Frame(1).roll(9);
            assert.equal(1, frame.rolls.length);
            assert.equal(9, frame.rolls[0]);
            frame.roll(1);
            assert.equal(2, frame.rolls.length);
            assert.equal(1, frame.rolls[1]);
        });

        it('should only be able to record two rolls maximum.', () => {
            const frame = new Frame(1).roll(4).roll(4);
            assert.throws(() => frame.roll(2), 'Cannot add a new roll, two rolls already recorded.');
        });

        it('should only be able to add a roll if resulting total will not be greater than 11.', () => {
            const frame = new Frame(1).roll(5);
            assert.throws(() => frame.roll(6), 'Total for all rolls cannot exceed 10.');
        });

        it('should not be able to add a second roll if the first roll was a strike (10 pins).', () => {
            const frame = new Frame(1).roll(10);
            assert.throws(() => frame.roll(0), 'Cannot add a new roll, all pins have been scored already.');
        });
    });

    describe('rollScore', () => {
        it('should correctly add the value of all rolls made in the frame (excluding spare and strike rolls.)', () => {
            assert.equal(8, new Frame(1).roll(4).roll(4).rollScore());
            assert.equal(10, new Frame(2).roll(10).rollScore());
            assert.equal(0, new Frame(3).roll(0).roll(0).rollScore());
            assert.equal(0, new Frame(4).rollScore());
        });
    });

    describe('isSpare', () => {
        it('should be a spare if the total across both rolls was 10.', () => {
            const frame = new Frame(1);
            frame.roll(0).roll(10);
            assert.isTrue(frame.isSpare());

            const frame2 = new Frame(2);
            frame2.roll(3).roll(7);
            assert.isTrue(frame2.isSpare());
        });

        it('should not be a spare if the total across both rolls was not 10.', () => {
            const frame = new Frame(1);
            frame.roll(4).roll(4);
            assert.isFalse(frame.isSpare());
        });

        it('should not be a spare if only one roll has been made.', () => {
            const frame = new Frame(1);
            frame.roll(10);
            assert.isFalse(frame.isSpare());
        });
    });

    describe('isStrike', () => {
        it('should be a strike if the first roll was a 10.', () => {
            const frame = new Frame(1);
            frame.roll(10);
            assert.isTrue(frame.isStrike());
        });

        it('should not be a strike if the first roll was a not a 10.', () => {
            const frame = new Frame(1);
            frame.roll(6).roll(4);
            assert.isFalse(frame.isStrike());

            const frame2 = new Frame(2);
            frame2.roll(0).roll(10);
            assert.isFalse(frame2.isStrike());
        });
    });

    describe('spareRoll', () => {
        it('should not accept a roll value which is not an integer between 0 and 10 (inclusive).', () => {
            const frame = new Frame(1);
            frame.roll(10);
            assert.throws(() => frame.spareRoll(), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.spareRoll(-1), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.spareRoll(11), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.spareRoll('1'), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.spareRoll(1.25), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
        });

        it('should not be able to add a spare roll if a spare was not scored in frame.', () => {
            const frame = new Frame(1).roll(4).roll(4);
            assert.throws(() => frame.spareRoll(4), 'Cannot add a spare roll, frame was not a spare.');
        });

        it('should be able to record a spare roll if the frame was a spare', () => {
            const frame = new Frame(1).roll(4).roll(6).spareRoll(4);
            assert.isTrue(frame.isSpare());
            assert.equal(4, frame.spareOrStrikeRollscore());
        });

        it('should not be able to add a spare roll if spare roll has already been recorded', () => {
            const frame = new Frame(1).roll(4).roll(6).spareRoll(4);
            assert.throws(() => frame.spareRoll(4), 'Cannot add a spare roll, frame already has spare roll recorded.');
        });
    });

    describe('strikeRoll', () => {
        it('should not accept a roll value which is not an integer between 0 and 10 (inclusive).', () => {
            const frame = new Frame(1).roll(10);
            assert.throws(() => frame.strikeRoll(), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.strikeRoll(-1), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.strikeRoll(11), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.strikeRoll('1'), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
            assert.throws(() => frame.strikeRoll(1.25), "Invalid 'noOfPins' value, must be an integer between 0 and 10");
        });

        it('should not be able to add a strike roll if a strike was not scored in frame.', () => {
            const frame = new Frame(1).roll(0).roll(10);
            assert.throws(() => frame.strikeRoll(4), 'Cannot add a strike roll, frame was not a strike.');
        });

        it('should be able to record up to two strike rolls if the frame was a strike', () => {
            const frame = new Frame(1).roll(10).strikeRoll(10).strikeRoll(6);
            assert.isTrue(frame.isStrike());
            assert.equal(16, frame.spareOrStrikeRollscore());
        });

        it('should not be able to record any more than two strike rolls', () => {
            const frame = new Frame(1).roll(10).strikeRoll(4).strikeRoll(6);
            assert.throws(() => frame.strikeRoll(0), 'Cannot record more than two strike rolls per frame.');
        });
    });
});
