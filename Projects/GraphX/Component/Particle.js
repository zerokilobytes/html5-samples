var Particle = function(x, y) {
    this.position = new Position(x, y);
    this.vx = 0;
    this.vy = 0;
};

Particle.prototype = {
    getX: function() {
        return this.getPosition().x;
    },
    getY: function() {
        return this.content.getPosition().y;
    },
    setX: function(x) {
        this.position.setX(x);
    },
    setY: function(y) {
        this.position.setY(y);
    },
    getVX: function() {
        return this.vx;
    },
    getVY: function() {
        return this.vy;
    },
    setVX: function(vx) {
        this.vx = vx;
    },
    setVY: function(vy) {
        this.vy = vy;
    },
    isDragging: function() {
        return this.isDragging();
    }
};

