var stage = {width:0, height: 0};
var AngleBounce = function(element){
    this.balls = new Array();
    this.lines = new Array();
    this.numLines = 1;
    this.numBalls = 3;
		this.gravity = 0.3;
		this.bounce = -0.6;
    this.friction = 0.99;
 
    this.element = element;

    this.mousedown = false;

    this.init();
}

AngleBounce.prototype = {
		init:function(){
			stage.width = window.innerWidth;
      stage.height = window.innerHeight;
      
      canvas.width = stage.width;
      canvas.height = stage.height;
      
      this.context = this.element.getContext('2d');

      for(var i = 0; i < this.numBalls; i++)
			{
				var ball = new Ball(this.context);
        ball.x = getRandomInt(250, 600);
			  ball.y = 20;
				this.balls.push(ball);
			}
      
      var that = this;
      
      this.element.addEventListener("mousedown",function(e) {
          that.mousedown = true;
          for (var i = 0; i < that.balls.length; i++) {
              if(that.balls[i].isDragging()){
                that.balls[i].oldX = that.balls[i].x;
                that.balls[i].oldY = that.balls[i].y;
              }
          }
          
          

          that.element.addEventListener("mouseup",function() {
              that.mousedown = false;
              for (var i = 0; i < that.balls.length; i++) {
                  that.balls[i].stopDrag();
              }
              
          }, false);

           
          for (var i = 0; i < that.balls.length; i++) {
              if(that.holdBall({x: e.clientX, y: e.clientY}, that.balls[i])){
                 that.balls[i].startDrag();
              }
          }
      }, false);

      this.element.addEventListener("mousemove",function(e) {
        for (var i = 0; i < that.balls.length; i++) {
            if(that.mousedown){
                that.holdBall({x: e.clientX, y: e.clientY}, that.balls[i]);
            }
        }
      }, false);
      
      var line = new Line(this.context);
      

      var line = new Line(this.context);
      line.moveTo(100, 100);
      line.drawTo(650, 220);
      line.rotation = 10;
      this.lines.push(line);
      
      var line = new Line(this.context);
      line.moveTo(600, 400);
      line.drawTo(100, 200);
      line.rotation = -30;
      this.lines.push(line);
		},
    clear: function(){
        this.context.clearRect(0,0, stage.width, stage.height);
    },
    
    draw: function(){
        this.clear();
        this.move();
        this.drawLines();
        
        for (var i = 0; i < this.balls.length; i++) {
          for (j = i + 1; j <this.balls.length; j++){  
            if (this.balls[i].colliding(this.balls[j]))  
            {
              this.balls[i].resolveCollision(this.balls[j]);
            }
          }
        }

        for(var i = 0; i < this.balls.length; i++){
          if(this.mousedown && this.balls[i].isDragging()){
              this.balls[i].vx = this.balls[i].x - this.balls[i].oldX;
              this.balls[i].vy = this.balls[i].y - this.balls[i].oldY;
              this.balls[i].oldX = this.balls[i].x;
              this.balls[i].oldY = this.balls[i].y;
          }
         this.balls[i].draw();
        }
        
        for(var i = 0; i < this.lines.length; i++){
         this.lines[i].draw();
        }
    },
    drawLines: function(){

    },

		move:function(){
    
      for(var i = 0; i < this.balls.length; i++){
        if(!this.balls[i].isDragging()){
          // normal motion code
         this.balls[i].vy += this.gravity;
         this.balls[i].vx *= this.friction;
         this.balls[i].x +=this.balls[i].vx;
         this.balls[i].y +=this.balls[i].vy;
          
          if(this.balls[i].x +this.balls[i].radius > stage.width)
          {
           this.balls[i].x = stage.width -this.balls[i].radius;
           this.balls[i].vx *= this.bounce;
          }
          else if(this.balls[i].x -this.balls[i].radius < 0)
          {
           this.balls[i].x =this.balls[i].radius;
           this.balls[i].vx *= this.bounce;
          }
          if(this.balls[i].y +this.balls[i].radius > stage.height)
          {
           this.balls[i].y = stage.height -this.balls[i].radius;
           this.balls[i].vy *= this.bounce;
          }
          else if(this.balls[i].y -this.balls[i].radius < 0)
          {
           this.balls[i].y =this.balls[i].radius;
           this.balls[i].vy *= this.bounce;
          }
          
          
          for(var j = 0; j < this.lines.length; j++){
            var bounds = this.lines[j].getBounds(stage);
            var radius = this.balls[i].radius;
            
            if(this.balls[i].x + radius > bounds.left &&this.balls[i].x - radius < bounds.right){
                // get angle, sine and cosine
                var angle = this.lines[j].rotation * Math.PI / 180;
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);

                // get position of ball, relative to line
                var x1 =this.balls[i].x - this.lines[j].x1;
                var y1 =this.balls[i].y - this.lines[j].y1;
                
                // rotate coordinates
                var y2 = cos * y1 - sin * x1;
                
                // rotate velocity
                var vy1 = cos *this.balls[i].vy - sin *this.balls[i].vx;
                
                // perform bounce with rotated values
                if(y2 > -this.balls[i].getHeight() / 2 && y2 < vy1)
                {
                  // rotate coordinates
                  var x2 = cos * x1 + sin * y1;
                  
                  // rotate velocity
                  var vx1 = cos *this.balls[i].vx + sin *this.balls[i].vy;
                
                  y2 = -this.balls[i].getHeight() / 2;
                  vy1 *= this.bounce;
                  
                  // rotate everything back;
                  x1 = cos * x2 - sin * y2;
                  y1 = cos * y2 + sin * x2;
                 this.balls[i].vx = cos * vx1 - sin * vy1;
                 this.balls[i].vy = cos * vy1 + sin * vx1;
                 this.balls[i].x = this.lines[j].x1 + x1;
                 this.balls[i].y = this.lines[j].y1 + y1;
              }
            }
          }
        }
      }
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
    angleBounce.draw();
}