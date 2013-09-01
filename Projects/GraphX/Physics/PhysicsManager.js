var PhysicsManager = function(mainManager)
{
    this.particleSystem;

    this.settings;

    this.timer;

    this.init(mainManager);
};

PhysicsManager.prototype = {
    init: function(mainManager)
    {
        this.particleSystem = new ParticleSystem();
        this.timer = new DispatcherTimer();
    },
    addPhysicRepresentation: function(x, y, z, node, model)
    {
        // if the node already exists and already has a physic representation then don't do anything, go back to where you come from.
        if (node.physicRepresentation !== null) {
            return;
        }

        // else we create a physic representation
        var particle = this.particleSystem.makeParticle(x, y, z);

        // create some space between the nodes 
        for (var otherNode in model.nodeList) {
            if (otherNode.physicRepresentation !== null)
            {
                var repulsion = this.particleSystem.makeAttraction(otherNode.physicRepresentation, particle, -1 * this.settings.repultionForce, PhysicsConstants.attractionEffectMinimalDistance);
                node.setRepulsion(otherNode, repulsion);
                otherNode.setRepulsion(node, repulsion);
            }
        }
        node.physicRepresentation = particle;
    },
    addPhysicRepresentation2: function(link)
    {
        // if the link physic representation already exists then don't do anything
        if (link.physicRepresentation !== null) {
            // we update the strength of the physics representation
            link.physicRepresentation.strength = this.getSpringStrength(link);
            return;
        }

        // else we calculate the spring strength
        springStrength = this.getSpringStrength(link);

        // create the physic representation
        link.physicRepresentation = this.particleSystem.makeSpring(link.relatedNode1.physicRepresentation, link.relatedNode2.physicRepresentation, springStrength, PhysicsConstants.springDamping, this.settings.linkRestLength);

        // delete useless repulsion
        link.relatedNode1.getRepulsion(link.relatedNode2).dispose();
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
    settings_Changed: function(sender, e) {

    },
    update: function(sender, e) {
        this.particleSystem.tick();
    },
    getSpringStrength: function(link) {
        springStrength;
        springStrength = link.strength / 100;
        springStrength *= PhysicsConstants.maximalSpringStrength - PhysicsConstants.minimalSpringStrength;
        springStrength += PhysicsConstants.minimalSpringStrength;
        return springStrength;
    }
};