/**
 * 
 * @returns {GraphManager}
 */
var GraphManager = function() {
    this.canvas = null;
    this.stage = null;
    this.graph = null;
    this.nodeList = [];
    this.nodeTypeList = new Map();
    this.linkList = [];
    this.linkTypeList = new Map();
    this.visibilityExplorationDepth = 0;
    settings = null;
    this.timer;

    this.init();
};

/**
 * 
 * @type GraphManager
 */
GraphManager.prototype = {
    init: function() {

        this.nodeList = [];
        this.linkList = [];
        this.nodeTypeList = new Map();
        this.timer = null;

        this.stage = new Kinetic.Stage({
            container: 'graphx_canvas',
            width: 1000,
            height: 800
        });

        this.graph = new Graph();
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
    draw: function() {
        this.graph.draw();
    },
    update: function() {
        this.graph.update();
    },
    createNode: function(title, type, style, url) {
        var node = new Node();

        node.styleName = style;
        node.typeName = type;
        node.Title = title;
        node.url = url;
        return node;
    },
    createEdge: function(text, nodeFrom, nodeTo, style, strength) {
        var link = new Link(id, nodeFrom, nodeTo);
        this.linkList.push(link);

        link.strength = strength;
        link.styleName = style;
        link.verb = text;
        return link;
    },
    increaseDepth: function() {
        this.visibilityExplorationDepth++;
    },
    decreaseDepth: function() {
        this.visibilityExplorationDepth--;

        if (this.visibilityExplorationDepth < 0) {
            this.visibilityExplorationDepth = 0;
        }
    },
    start: function() {
        //start interval here
    },
    pause: function() {
        this.timer.Stop();
    },
    resume: function() {
        this.timer.Start();
    },
    disposeObject: function(id) {
        //dispose all objects
    },
    nodeSelectionChanged: function() {

    },
    settingsChanged: function() {
        this.visibilityExplorationDepth = this.settings.InitialGraphVisibilityDepth;
    },
    updateGraph: function() {
        this.setVisibility();
        this.cleanUp();
        this.updateModelInformation();
    },
    cleanUp: function() {
        // TODO:
    },
    updateModelInformation: function() {
        // TODO:
    },
    setVisibility: function() {
        // TODO:
    },
    explore: function(depth, useFilter) {
        // TODO:
    },
    getNodeType: function(typeName) {
        // TODO:
    },
    getLinkType: function(link) {
        // TODO:
    }
};