目的
    获取用户基本信息、行为以及跟踪产品在用户端的使用情况，并以监控数据为基础，指明产品优化的方向。

前端监控类别
    前端监控可以分为三类：数据监控、性能监控和异常监控。

数据监控
    数据监控，就是监听用户信息和行为，常见的监控项有：

    PV(page view 页面访问量)：即页面浏览量或点击量
    UV(unique visitor 独立访客)：指访问某个站点或点击某条新闻的不同 IP 地址的人数
    用户在每一个页面的停留时间
    用户通过什么入口来访问该网页
    用户在相应的页面中触发的行为
    统计这些数据是有意义的，比如我们知道了用户来源的渠道，可以促进产品的推广，知道用户在每一个页面停留的时间，可以针对停留较长的页面，增加广告推送等等。

性能监控
    性能监控指的是监听前端的性能，主要包括监听网页或者说产品在用户端的体验。常见的性能监控项包括：

        不同用户，不同机型和不同系统下的首屏加载时间
        http 等请求的响应时间
        静态资源整体下载时间
        页面渲染时间
        页面交互动画完成时间
        这些性能监控的结果，可以展示前端性能的好坏，根据性能监测的结果可以进一步的去优化前端性能，比如兼容低版本浏览器的动画效果，加快首屏加载等等。

异常监控
    由于产品的前端代码在执行过程中也会发生异常，因此需要引入异常监控。及时的上报异常情况，可以避免线上故障的发上。虽然大部分异常可以通过 try catch 的方式捕获，但是比如内存泄漏以及其他偶现的异常难以捕获。常见的需要监控的异常包括：

Javascript 的异常监控
    样式丢失的异常监控
    服务器请求的异常监控
    我们说完了前端监控的三个分类，现在就来聊聊怎么实现前端监控。实现前端监控，第一步肯定是将我们要监控的事项（数据）给收集起来，再提交给后台，最后进行数据分析。数据收集的丰富性和准确性会直接影响到我们做前端监控的质量，因为我们会以此为基础，为产品的未来发展指引方向。

    收集监控数据我们是通过前端埋点来实现的，目前常见的前端埋点方法有三种：手动埋点、可视化埋点和无埋点。

前端埋点分类
    我们说完了前端监控的三个分类，现在就来聊聊怎么实现前端监控。实现前端监控，第一步肯定是将我们要监控的事项（数据）给收集起来，再提交给后台，最后进行数据分析。数据收集的丰富性和准确性会直接影响到我们做前端监控的质量，因为我们会以此为基础，为产品的未来发展指引方向。

    收集监控数据我们是通过前端埋点来实现的，目前常见的前端埋点方法有三种：手动埋点、可视化埋点和无埋点。

    手动埋点
        手动埋点，也叫代码埋点，即纯手动写代码，调用埋点 SDK 的函数，在需要埋点的业务逻辑功能位置调用接口，上报埋点数据，像友盟、百度统计等第三方数据统计服务商大都采用这种方案。

        优势:
            可自定义属性，自定义事件
            可以细化需求
            相比其他埋点方式减少服务器压力

        缺陷:
            工程量大的话，手动埋点会出现疏漏，不方便审查。
            需求变更要重新埋点，成本高。
            每次需求变更都要重新发布版本，对线上系统稳定性有一定危害
            可视化埋点(这个有点复杂，先不讨论，有兴趣的伙伴可以和我讨论)
            通过可视化交互的手段，代替上述的代码埋点。将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等，最后输出的代码耦合了业务代码和埋点代码。缺点就是可以埋点的控件有限，不能手动定制。

可视化埋点听起来比较高大上，实际上跟代码埋点还是区别不大。也就是用一个系统来实现手动插入代码埋点的过程。比如国外比较早做可视化的是 Mixpanel，国内较早支持可视化埋点的有TalkingData、诸葛 IO，2017年腾讯的 MTA 也宣布支持可视化埋点；相比于手动埋点更新困难，埋点成本高的问题，可视化埋点优化了移动运营中数据采集的流程，能够支持产品运营随时调整埋点，无需再走发版流程，直接把配置结果推入到前端，数据采集流程更简化，也更方便产品的迭代。

可视化埋点中多数基于Xpath的方案，XPath 是一门在 XML 文档中查找信息的语言，XPath 可用来在 XML 文档中对元素和属性进行遍历。

    无埋点
        无埋点则是前端自动采集全部事件，上报埋点数据，由后端来过滤和计算出有用的数据。

    优点:

        前端只要一次加载埋点脚本
    缺点:

    服务器性能压力山大
    采用无埋点技术的有主流的 GrowingIO、神策。

总结
我们需要根据不同场景选择不同的埋点方案。本人比较倾向于无埋点和手动埋点结合。主要用无埋点获取设备的基础信息，用手动埋点来让开发者获取自定义事件。例如对于简单的获取用户信息，基本事件，可以使用无埋点解决；而对于需要携带大量运行时才可获知的业务字段的埋点需求，就需要手动埋点来解决。

先说一下监控方法：

　　1）使用script标签的回调方法，在网络上搜索过，看到有人说可以用onerror方法监控报错的情况，但是经过试验后，发现并没有监控到报错情况，至少在静态资源跨域加载的时候是无法获取的。

　　2）利用 performance.getEntries()方法，获取到所有加载成功的资源列表，在onload事件中遍历出所有页面资源集合，利用排除法，到所有集合中过滤掉成功的资源列表，即为加载失败的资源。 此方法看似合理，也确实能够排查出加载失败的静态资源，但是检查的时机很难掌握，另外，如果遇到异步加载的js也就歇菜了。

　　3）添加一个Listener（error）来捕获前端的异常，也是我正在使用的方法，比较靠谱。但是这个方法会监控到很多的error, 所以我们要从中筛选出静态资源加载报错的error, 代码如下：

function recordResourceError() {
    // 当浏览器不支持 window.performance.getEntries 的时候，用下边这种方式
    window.addEventListener('error',function(e){
      var typeName = e.target.localName;
      var sourceUrl = "";
      if (typeName === "link") {
        sourceUrl = e.target.href;
      } else if (typeName === "script") {
        sourceUrl = e.target.src;
      }
      var resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, sourceUrl, typeName, "0");
      resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
    }, true);
  }
