var frame = {width:0, height: 0};

        var stage = null;
        var layer = null;

        function init() {
            frame.width = window.innerWidth;
            frame.height = window.innerHeight;
           
            stage = new Kinetic.Stage({
              container: 'container',
              width: frame.width,
              height: frame.height
            });
        }

        window.onload = function() {
            //init();
            //var layer = new Kinetic.Layer();
            //stage.add(layer);
            //var element = layer.getCanvas().getElement();
        }