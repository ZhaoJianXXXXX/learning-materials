//背景
    PerformanceObserver 是个相对比较复杂的API，用来监控各种性能相关的指标。 该API由一系列API组成

    var observer = new PerformanceObserver(callback);
    observer.observe({ entryTypes: [entryTypes] });

    entryTypes: 需要监控的指标名，这些指标都可以通过 performance.getEntries() 获取到，此外还可以通过 performance.getEntriesByName() 、performance.getEntriesByType() 分别针对 name 和 entryType 来过滤，由一以下组成：

    1.mark 获取所有通过 performance.mark(markName) 做的所有标记
    2.measure 获取通过 performance.measure(measureName, markName_start, markName_end) 得到的所有测量值
    3.longtask 监听长任务（超过50ms 的任务）（不足：只能监控到长任务的存在，貌似不能定位到具体任务）
    4.paint 获取绘制相关的性能指标，分为两种：“first-paint”、“first-contentful-paint”
    5.navigation 各种与页面有关的时间，可通过 performance.timing 获取
    6.resource 各种与资源加载相关的信息

    const observer = new PerformanceObserver((list) => {
        let output;
        for (const item of list.getEntries()) {
           //业务代码
        }
    });

    observer.observe({
        //按需要填写
        entryTypes: ['mark', 'measure', 'longtask', 'paint', 'navigation', 'resource']
    });
