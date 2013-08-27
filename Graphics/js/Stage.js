var Stage = function(options) {
    this.element = options.element;
    this.width = options.width;
    this.height = options.height;

    this.init();
};

Stage.prototype = {
    init: function() {
        if (typeof this.width == "undefined" || typeof this.height == "undefined") {
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.element.width = this.width;
            this.element.height = this.height;
        } else {
            this.element.width = this.width;
            this.element.height = this.height;
        }
    },
    getElement: function() {
        return this.element;
    },
    getContext2D: function() {
        return this.getElement().getContext('2d');
    }
};