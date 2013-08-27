var CanvasManager = function(){
    this.canvas = null;
};

CanvasManager.prototype = {
    getCanvas : function(){
        var canvas = document.getElementById('graph-canvas');
        var context = canvas.getContext('2d');
        return context;
    }
};


