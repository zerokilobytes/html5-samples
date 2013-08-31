/**
 * 
 * @returns {GraphManager}
 */
var GraphManager = function() {
    this.canvas = null;
    this.stage = null;
    this.graph = null;

    this.init();
};

/**
 * 
 * @type GraphManager
 */
GraphManager.prototype = {
    init: function() {
        this.stage = new Kinetic.Stage({
            container: 'graphx_canvas',
            width: 1000,
            height: 800
        });

        this.graph = new Graph();
        //this.graphLayer = new Kinetic.Layer();

        this.stage.add(this.graph.layer);
    },
    getCanvas2D: function() {
        var canvas = document.getElementById('graphx_canvas');
        var context = canvas.getContext('2d');
        return context;
    },
    getStage: function() {
        return this.stage;
    },
    getGraph: function() {
        return this.graph;
    },
    draw : function(){
        this.graph.draw();
    },
    update : function(){
        this.graph.update();
    }
};