
var MainManager = function() {
    this.settings;
    this.initializationFailed;
    this.random;
    this.javaScriptManager;
    this.keyManager;
    this.physicsManager;
    this.modelManager;
    this.viewManager;
    this.assemblyManager;
    this.fileDownloadManager;
};

MainManager.prototype = {
    init: function()
    {
        // creating the model
        this.modelManager = new GraphManager();
        // creating the view from model and style
        this.initializeViewManager();

        // set the Javascript incomming event
        //this.javaScriptManager = new JavaScriptManager(this);

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
        this.modelManager.start();
        this.physicsManager.start();
        this.viewManager.start();
    },
    createNode: function(title, type) {
        var node = this.modelManager.createNode(title, type);
        x, y, z = 0;
        // set the physic representation of our link
        this.physicsManager.addPhysicRepresentation(x, y, z, node, this.modelManager);

        // set view to node
        this.viewManager.setViewToNode(node);

        return node;
    },
    createLink: function()
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

    }
};