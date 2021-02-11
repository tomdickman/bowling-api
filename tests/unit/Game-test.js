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
            // Frame #1.
            assert.equal(game.score(), 0);
            game.roll(4);
            assert.equal(game.score(), 4);
            game.roll(4);
            assert.equal(game.score(), 8);
            // Frame #2.
            game.roll(10);
            assert.equal(game.score(), 18);
            // Frame #3.
            game.roll(10);
            assert.equal(game.score(), 38);
            // Frame #4.
            game.roll(10);
            assert.equal(game.score(), 68);
            // Frame #5.
            game.roll(3);
            assert.equal(game.score(), 77);
            game.roll(7);
            assert.equal(game.score(), 91);
            // Frame #6.
            game.roll(6);
            assert.equal(game.score(), 103);
            game.roll(3);
            assert.equal(game.score(), 106);
            // Frame #7.
            game.roll(10);
            assert.equal(game.score(), 116);
            // Frame #8.
            game.roll(1);
            assert.equal(game.score(), 118);
            game.roll(1);
            assert.equal(game.score(), 120);
            // Frame #9.
            game.roll(10);
            assert.equal(game.score(), 130);
            // Frame #10.
            game.roll(10);
            assert.equal(game.score(), 150);
            game.roll(10);
            assert.equal(game.score(), 170);
            game.roll(10);
            assert.equal(game.score(), 180);
        });
    });

    describe('isPrevFrameSpareRollRequired', () => {
        it('should determine previous frame requires spare roll if it was a spare', () => {
            const game = new Game('unit test').roll(2).roll(8);
            const currentFrame = game.frames[game.currentFrameNumber];
            const prevFrame = game.frames[game.currentFrameNumber - 1];
            assert.isTrue(game.isPrevFrameSpareRollRequired(currentFrame, prevFrame));
        });

        it('should determine previous frame does not require spare roll if it was not a spare', () => {
            const game = new Game('unit test').roll(10);
            const currentFrame = game.frames[game.currentFrameNumber];
            const prevFrame = game.frames[game.currentFrameNumber - 1];
            assert.isFalse(game.isPrevFrameSpareRollRequired(currentFrame, prevFrame));
        });
    });

    describe('isPrevFrameStrikeRollRequired', () => {
        it('should determine previous frame requires strike roll if it was a strike', () => {
            const game = new Game('unit test').roll(10);
            const prevFrame = game.frames[game.currentFrameNumber - 1];
            assert.isTrue(game.isPrevFrameStrikeRollRequired(prevFrame));
        });

        it('should determine previous frame does not require strike roll if it was not a strike', () => {
            const game = new Game('unit test').roll(8).roll(2);
            const currentFrame = game.frames[game.currentFrameNumber];
            const prevFrame = game.frames[game.currentFrameNumber - 1];
            assert.isFalse(game.isPrevFrameStrikeRollRequired(currentFrame, prevFrame));
        });
    });

    describe('isFrameBeforeLastStrikeRollRequired', () => {
        it('should determine frame before last requires strike roll if it was a strike and previous frame was a strike', () => {
            const game = new Game('unit test').roll(10).roll(10);
            const prevFrame = game.frames[game.currentFrameNumber - 1];
            const frameBeforeLast = game.frames[game.currentFrameNumber - 2];
            assert.isTrue(game.isFrameBeforeLastStrikeRollRequired(prevFrame, frameBeforeLast));
        });

        it('should determine frame before last does not require strike roll if it was not a strike', () => {
            const game = new Game('unit test').roll(8).roll(2).roll(10);
            const prevFrame = game.frames[game.currentFrameNumber - 1];
            const frameBeforeLast = game.frames[game.currentFrameNumber - 2];
            assert.isFalse(game.isFrameBeforeLastStrikeRollRequired(prevFrame, frameBeforeLast));
        });

        it('should determine frame before last does not require strike roll if previous frame was not a strike', () => {
            const game = new Game('unit test').roll(10).roll(3).roll(7);
            const prevFrame = game.frames[game.currentFrameNumber - 1];
            const frameBeforeLast = game.frames[game.currentFrameNumber - 2];
            assert.isFalse(game.isFrameBeforeLastStrikeRollRequired(prevFrame, frameBeforeLast));
        });
    });
});
