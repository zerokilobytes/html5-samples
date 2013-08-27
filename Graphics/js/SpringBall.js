var stage = {width: 0, height: 0};

var Line = function(context) {
    this.context = context;

    this.color = '#999';

    this.init = function() {
        this.context.beginPath();
    };

    this.moveTo = function(x, y) {
        this.context.moveTo(x, y);
    };

    this.drawTo = function(x, y) {
        this.context.lineTo(x, y);
        this.context.lineWidth = 2;
        this.context.lineCap = 'round';
        this.context.strokeStyle = this.color;
        this.context.stroke();
    };
    this.init();
};

var Ball = function(context) {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    this.context = context;
    this.color = 'blue';
    this.radius = 20;
    this.dragging = false;

    this.init();
};

Ball.prototype = {
    init: function() {
        this.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    },
    draw: function() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
    },
    stopDrag: function() {
        this.dragging = false;
    },
    startDrag: function() {
        this.dragging = true;
    },
    isDragging: function() {
        return this.dragging;
    }
};

var Container = function(element) {
    this.balls = new Array();
    this.numBalls = 3;
    this.spring = 0.05;
    this.friction = 0.95;
    this.springLength = 300;

    this.element = element;

    this.mousedown = false;

    this.init();
};

Container.prototype = {
    init: function() {
        stage.width = window.innerWidth;
        stage.height = window.innerHeight;

        canvas.width = stage.width;
        canvas.height = stage.height;

        this.context = this.element.getContext('2d');

        for (var i = 0; i < this.numBalls; i++)
        {
            var ball = new Ball(this.context);
            ball.x = Math.random() * stage.width;
            ball.y = Math.random() * stage.height;
            this.balls.push(ball);
        }

        var that = this;

        this.element.addEventListener("mousedown", function(e) {
            that.element.addEventListener("mouseup", function() {
                for (var i = 0; i < that.balls.length; i++) {
                    that.mousedown = false;
                    that.balls[i].stopDrag();
                }
            }, false);

            for (var i = 0; i < that.balls.length; i++) {
                if (that.holdBall({x: e.clientX, y: e.clientY}, that.balls[i])) {
                    that.mousedown = true;
                    that.balls[i].startDrag();
                }
            }
        }, false);

        this.element.addEventListener("mousemove", function(e) {
            for (var i = 0; i < that.balls.length; i++) {
                if (that.mousedown) {
                    that.holdBall({x: e.clientX, y: e.clientY}, that.balls[i]);
                }
            }
        }, false);

    },
    clear: function() {
        this.context.clearRect(0, 0, stage.width, stage.height);
    },
    draw: function() {
        this.clear();
        this.move();
        this.drawLines();

        for (var i = 0; i < this.numBalls; i++) {
            this.balls[i].draw();
        }
    },
    drawLines: function() {
        var line = new Line(this.context);

        for (var i = 0; i < this.balls.length - 1; i++) {
            line.moveTo(this.balls[i].x, this.balls[i].y);
            line.drawTo(this.balls[i + 1].x, this.balls[i + 1].y);
        }
        line.moveTo(this.balls[this.balls.length - 1].x, this.balls[this.balls.length - 1].y);
        line.drawTo(this.balls[0].x, this.balls[0].y);
    },
    move: function() {
        for (var i = 0; i < this.balls.length; i++) {
            for (var j = 0; j < this.balls.length; j++) {
                if (this.balls[i] !== this.balls[j]) {
                    if (!this.balls[i].isDragging()) {
                        this.springTo(this.balls[i], this.balls[j]);
                    }
                }
            }
        }
    },
    springTo: function(ballA, ballB) {
        var dx = ballB.x - ballA.x;
        var dy = ballB.y - ballA.y;
        var angle = Math.atan2(dy, dx);
        var targetX = ballB.x - Math.cos(angle) * this.springLength;
        var targetY = ballB.y - Math.sin(angle) * this.springLength;
        ballA.vx += (targetX - ballA.x) * this.spring;
        ballA.vy += (targetY - ballA.y) * this.spring;
        ballA.vx *= this.friction;
        ballA.vy *= this.friction;
        ballA.x += ballA.vx;
        ballA.y += ballA.vy;
    },
    holdBall: function(mousePosition, ball) {
        var xd = mousePosition.x - ball.x;
        var yd = mousePosition.y - ball.y;

        var sumRadius = 1 + ball.radius;
        var sqrRadius = sumRadius * sumRadius;

        var distSqr = (xd * xd) + (yd * yd);

        if (distSqr <= sqrRadius)
        {
            if (ball.dragging) {
                ball.x = mousePosition.x;
                ;
                ball.y = mousePosition.y;
                ;
            }
            return true;
        }
        return false;
    }
}

function draw() {
    container.draw();
}