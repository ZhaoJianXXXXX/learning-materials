/*
 * Opera浏览器的技术师Erik Möller 把这个函数进行了封装，使得它能更好的兼容各种浏览器。
 * 你可以读一读这篇文章，但基本上他的代码就是判断使用4ms还是16ms的延迟，来最佳匹配60fps。
 * 下面就是这段代码，你可以使用它，但请注意，这段代码里使用的是标准函数，我给它加上了兼容各种浏览器引擎前缀。
 */
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

window.requestAnimationFrame(function(/* time */ time){
	// time ~= +new Date // the unix time
});
