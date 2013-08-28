var manager;
var time;
var timeDiff;

window.requestAnimFrame = (function(callback)
{
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback)
            {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function Update(time) {
    //console.log(time);
	manager.update();
}

function Loop(lastTime)
{
    var date = new Date();
    time = date.getTime();
    timeDiff = time - lastTime;



    Update(timeDiff);

    
    Draw();

    // request new frame
    requestAnimFrame(function() {
        Loop(time);
    });

}
function Draw() {
    manager.draw();
}
/*
 //Windows focus
 document.onfocusin = onFocus;
 document.onfocusout = onBlur;
 window.onfocus = onFocus;
 window.onblur = onBlur;
 */

window.onload = function() {
    var date = new Date();
    var time = date.getTime();
    //stage = new Kinetic.Stage("canvas", ScreenWidth, ScreenHeight);
    init();
    Loop(time);
};