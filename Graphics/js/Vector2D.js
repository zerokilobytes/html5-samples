var Vector2D = function(x,y){
    this.x = x;
    this.y = y;
    
      this.getX = function(){
        return this.x;
      }
      
      this.getY = function(){
        return this.y;
      }
      
       this.setY = function(y){
        this.y = y;
      }
      
      this.setX = function(x){
        this.x = x;
      }
      
       this.getLength = function(){
          return Math.sqrt((this.getX() * this.getX()) + (this.getY() * this.getY()));
      }
      
           
      this.subtract = function(position){
          var vector = new Vector2D();
          vector.setX(this.getX() - position.getX());
          vector.setY(this.getY() - position.getY());

          return vector;
      }
}