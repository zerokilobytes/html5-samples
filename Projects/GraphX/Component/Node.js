var Node = function(property) {
    this.property = property;
    this.content = null;
    this.vx = 0;
    this.vy = 0;

    this.init();
};

Node.prototype = {
    init: function() {
        this.content = new Kinetic.Circle({
            x: this.property.x,
            y: this.property.y,
            radius: 30,
            fill: 'red',
            stroke: 'gray',
            strokeWidth: 1,
            draggable: true
        });

        this.content.vx = 0;
        this.content.vy = 0;
    },
    getX: function() {
        return this.content.getPosition().x;
    },
    getY: function() {
        return this.content.getPosition().y;
    },
    setX: function(x) {
        this.content.setX(x);
    },
    setY: function(y) {
        this.content.setY(y);
    },
    getVX: function() {
        return this.vx;
    },
    getVY: function() {
        return this.vy;
    },
    setVX: function(vx) {
        this.vx = vx;
        return this;
    },
    setVY: function(vy) {
        this.vy = vy;
        return this;
    },
    setPosition: function(x, y) {
        this.content.setPosition(x, y);
        return this;
    },
    getPosition: function() {
        return this.content.getPosition();
    },
    isDragging: function() {
        return this.content.isDragging();
    },
    getContent: function() {
        return this.content;
    },
    update: function() {
        this.content.setPosition(this.content.getPosition().x, this.content.getPosition().y);
        return this;
    }
};