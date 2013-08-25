var stage = {width:0, height: 0};

var Ball = function(context){
    this.x = 100;
		this.y = 100;
    this.context = context;
    this.color = 'blue';
    this.radius = 40;
    this.dragging = false;
}

Ball.prototype = {
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
    this.ball;
		this.vx;
		this.vy;
		this.bounce = -0.7;
		this.gravity = 0.5;
    this.friction = 0.99;
    this.element = element;
    this.mousedown = false;
    this.oldX = 0;
    this.oldY = 0;
    this.init();
}

Container.prototype = {
		init:function(){
			stage.width = window.innerWidth;
      stage.height = window.innerHeight;
      
      canvas.width = stage.width;
      canvas.height = stage.height;
      
      this.context = this.element.getContext('2d');
      
      var that = this;

      this.element.addEventListener("mousedown",function(e) {
          that.oldX = that.ball.x;
          that.oldY = that.ball.y;
          that.element.addEventListener("mouseup",function() {

        
              that.mousedown = false;
              that.ball.stopDrag();
          }, false);

          if(that.holdBall({x: e.clientX, y: e.clientY}, that.ball)){
              that.mousedown = true;
              that.ball.startDrag();
          }
      }, false);

      this.element.addEventListener("mousemove",function(e) {
        if(that.mousedown){
            that.holdBall({x: e.clientX, y: e.clientY}, that.ball);
        }
      }, false);

			this.ball = new Ball(this.context);
			this.ball.x = stage.width / 2;
			this.ball.y = stage.height / 2;
			this.vx = Math.random() * 25 - 5;
			this.vy = -20;
      this.ball.draw();
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
    },
    clear: function(){
        this.context.clearRect(0,0, stage.width, stage.height);
    },
    draw: function(){
        this.clear();
        if(!this.ball.dragging){
          this.move();
        }

        if(this.mousedown){
            this.vx = this.ball.x - this.oldX;
            this.vy = this.ball.y - this.oldY;
            this.oldX = this.ball.x;
            this.oldY = this.ball.y;
        }
        this.ball.draw();
    },

		move:function()
		{
			this.vy += this.gravity;
      this.vx *= this.friction;

			this.ball.x += this.vx;
			this.ball.y += this.vy;
			var left = 0;
			var right = stage.width;
			var top = 0;
			var bottom = stage.height;
			
			if(this.ball.x + this.ball.radius > right)
			{
				this.ball.x = right - this.ball.radius;
				this.vx *= this.bounce;
			}
			else if(this.ball.x - this.ball.radius < left)
			{
				this.ball.x = left + this.ball.radius;
				this.vx *= this.bounce;
			}
			if(this.ball.y + this.ball.radius > bottom)
			{
				this.ball.y = bottom - this.ball.radius;
				this.vy *= this.bounce;
			}
			else if(this.ball.y - this.ball.radius < top)
			{
				this.ball.y = top + this.ball.radius;
				this.vy *= this.bounce;
			}
		}
}

function draw(){
    container.draw();
}
