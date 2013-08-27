var frame = {width: 0, height: 0};

var SineWave = function(context) {
    var angle = 0;
    var centerY = frame.height / 2;
    var range = 100;
    var xspeed = 1;
    var yspeed = .02;
    var xpos;
    var ypos;
    var color = generateColor();


    function __construct() {
        xpos = 20;
        drawLine();
    }
    function drawLine() {
        context.beginPath();

        context.moveTo(20, frame.height / 2);
        context.lineTo(frame.width, frame.height / 2);

        context.moveTo(20, 0);
        context.lineTo(20, frame.height);

        context.lineWidth = 1;
        context.strokeStyle = '#CCC';
        context.lineCap = 'square';
        context.stroke();
    }
    function draw() {
        context.beginPath();
        context.fillStyle = color;
        context.arc(xpos, ypos, 2, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
    this.move = function() {
        xpos += xspeed;
        angle += yspeed;
        ypos = centerY + Math.sin(angle) * range;
        draw();
    }
    function generateColor() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    __construct();
}

var sineWave = null;

function init()
{
    frame.width = window.innerWidth;
    frame.height = window.innerHeight;

    canvas = document.getElementById("canvas");

    canvas.width = frame.width;
    canvas.height = frame.height;

    ctx = canvas.getContext('2d');

    sineWave = new SineWave(ctx);
    setInterval(draw, 30);
}

function draw()
{
    sineWave.move();
}