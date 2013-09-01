
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
    init: function()
    {
        // creating the model
        this.graphManager = new GraphManager();
        // creating the view from model and style
        this.initializeViewManager();

        this.canvasManager = new CanvasManager();

        // creating the random engine
        //this.random = new Random(new Date());

        // creating the physic system
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
        var x, y, z = 0;
        // set the physic representation of our link
        this.physicsManager.addPhysicRepresentation(x, y, z, node, this.graphManager);

        // set view to node
        //this.viewManager.setViewToNode(node);

        return node;
    },
    createEdge: function()
    {
        var link = null;

        // link creation
        link = this.modelManager.createEdge(text, nodeFrom, nodeTo);

        // create the link in the physics engine
        this.physicsManager.addPhysicRepresentation(link);

        // create link in the graph
        //this.viewManager.setViewToLink(link);

        return link;
    },
    initializeViewManager: function() {

    },
    
    draw: function() {
        this.graphManager.draw();
    },
    update: function() {
        this.graphManager.update();
    },
};