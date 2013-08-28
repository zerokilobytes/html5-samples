var CanvasManager = function(){
    this.canvas = null;
    this.stage = null;
    this.graphLayer = null;
    
    this.init();
};

CanvasManager.prototype = {
	init : function(){
		this.stage = new Kinetic.Stage({
		    container: 'graphx_canvas',
		    width: 600,
		    height: 400
		  });
		
		this.graphLayer = new Kinetic.Layer();
		
		this.stage.add(this.graphLayer);
	},
    getCanvas2D : function(){
        var canvas = document.getElementById('graphx_canvas');
        var context = canvas.getContext('2d');
        return context;
    },
    getStage: function(){
		return this.stage;
	},
	getGraphLayer: function(){
		return this.graphLayer;
	}
};