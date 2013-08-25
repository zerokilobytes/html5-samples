
var Ball = function(context){
    this.x = 0;
		this.y = 0;
    this.vx = 0;
		this.vy = 0;
    
    this.oldX = 0;
    this.oldY = 0;
    
    this.mass = 100;
    
    this.context = context;
    this.color = 'blue';
    this.radius = 20;
    this.dragging = false;
    
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
    },
    
    isDragging: function(){
        return this.dragging;
    },
    
    getHeight: function(){
        return this.radius * 2;
    },
    
    getWidth: function(){
        return this.getHeight();
    },
    
    colliding:function(ball){
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
      },
      
      resolveCollision : function(ball){
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
      },
      getX : function(){
        return this.x;
      },
      
      getY :function(){
        return this.y;
      },
      
      setY : function(y){
        this.y = y;
      },
      
      setX: function(x){
        this.x = x;
      },

      getVelocityX : function()
      {
          return this.vx;
      },
      getVelocityY : function(){
          return this.vy;
      },
      
      setVelocityX : function(x)
      {
         this.vx = x;
      },
      setVelocityY : function(y)
      {
         this.vy = y;
      },
      
      getMass : function(){
          return this.mass;
      },
      
      getRadius: function(){
          return this.radius;
      }
}