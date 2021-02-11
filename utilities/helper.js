// Module containing helper functions for bowling API.

/**
 * Validate that a number of pins is valid.
 *
 * @param {number} noOfPins the number of pins to validate.
 */
function validNoOfPins(noOfPins) {
    return (Number.isInteger(noOfPins) && noOfPins >= 0 && noOfPins <= 10);
}

export default validNoOfPins;
