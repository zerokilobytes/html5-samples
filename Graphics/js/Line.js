var Line = function(context) {
    this.context = context;
    this.rotation = 0;

    this.x1 = 0;
    this.y1 = 0;

    this.x2 = 0;
    this.y2 = 0;

    this.color = '#999';

    this.width = 2;
    this.cap = 'round';

    this.init();
};

Line.prototype = {
    init: function() {
        this.context.beginPath();
    },
    moveTo: function(x, y) {
        this.x1 = x;
        this.y1 = y;
        this.context.moveTo(this.x1, this.y1);
    },
    drawTo: function(x, y) {
        this.x2 = x;
        this.y2 = y;

        if (this.rotation !== 0) {
            var dx = this.x2 - this.x1;
            var dy = this.y2 - this.y1;

            var radius = Math.sqrt(dx * dx + dy * dy);
            var angle = this.rotation * (Math.PI / 180);

            this.x2 = this.x1 + Math.cos(angle) * radius;
            this.y2 = this.y1 + Math.sin(angle) * radius;
        }

        this.context.lineTo(this.x2, this.y2);
        this.context.lineWidth = this.width;
        this.context.lineCap = this.cap;
        this.context.strokeStyle = this.color;
        this.context.stroke();
    },
    draw: function() {
        this.init();
        this.moveTo(this.x1, this.y1);
        this.drawTo(this.x2, this.y2);
    },
    getBounds: function(container) {

        var x1 = Math.min(this.x1, this.x2);
        var x2 = Math.max(this.x1, this.x2);

        var y1 = Math.min(this.y1, this.y2);
        var y2 = Math.max(this.y1, this.y2);

        return new Bound(y1, x2, y2, x1);
    }
};