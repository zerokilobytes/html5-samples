var MouseDraw = function(canvasElement, options) {
    var x = 0;
    var y = 0;
    var mousedown = false;

    var context;

    this.options = options;

    var __construct = function() {
        context = canvasElement.getContext('2d');
        canvasElement.addEventListener("mousemove", _draw, false);
        canvasElement.addEventListener("mousedown", _beginDraw, false);
        canvasElement.addEventListener("mouseup", function() {
            mousedown = false
        }, false);
    };

    function _beginDraw(e) {
        mousedown = true;
        context.beginPath();
        context.fillStyle = options.color;
        context.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    function _draw(e) {
        if (mousedown) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(e.clientX, e.clientY);
            context.lineWidth = 10;
            context.strokeStyle = options.color;
            context.lineCap = 'round';
            context.stroke();
        }
        x = e.clientX;
        y = e.clientY;
    }
    __construct(this);
};