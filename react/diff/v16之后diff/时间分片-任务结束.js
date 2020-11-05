//时间分片
    时间分片的逻辑藏在循环里。

    //react-reconciler -> ReactFiberWorkLoop.js
    function workLoopConcurrent() {
      // Perform work until Scheduler asks us to yield
      while (workInProgress !== null && !shouldYield()) {
        workInProgress = performUnitOfWork(workInProgress);
      }
    }
    performUnitOfWork可能返回null或者下一个需要被执行的fiber，返回结果存在workInProgress中。workInProgress在react-reconciler模块中是全局变量。

    当shouldYield返回true的时候，循环语句中断，一个时间分片就结束了，浏览器将重获控制权。

    以下任意条件成立时，shouldYield会返回true

    时间片到期（默认5ms）
    更紧急任务插队
    react 通过中断任务循环，实现了时间分片。

//任务恢复
    循环中断时，下一个未被完成的任务已经被保存到react-reconciler模块的全局变量workInProgress中。下一次循环开始时就从workInProgress开始。

    跳出循环之后，react还做了一件事，通过MessageChannel发起了一个postMessage事件。

    以上都发生在浏览器重获控制权之前。

    而监听这个事件的，正是循环的发起者performWorkUntilDeadline。

    // scheduler.development.js
    const performWorkUntilDeadline = () => {
        if (scheduledHostCallback !== null) {
          const currentTime = getCurrentTime();
          deadline = currentTime + yieldInterval;
          const hasTimeRemaining = true;
          try {
            // 通过scheduledHostCallback发起workLoopConcurrent循环
            const hasMoreWork = scheduledHostCallback(
              hasTimeRemaining,
              currentTime,
            );
            if (!hasMoreWork) {
              isMessageLoopRunning = false;
              scheduledHostCallback = null;
            } else {
              port.postMessage(null); // 发起postMessage事件
            }
          } catch (error) {
            port.postMessage(null);
            throw error;
          }
        } else {
          isMessageLoopRunning = false;
        }
        needsPaint = false;
      };

      const channel = new MessageChannel();
      const port = channel.port2;
      channel.port1.onmessage = performWorkUntilDeadline;
    循环中断之后react执行 port.postMessage 发起了一个message事件，并且通过事件监听又恢复了循环。在循环中断到事件响应的间隙，浏览器重获了控制权，执行必要的渲染工作（如果有的话）。
