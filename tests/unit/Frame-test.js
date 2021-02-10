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
});