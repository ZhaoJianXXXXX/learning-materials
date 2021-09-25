var rAF = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();
  
var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
  
var loop = function () {
    var now = Date.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);
  
    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;
  
    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        console.log(`${new Date()} 1S内 FPS：`, fps);
        frame = 0;
        lastTime = now;
    };
  
    rAF(loop);
}
 
loop();