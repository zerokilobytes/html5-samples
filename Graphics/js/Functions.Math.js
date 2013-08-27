/**
 * Returns a random number between min and max
 * @param {int} min Minium value
 * @param {int} max Maximum value
 * @returns {int}
 */
function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * @param {int} min
 * @param {int} max
 * @returns {int}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}