var Node = function(property) {
    this.x = property.x;
    this.y = property.y;
    this.content = null;

    this.init();
};

Node.prototype = {
    init: function() {
        this.content = new Kinetic.Circle({
            x: this.x,
            y: this.y,
            radius: 50,
            fill: 'red',
            stroke: 'gray',
            strokeWidth: 1
        });
    }
};