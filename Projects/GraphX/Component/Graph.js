/**
 * 
 * @returns {Graph}
 */
var Graph = function() {
    this.layer = null;
    this.nodes = [];
    this.spring = 0.05;
    this.friction = 0.95;
    this.springLength = 300;

    this.init();
};

/**
 * 
 * @type Graph
 */
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
    },
    move: function() {
        for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes.length; j++) {
                if (this.nodes[i] !== this.nodes[j] && !this.nodes[i].isDragging()) {
                    this.springTo(this.nodes[i], this.nodes[j]);
                }
            }
        }
    },
    update: function() {
        this.move();
    },
    springTo: function(nodeA, nodeB) {
        var dx = nodeB.getX() - nodeA.getX();
        var dy = nodeB.getY() - nodeA.getY();
        var angle = Math.atan2(dy, dx);
        var targetX = nodeB.getX() - Math.cos(angle) * this.springLength;
        var targetY = nodeB.getY() - Math.sin(angle) * this.springLength;
        nodeA.setVX(nodeA.getVX() + ((targetX - nodeA.getX()) * this.spring));
        nodeA.setVY(nodeA.getVY() + ((targetY - nodeA.getY()) * this.spring));
        nodeA.setVX(nodeA.getVX() * this.friction);
        nodeA.setVY(nodeA.getVY() * this.friction);
        nodeA.setX(nodeA.getX() + nodeA.getVX());
        nodeA.setY(nodeA.getY() + nodeA.getVY());
    }
};