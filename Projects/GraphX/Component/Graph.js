var Graph = function() {
    this.layer = null;
    this.nodes = [];
    this.init();
};

Graph.prototype = {
    init: function() {
        this.layer = new Kinetic.Layer();
    },
    addNode: function(node) {
        this.nodes.push(node);
        this.layer.add(node.content);
    },
    getLayer: function() {
        return this.layer;
    },
    draw: function() {
        this.layer.draw();
    }
};