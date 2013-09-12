
var UniverseManager = function() {
    this.settings;
    this.initializationFailed;
    this.random;
    this.javaScriptManager;
    this.keyManager;
    this.physicsManager;
    this.graphManager;
    this.canvasManager;
    this.assemblyManager;
    this.fileDownloadManager;
    
    this.init();
};

UniverseManager.prototype = {
    init: function() {
        this.graphManager = new GraphManager();
        this.initializeViewManager();
        this.canvasManager = new CanvasManager();
        this.physicsManager = new PhysicsManager(this);

        // creating the key manager
        this.keyManager = new KeyManager(this);

        // create and set the default settings
        this.settings = new Settings();

        // start the initialization process
        this.initializationFailed = false;

        // run sub-tasks
        this.graphManager.start();
        this.physicsManager.start();
        this.canvasManager.start();
        
        
    },
    createNode: function(title, type) {
        var node = this.graphManager.createNode(title, type);
        node.guid = NumberFunc.getRandomInt(1, NumberFunc.MAX_VALUE);
        var x = NumberFunc.getRandomArbitrary(1,600);
        var y = NumberFunc.getRandomArbitrary(1,600);
        var z = 0;

        // set the physic representation of our link
        this.physicsManager.addNodePhysicRepresentation(x, y, z, node, this.graphManager);

        // set view to node
        //this.viewManager.setViewToNode(node);

        return node;
    },
    createEdge: function(text, nodeFrom, nodeTo){
        var link = null;

        // link creation
        link = this.graphManager.createEdge(text, nodeFrom, nodeTo);

        // create the link in the physics engine
        this.physicsManager.addEdgePhysicRepresentation(link);

        // create link in the graph
        //this.viewManager.setViewToLink(link);
        console.log(link);
        return link;
    },
    initializeViewManager: function() {

    },
    
    draw: function() {
        this.graphManager.draw();
    },
    update: function(time) {
        this.physicsManager.update(time);
        this.graphManager.update();
    }
};