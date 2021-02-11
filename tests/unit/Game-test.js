'use strict';

import { assert } from 'chai';
import Game from '../../Game.js';

describe('Game', () => {
    describe('roll', () => {
        it('should add a roll to the current frame', () => {
            const game = new Game('unit test').roll(3).roll(5).roll(10).roll(4);
            assert.equal(game.frames[1].rolls[0], 3);
            assert.equal(game.frames[1].rolls[1], 5);
            assert.equal(game.frames[2].rolls[0], 10);
            assert.isUndefined(game.frames[2].rolls[1]);
            assert.equal(game.frames[3].rolls[0], 4);
        });

        it('should increment the current frame if roll was last roll in frame', () => {
            const game = new Game('unit test');
            assert.equal(game.currentFrameNumber, 1);
            game.roll(4).roll(4);
            assert.equal(game.currentFrameNumber, 2);
            game.roll(10);
            assert.equal(game.currentFrameNumber, 3);
            assert.doesNotHaveAllKeys(game.frames, [4, 5, 6, 7, 8, 9, 10]);
        });

        it('should total 300 if a strike was scored for every roll in game', () => {
            const game = new Game('unit test');
            for (let i = 1; i <= 12; i += 1) {
                game.roll(10);
            }
            assert.equal(game.score(), 300);
        });
    });

    describe('score', () => {
        it('should accurately total all frame scores including spares and strikes', () => {
            const game = new Game('unit test');
            assert.equal(game.score(), 0);
            game.roll(4);
            assert.equal(game.score(), 4);
        });
    });
});
