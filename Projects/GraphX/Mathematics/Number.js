var Number = function() {
};

Number.prototype = {
};

// Returns a random number between 0 (inclusive) and 1 (exclusive)
Number.getRandom = function() {
  return Math.random();
}

// Returns a random number between min and max
Number.getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
}
// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
Number.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}