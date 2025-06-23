/**
 * 最大并发数请求方法
 * @param {Array<Function>} tasks - 请求任务数组，每个任务是一个返回Promise的函数
 * @param {number} maxNum - 最大并发数
 * @returns {Promise} - 返回所有任务完成的Promise
 */
function request(tasks, maxNum) {
  return new Promise((resolve, reject) => {
    const results = []; // 存储所有请求的结果
    let currentIndex = 0; // 当前执行的任务索引
    let activeCount = 0; // 当前活跃的请求数

    // 执行下一个任务
    function executeNext() {
      // 如果所有任务都已完成，则resolve结果
      if (currentIndex >= tasks.length && activeCount === 0) {
        resolve(results);
        return;
      }

      // 如果还有任务未执行且当前活跃请求数小于最大并发数
      while (currentIndex < tasks.length && activeCount < maxNum) {
        const taskIndex = currentIndex;
        activeCount++;
        currentIndex++;

        // 执行任务
        tasks[taskIndex]()
          .then(result => {
            results[taskIndex] = { status: 'fulfilled', value: result };
          })
          .catch(error => {
            results[taskIndex] = { status: 'rejected', reason: error };
          })
          .finally(() => {
            activeCount--;
            executeNext(); // 当前任务完成后，尝试执行下一个任务
          });
      }
    }

    // 开始执行任务
    executeNext();
  });
}

// 使用示例
function mockRequest(id, delay) {
  return () => new Promise(resolve => {
    console.log(`开始请求 ${id}`);
    setTimeout(() => {
      console.log(`完成请求 ${id}`);
      resolve(`结果 ${id}`);
    }, delay);
  });
}

// 定义多个请求任务
const tasks = [
  mockRequest(1, 1000),
  mockRequest(2, 1500),
  mockRequest(3, 500),
  mockRequest(4, 2000),
  mockRequest(5, 800),
  mockRequest(6, 1200),
];

// 执行请求，最大并发数为3
request(tasks, 3)
  .then(results => {
    console.log('所有请求完成:', results);
  })
  .catch(error => {
    console.error('请求出错:', error);
  });