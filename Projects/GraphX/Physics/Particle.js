var Particle = function(mass, position) {
    this.mass = 0.0;
    this.age = 0.0;
    this.isDisposedOf = false;
    this.isFixed = false;
    this.isEnable = false;
    this.position = null;
    this.velocity = null;
    this.force = null;

    this.init(mass, position);
};

Particle.prototype = {
    init: function(mass, position) {
        this.mass = mass;
        this.position = position;
        this.isFixed = false;
        this.isEnable = true;
        this.age = 0.0;
        this.isDisposedOf = false;
        this.velocity = new Vector3D(0, 0, 0);
        this.force = new Vector3D(0, 0, 0);
    },
    MoveTo: function(x, y, z) {
        this.position.set(x, y, z);
    },
    moveBy: function(x, y, z)
    {
        this.position.add(x, y, z);
    },
    setVelocity: function(x, y, z) {
        this.velocity.set(x, y, z);
    },
    addVelocity: function(x, y, z) {
        this.velocity.add(x, y, z);
    },
    setForce: function(x, y, z) {
        this.force.set(x, y, z);
    },
    makeFixed: function() {
        this.isFixed = true;
        this.velocity.Clear();
    },
    isFree: function() {
        return !this.isFixed;
    },
    makeFree: function() {
        this.isFixed = false;
    },
    dispose: function() {
        this.isDisposedOf = true;
    },
    isDisposed: function() {
        return this.isDisposedOf;
    },
      help:function(){},
};

