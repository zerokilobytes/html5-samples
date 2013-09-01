var Particle = function() {

    this.mass = 0.0;
    this.age = 0.0;
    this.isDisposed = false;
    this.isFixed = false;
    this.isEnable = false;
    this.position = null;
    this.velocity = null;
    this.force = null;

};

Particle.prototype = {
    init: function(m, p) {
        this.mass = m;
        this.position = p;
        this.isFixed = false;
        this.isEnable = false;
        this.age = 0.0;
        this.isDisposed = false;
        this.velocity = new Vector3D(0, 0, 0);
        this.force = new Vector3D(0, 0, 0);
    },
    moveTo: function(x, y, z)
    {
        this.position.Set(x, y, z);
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
        this.velocity.clear();
    },
    IsFree: function() {
        return !this.isFixed;
    },
    makeFree: function() {
        this.isFixed = false;
    },
    dispose: function()
    {
        this.isDisposed = true;
    },
    isDisposed: function() {
        return this.isDisposed;
    }
};