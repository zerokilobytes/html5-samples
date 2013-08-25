/*
    Kinematics Example
*/
var Kinematics = function(){
    this.children = new Array();
    this.context = stage.getContext2D();
    this.cycle = 0;
    this.vx = 4;
		this.vy = 0;
    this.init();
}

Kinematics.prototype = {
		init:function(){
    
      segment0 = new Segment(50, 15);
			this.add(segment0);
			segment0.x = 200;
			segment0.y = 100;
			
			segment1 = new Segment(50, 10);
			this.add(segment1);
			segment1.x = segment0.getPin().x;
			segment1.y = segment0.getPin().y;
			
			segment2 = new Segment(50, 15);
			this.add(segment2);
			segment2.x = 200;
			segment2.y = 100;
			
			segment3 = new Segment(50, 10);
			this.add(segment3);
			segment3.x = segment2.getPin().x;
			segment3.y = segment2.getPin().y;
        
      this.speedSlider = new RangeControl(0, 0.3, 0.12);
      this.thighRangeSlider = new RangeControl(0, 90, 45);
      this.thighBaseSlider = new RangeControl(0, 180, 90);
      this.calfRangeSlider = new RangeControl(0, 90, 45);
      this.calfOffsetSlider = new RangeControl(-3.14, 3.14, -1.57);
      this.gravitySlider = new RangeControl(0, 1, 0.9);
		},
    clear: function(){
        this.context.clearRect(0,0, stage.width, stage.height);
    },
    
    draw: function(){
        this.clear();
        this.move();
        
        for(var i = 0; i < this.children.length; i++){
            this.children[i].draw();
        }
    },

		move:function(){
        this.doVelocity();
        this.walk(segment0, segment1, this.cycle);
        this.walk(segment2, segment3, this.cycle + Math.PI);
        this.cycle += this.speedSlider.value;
        this.checkFloor(segment1);
        this.checkFloor(segment3);
        this.checkWalls();
		},
    add: function(segment){
        Container.prototype.add.call(this, segment);
    },
    
    walk: function (segA, segB, cyc){
			var foot = segB.getPin();
			var angleA = Math.sin(cyc) *
								this.thighRangeSlider.value + 
								this.thighBaseSlider.value;
			var angleB = Math.sin(cyc + this.calfOffsetSlider.value) *
								this.calfRangeSlider.value +
								this.calfRangeSlider.value;
			segA.rotation = angleA;
			segB.rotation = segA.rotation + angleB;
			segB.x = segA.getPin().x;
			segB.y = segA.getPin().y;
			segB.vx = segB.getPin().x - foot.x;
			segB.vy = segB.getPin().y - foot.y;
		},
    
    doVelocity: function (){
			this.vy += this.gravitySlider.value;
			segment0.x += this.vx;
			segment0.y += this.vy;
			segment2.x += this.vx;
			segment2.y += this.vy;
		},

		checkFloor: function(seg){
			var yMax = seg.getBounds(stage).bottom;
			if(yMax > stage.height)
			{
				var dy = yMax - stage.height;
				segment0.y -= dy;
				segment1.y -= dy;
				segment2.y -= dy;
				segment3.y -= dy;
				//this.vx -= seg.vx;
				this.vy -= seg.vy;
			}
		},
		
		checkWalls : function(){
			var w = stage.width + 200;
			if(segment0.x > stage.width + 100)
			{
				segment0.x -= w;
				segment1.x -= w;
				segment2.x -= w;
				segment3.x -= w;
			}
			else if(segment0.x < -100)
			{
				segment0.x += w;
				segment1.x += w;
				segment2.x += w;
				segment3.x += w;
			}
		}
}