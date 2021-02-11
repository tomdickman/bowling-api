'use strict';

import { assert } from 'chai';
import validNoOfPins from '../../utilities/helper.js';

describe('helper', () => {
    describe('validNoOfPins', () => {
        it('should not validate if the number of pins is not an integer', () => {
            assert.isFalse(validNoOfPins(1.25));
            assert.isFalse(validNoOfPins('1'));
            assert.isFalse(validNoOfPins(true));
        });

        it('should not validate if the number of pins is not between 0 and 10 (inclusive)', () => {
            assert.isFalse(validNoOfPins(-1));
            assert.isFalse(validNoOfPins(11));
        });

        it('should not validate if the number of pins is an integer between 0 and 10 (inclusive).', () => {
            assert.isTrue(validNoOfPins(0));
            assert.isTrue(validNoOfPins(5));
            assert.isTrue(validNoOfPins(10));
        });
    });
});
