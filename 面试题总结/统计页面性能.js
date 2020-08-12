
//以下给出统计页面性能指标的方法
let times = {};
let t = window.performance.timing;

// 优先使用 navigation v2  https://www.w3.org/TR/navigation-timing-2/
if (typeof window.PerformanceNavigationTiming === 'function') {
  try {
    var nt2Timing = performance.getEntriesByType('navigation')[0]
    if (nt2Timing) {
      t = nt2Timing
    }
  } catch (err) {
  }
}

//重定向时间
times.redirectTime = t.redirectEnd - t.redirectStart;

//dns 查询耗时
times.dnsTime = t.domainLookupEnd - t.domainLookupStart;

//TTFB 读取页面第一个字节的时间
times.ttfbTime = t.responseStart - t.navigationStart;

//DNS 缓存时间
times.appcacheTime = t.domainLookupStart - t.fetchStart;

//卸载页面的时间
times.unloadTime = t.unloadEventEnd - t.unloadEventStart;

//tcp 连接耗时
times.tcpTime = t.connectEnd - t.connectStart;

//request 请求耗时
times.reqTime = t.responseEnd - t.responseStart;

//解析 dom 树耗时
times.analysisTime = t.domComplete - t.domInteractive;

//白屏时间
times.blankTime = (t.domInteractive || t.domLoading) - t.fetchStart;

//domReadyTime
times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart;


SPA 盛行之际
Navigation Timing API 可以监控大部分前端页面的性能。但随着 SPA 模式的盛行，类似 vue，reactjs 等框架的普及，页面内容渲染的时机被改变了，W3C 标准无法完全满足原来的监控意义。
幸运的是，目前 W3C 关于首屏统计已经进入了提议阶段，以 Chrome 为首的浏览器正在打造更能代表用户使用体验的 FP、FCP、FMP 指标，并且逐步开放 API。

注意点
通过 window.performance.timing 所获的的页面渲染所相关的数据，在 SPA 应用中改变了 url 但不刷新页面的情况下是不会更新的。
因此仅仅通过该 api 是无法获得每一个子路由所对应的页面渲染的时间。如果需要上报切换路由情况下每一个子页面重新 render 的时间，需要自定义上报。
