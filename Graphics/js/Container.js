var Container = function(width, height)
{
    this.children;
    this.context;
    this.init();
}
Container.prototype = {
		init: function(){
       this.children = new Array();
		},
		add : function(child){
        this.children.push(child);
        child.setContext(this.context);
		}
}