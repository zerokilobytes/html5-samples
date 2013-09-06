var PhysicsManager = function(mainManager) {
    this.particleSystem;
    this.settings;
    this.timer;

    this.init(mainManager);
};

PhysicsManager.prototype = {
    init: function(mainManager)
    {
        this.particleSystem = new ParticleSystem();
        this.particleSystem.setGravity(new Vector3D(0.0, 0.0, 0.0));
        this.timer = null;
        this.settings = new Settings();
    },
    addNodePhysicRepresentation: function(x, y, z, node, model)
    {

        // if the node already exists and already has a physic representation then don't do anything, go back to where you come from.
        if (node.physicRepresentation !== null) {
            return;
        }

        // else we create a physic representation
        var particle = this.particleSystem.makeParticle(x, y, z);
       
        
        //var otherNode
        //console.log(particle);
        // create some space between the nodes 
        for (var i = 0; i < model.nodeList.length; i++) {
           
            if ( model.nodeList[i].physicRepresentation !== null) {
              
                var repulsion = this.particleSystem.makeAttraction( model.nodeList[i].physicRepresentation, particle, -1 * this.settings.repultionForce, PhysicsConstants.attractionEffectMinimalDistance);
                node.setRepulsion( model.nodeList[i], repulsion);
                 model.nodeList[i].setRepulsion(node, repulsion);
            }
        }
        node.physicRepresentation = particle;
    },
    addEdgePhysicRepresentation: function(link)
    {
        console.log(">>> ");
        // if the link physic representation already exists then don't do anything
        if (link.physicRepresentation !== null) {
            // we update the strength of the physics representation
            link.physicRepresentation.strength = this.getSpringStrength(link);
            return;
        }

        // else we calculate the spring strength
        var springStrength = this.getSpringStrength(link);

        console.log(">>>>>>>>> " + springStrength);

        // create the physic representation
        link.physicRepresentation = this.particleSystem.makeSpring(link.relatedNode1.physicRepresentation, link.relatedNode2.physicRepresentation, springStrength, PhysicsConstants.springDamping, this.settings.linkRestLength);

        // delete useless repulsion
        //TO: DO :::::: link.relatedNode1.getRepulsion(link.relatedNode2).dispose();
    },
    start: function() {
        // initialising the update timer
        // start timer
    },
    pause: function() {
        this.timer.stop();
    },
    resume: function() {
        this.timer.start();
    },
    settings_Changed: function(e) {

    },
    update: function(time) {
        this.particleSystem.tick(time);
    },
    getSpringStrength: function(link) {
        var springStrength;
        springStrength = link.strength / 100;
        springStrength *= PhysicsConstants.maximalSpringStrength - PhysicsConstants.minimalSpringStrength;
        springStrength += PhysicsConstants.minimalSpringStrength;
        console.log(springStrength);
        return springStrength;
    }
};