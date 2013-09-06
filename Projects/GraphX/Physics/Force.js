var Force = function() {
    this.end1 = null;
    this.end2 = null;
    this.isDisposed = false;
    this.isEnable = false;
};

Force.prototype = {
    init: function() {
        this.end1 = null;
        this.end2 = null;
        this.isEnable = true;
        this.isDisposed = false;
    },
    turnOff: function() {
        this.isEnable = false;
    },
    turnOn: function() {
        this.isEnable = true;
    },
    isOn: function() {
        return this.isEnable && this.end1.isEnable && this.end2.isEnable;
    },
    isOff: function() {
        return !(this.isEnable && this.end1.IsEnable && this.end2.IsEnable);
    },
    getOneEnd: function() {
        return this.end1;
    },
    pgetTheOtherEnd: function() {
        return this.end2;
    },
    isDisposed: function() {
        return this.isDisposed || this.end1.isDisposed() || this.end2.isDisposed();
    },
    dispose: function() {
        this.isDisposed = true;
    },
    apply: function() {
    }
};