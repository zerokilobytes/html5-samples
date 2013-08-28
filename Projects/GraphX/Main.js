var manager;

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
}

function Loop(lastTime)
{
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;



    Update(timeDiff);

    //Draws the current screen if the popup is showing.
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