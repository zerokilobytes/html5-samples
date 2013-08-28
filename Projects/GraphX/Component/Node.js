var Node = function(property) {
    this.x = property.x;
    this.y = property.y;
    this.content = null;

    this.vx = 0;
    this.vy = 0;

    this.init();
};

Node.prototype = {
    init: function() {
        this.content = new Kinetic.Circle({
            x: this.x,
            y: this.y,
            radius: 30,
            fill: 'red',
            stroke: 'gray',
            strokeWidth: 1,
            draggable: true
        });
        
       // this.content.x = 0;
       // this.content.y = 0;
        this.content.vx = 0;
        this.content.vy = 0;
    },
    getX : function(){
    	//console.log(this.content.getPosition().x);
    	return this.content.getPosition().x;
    },
    getY : function(){
    	return this.content.getPosition().y;
    },
    setX : function(x){
    	this.content.setX (x);
    },
    setY : function(y){
    	this.content.setY(y);
    },
    getVX : function(){
    	return this.vx;
    },
    getVY : function(){
    	return this.vy;
    },
    setVX : function(vx){
    	this.vx = vx;
    },
    setVY : function(vy){
    	this.vy = vy;
    },
    isDragging: function(){
    	return this.content.isDragging();
    },
	update: function(){
		this.content.setPosition(this.content.getPosition().x,this.content.getPosition().y);
	}
};