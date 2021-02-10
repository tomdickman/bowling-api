'use strict';

import Frame from '../../Frame.js';
import { assert } from 'chai';

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
            assert.throws(() => { frame.roll(2) }, 'Cannot add a new roll, two rolls already recorded.');
        });

        it('should only be able to add a roll if resulting total will not be greater than 11.', () => {
            const frame = new Frame(1).roll(5);
            assert.throws(() => { frame.roll(6) }, 'Total for all rolls cannot exceed 10.');
        })

        it('should not be able to add a second roll if the first roll was a strike (10 pins).', () => {
            const frame = new Frame(1).roll(10);
            assert.throws(() => { frame.roll(0) }, 'Cannot add a new roll, all pins have been scored already.')
        })
    });

    describe('rollScore', () => {
        it('should correctly add the value of all rolls made in the frame (excluding spare and strike rolls.)', () => {
            assert.equal(8, new Frame(1).roll(4).roll(4).rollScore());
            assert.equal(10, new Frame(2).roll(10).rollScore());
            assert.equal(0, new Frame(3).roll(0).roll(0).rollScore());
            assert.equal(0, new Frame(4).rollScore())
        })
    })
});