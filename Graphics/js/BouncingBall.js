var ctx;

var windowSize = {width:0, height: 0};

var Vector2D = function(x,y){
    this.x = x;
    this.y = y;
    
      this.getX = function(){
        return this.x;
      };
      
      this.getY = function(){
        return this.y;
      };
      
       this.setY = function(y){
        this.y = y;
      };
      
      this.setX = function(x){
        this.x = x;
      };
      
       this.getLength = function(){
          return Math.sqrt((this.getX() * this.getX()) + (this.getY() * this.getY()));
      };
      
           
      this.subtract = function(position){
          var vector = new Vector2D();
          vector.setX(this.getX() - position.getX());
          vector.setY(this.getY() - position.getY());

          return vector;
      };
}

var Velocity = function(x,y){
    this.x = x;
    this.y = y;
    
    this.getX = function(){
        return this.x;
      };
      
      this.getY = function(){
        return this.y;
      };
      
       this.setY = function(y){
        this.y = y;
      };
      
      this.setX = function(x){
        this.x = x;
      };
};
var Ball = function(context, x, y) {
      
      this.context = context;
      this.velocity= new Velocity(2,4);
      var radius= 50;
      this.color= '#0000FF';
      var mass = 10;
      this.bounce = -1;

      var position = new Vector2D(x,y);
      
      this.id = -1;

      function init($this)
      {
        $this.id = $this.getUID();
      
          // Randomly get between a percentage of values
         $this.velocity.setX($this.velocity.getX() * ((Math.floor(Math.random() * (80 - 20 + 1)) + 20) / 100));
         $this.velocity.setY($this.velocity.getY() * ((Math.floor(Math.random() * (100 - 90 + 1)) + 90) / 100));
         
         $this.color= $this.generateColor();
         
         
        var min = 90;
        var max = 100;
        // and the formula is:
        var ratio = (Math.floor(Math.random() * (max - min + 1)) + min) / 100;
        
        var minRad = 20;
        var maxRad = 50;
            
         
         radius = (Math.floor(Math.random() * (maxRad - minRad + 1)) + minRad);
         mass =   radius * 100 * ratio;
         
         console.log(ratio + " " + radius + " " + mass);
         
      }
      
      this.getRadius = function(){
        return radius;
      };
      
      this.getUID = function(){
          return Math.ceil((Math.random()*99999999)+1);
      };
      
      this.getId = function(){
          return this.id;
      };
      
      this.getX = function(){
        return position.getX();
      };
      
      this.getY = function(){
        return position.getY();
      }
      
      this.setY = function(y){
        position.setY(y);
      };
      
      this.setX = function(x){
        position.setX(x);
      };

      
      this.getVelocityX = function()
      {
          return this.velocity.getX();
      };
      this.getVelocityY = function(){
          return this.velocity.y;
      }
      
      this.setVelocityX = function(x)
      {
         this.velocity.setX(x);
      };
      this.setVelocityY = function(y)
      {
         this.velocity.setY(y);
      };
      
      this.getMass = function(){
          return mass;
      };
      
      this.bounceXAxis = function(){
          this.velocity.setX (- this.velocity.getX());
      };
      
      this.bounceYAxis  = function(){
          this.velocity.setY(- this.velocity.y);
      };
      
      this.detectCollision = function(){
        if((this.getX() - this.getRadius()) <= 0 || (this.getX() + this.getRadius()) > windowSize.width) this.bounceXAxis();
        if((this.getY() - this.getRadius()) <= 0 || (this.getY() + this.getRadius()) > windowSize.height) this.bounceYAxis();
        
        //console.log(this.velocity.x + "  " + this.velocity.y)
      };
      
      this.move = function(){
          this.setX(this.getX() + this.getVelocityX());
          this.setY(this.getY() + this.getVelocityY());
      };
      
      this.reDraw = function(){
          this.context.beginPath();
          this.context.fillStyle=this.color;
          this.context.arc(this.getX(),this.getY(),this.getRadius(),0,Math.PI*2,true);
          this.context.closePath();
          this.context.fill();
      };
      
      this.getPosition = function(){
          return position;
      };
      
     
      this.colliding = function(ball){
         
          
          var xd = this.getX() - ball.getX();
          var yd = this.getY() - ball.getY();

          var sumRadius = this.getRadius() + ball.getRadius();
          var sqrRadius = sumRadius * sumRadius;

          var distSqr = (xd * xd) + (yd * yd);
 
          if (distSqr <= sqrRadius)
          {
              return true;
 
          }
          
          return false;
      }
      
    this.resolveCollision = function(ball)
    {
          xDist = this.getX() - ball.getX();
            yDist = this.getY() - ball.getY();
            var distSquared = xDist*xDist + yDist*yDist;

            //Check the squared distances instead of the the distances, same result, but avoids a square root.
            if(distSquared <= (this.getRadius() + ball.getRadius())*(this.getRadius() + ball.getRadius())){
                var xVelocity = ball.getVelocityX() - this.getVelocityX();
                var yVelocity = ball.getVelocityY() - this.getVelocityY();
                var dotProduct = xDist*xVelocity + yDist*yVelocity;

                //Neat vector maths, used for checking if the objects moves towards one another.
                if(dotProduct > 0){
                    var collisionScale = dotProduct / distSquared;
                    var xCollision = xDist * collisionScale;
                    var yCollision = yDist * collisionScale;

                    //The Collision vector is the speed difference projected on the Dist vector,
                    //thus it is the component of the speed difference needed for the collision.
                    var combinedMass = this.getMass() + ball.getMass();
                    var collisionWeightA = 2 * ball.getMass() / combinedMass;
                    var collisionWeightB = 2 * this.getMass() / combinedMass;

                    this.setVelocityX (this.getVelocityX() + (collisionWeightA * xCollision));
                    this.setVelocityY (this.getVelocityY() + (collisionWeightA * yCollision));

                    ball.setVelocityX(ball.getVelocityX() - (collisionWeightB * xCollision));
                    ball.setVelocityY(ball.getVelocityY() - (collisionWeightB * yCollision));
                }
            }
    }
      
      this.generateColor = function() {
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }
      
      init(this);
};
    
    var balls = new Array();

function init()
{
  windowSize.width = window.innerWidth;
  windowSize.height = window.innerHeight;
  
  canvas=document.getElementById("myCanvas");
  
  canvas.width = windowSize.width;
  canvas.height = windowSize.height;
  
  ctx= canvas.getContext('2d');

  for (var i = 0; i < 4; i++ ) {
       balls[i] = new Ball(ctx, 100 * (i+1), 200);
  }

  setInterval(draw,10);
}

function draw()
{
  ctx.clearRect(0,0, window.innerWidth,window.innerHeight);
  for (var i = 0; i < balls.length; i++) {
     balls[i].reDraw();
     balls[i].detectCollision();
     balls[i].move();
  }
  
  
  
  for (var i = 0; i < balls.length; i++) {
     for (j = i + 1; j <balls.length; j++)  
     {  
        if (balls[i].colliding(balls[j]))  
        {
            balls[i].resolveCollision(balls[j]);
        }
    }
  }
}
