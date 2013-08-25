var stage = {width:0, height: 0};

var Ball = function(context){
    this.x = 0;
		this.y = 0;
    this.vx = 0;
		this.vy = 0;
    
    this.context = context;
    this.color = 'blue';
    this.radius = 20;
    this.dragging = false;
    
    this.init();
}

var Line = function (context) {
      this.context = context;

      this.color = '#999';
      
      this.init = function(){
           this.context.beginPath();
      }

      this.moveTo = function (x,y) {
          this.context.moveTo(x, y);
      }

      this.drawTo = function (x, y) {
          this.context.lineTo(x, y);
          this.context.lineWidth = 2;
          this.context.lineCap = 'round';
          this.context.strokeStyle = this.color;
          this.context.stroke();
      }
      this.init();
}

Ball.prototype = {
    init: function(){
       this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    },
    draw: function(){
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
    },
    
    stopDrag: function(){
        this.dragging = false;
    },
    
    startDrag: function(){
        this.dragging = true;
    }
}

var Container = function(element){
    this.balls = new Array();
		this.numBalls = 4;
		this.spring = 0.1;
		this.friction = 0.8;
		this.gravity = 10;
    
    this.element = element;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mousedown = false;

    this.init();
}

Container.prototype = {
		init:function(){
			stage.width = window.innerWidth;
      stage.height = window.innerHeight;
      
      canvas.width = stage.width;
      canvas.height = stage.height;
      
      this.context = this.element.getContext('2d');
      
      for(var i = 0; i < this.numBalls; i++)
			{
				var ball = new Ball(this.context);
				this.balls.push(ball);
			}

      this.balls[0].x = stage.width / 2;
      this.balls[0].y = 60;

      var that = this;
      
      /*
      this.element.addEventListener("mousemove",function(e) {
          that.mouseX = e.clientX;
          that.mouseY = e.clientY;
      }, false);
      */
      
      this.element.addEventListener("mousedown",function(e) {
          that.element.addEventListener("mouseup",function() {
              that.mousedown = false;
              that.balls[0].stopDrag();
          }, false);

          if(that.holdBall({x: e.clientX, y: e.clientY}, that.balls[0])){
              that.mousedown = true;
              that.balls[0].startDrag();
          }
      }, false);

      this.element.addEventListener("mousemove",function(e) {
        if(that.mousedown){
            that.holdBall({x: e.clientX, y: e.clientY}, that.balls[0]);
        }
      }, false);
      
		},
    clear: function(){
        this.context.clearRect(0,0, stage.width, stage.height);
    },
    
    draw: function(){
        this.clear();
        this.move();
        
        for(var i = 0; i < this.numBalls; i++){
         this.balls[i].draw();
        }
    },

		move:function(){
        var line = new Line(this.context);
        line.moveTo(this.balls[0].x, this.balls[0].y);

        for(var i = 1; i < this.numBalls; i++){
          var ballA = this.balls[i-1];
          var ballB = this.balls[i];

          this.moveBall(ballB, ballA.x, ballA.y);
          line.drawTo(ballB.x, ballB.y);
        }
		},
    moveBall: function(ball, targetX, targetY){
        ball.vx += (targetX - ball.x) * this.spring;
        ball.vy += (targetY - ball.y) * this.spring;
        ball.vy += this.gravity;
        ball.vx *= this.friction;
        ball.vy *= this.friction;
        ball.x += ball.vx;
        ball.y += ball.vy;
    },
    holdBall: function(mousePosition, ball){
        var xd = mousePosition.x - ball.x;
        var yd = mousePosition.y - ball.y;

        var sumRadius = 1 + ball.radius;
        var sqrRadius = sumRadius * sumRadius;

        var distSqr = (xd * xd) + (yd * yd);

        if (distSqr <= sqrRadius)
        {
            if(ball.dragging){
              ball.x = mousePosition.x;;
              ball.y = mousePosition.y;;
            }
            return true;
        }
        return false;
    }
}

function draw(){
    container.draw();
}