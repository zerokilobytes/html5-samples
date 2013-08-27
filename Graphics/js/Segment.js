var Segment = function(width, height)
{
    this.context;
    this.width = width;
    this.height = height;
    this.color = '#FFF';
    this.stroke = "#2d6";
    this.radius = height / 2;
    this.rotation = 0;

    this.x = 0;
    this.y = 0;

    this.vx = 0;
    this.vy = 0;

    this.init();
};
Segment.prototype = {
    init: function() {

    },
    draw: function() {
        var x = this.x;
        var y = this.y;

        var angle = this.rotation * (Math.PI / 180);

        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle);

        this.context.moveTo(0, 0);

        this.context.beginPath();
        this.context.lineWidth = 3;
        this.context.fillStyle = this.color;
        this.context.roundRect(-this.radius, -this.radius, this.width, this.height, this.radius, true, true);

        this.context.closePath();

        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.arc(0, 0, 2, 0, Math.PI * 2, true);
        this.context.strokeStyle = '#000';
        this.context.stroke();
        this.context.closePath();

        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.arc(this.width - (this.radius * 2), 0, 2, 0, Math.PI * 2, true);
        this.context.strokeStyle = '#000';
        this.context.stroke();
        this.context.closePath();

        this.context.restore();

    },
    getPin: function() {
        var angle = this.rotation * Math.PI / 180;
        var xPos = (this.x + Math.cos(angle) * this.width) - (this.radius * 2) * Math.cos(angle);
        var yPos = (this.y + Math.sin(angle) * this.width) - (this.radius * 2) * Math.sin(angle);
        return new Vector2D(xPos, yPos);
    },
    setContext: function(context) {
        this.context = context;
    },
    getBounds: function(container) {

        var x1 = this.x;
        var x2 = this.x + this.height;

        var y1 = this.y;
        var y2 = this.y + this.width;

        return new Bound(y1, x2, y2, x1);
    }
}