var stage = {width:0, height: 0};

var SpringNodes = function(element){
    this.balls = new Array();
		this.numBalls = 30;
		this.spring = 0.0025;
		this.friction = 0.8;
		this.gravity = 10;
    this.minDist = 200;
    
    this.element = element;
    this.mousedown = false;
                  
    this.init();
}


SpringNodes.prototype = {
		init:function(){
			stage.width = window.innerWidth;
      stage.height = window.innerHeight;

      this.element.width = stage.width;
      this.element.height = stage.height;

      this.context = this.element.getContext('2d');

      for(var i = 0; i < this.numBalls; i++)
			{
        var size = Math.random() * 5 + 2;
				var ball = new Ball(this.context);
        ball.x = Math.random() * stage.width;
			  ball.y = Math.random() * stage.height;
        
        ball.vx = Math.random() * 6 - 3;
				ball.vy = Math.random() * 6 - 3;
        
        ball.radius = size;
        ball.mass = size;
				this.balls.push(ball);
			}
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
      for(var i = 0; i < this.balls.length; i++){
        var ball = this.balls[i]
				ball.x += ball.vx;
				ball.y += ball.vy;
				if(ball.x > stage.width){
					ball.x = 0;
				}
				else if(ball.x < 0){
					ball.x = stage.width;
				}
				if(ball.y > stage.height){
					ball.y = 0;
				}
				else if(ball.y < 0){
					ball.y = stage.height;
				}
			}
      
      for(var i=0; i < this.balls.length - 1; i++){
				var partA = this.balls[i];
				for(var j = i + 1; j < this.balls.length; j++)
				{
					var partB = this.balls[j];
					this.springBall(partA, partB);
				}
			}
		},
    springBall: function(partA, partB){
       var dx = partB.x - partA.x;
       var dy = partB.y - partA.y;
       var dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < this.minDist){
          var line = new Line(this.context);
          line.width = 1;
          line.moveTo(partA.x, partA.y);
          line.drawTo(partB.x, partB.y);
          
          var ax = dx * this.spring;
          var ay = dy * this.spring;
          partA.vx += ax / partA.mass;
          partA.vy += ay / partA.mass;
          partB.vx -= ax / partB.mass;
          partB.vy -= ay / partB.mass;
        }
    },
}

function draw(){
    springNodes.draw();
}