import { useLayoutEffect, useRef, useState } from "react";

function singleFormat(num) {
  try {
    num = num < 10 ? `0${num}` : num;
  } finally {
    return num;
  }
}

function getTime(ms) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  try {
    hours = Math.floor(ms / 1000 / 60 / 60);
    ms -= hours * 60 * 60 * 1000;
    minutes = Math.floor(ms / 1000 / 60);
    ms -= minutes * 60 * 1000;
    seconds = Math.floor(ms / 1000);
  } finally {
    return `${singleFormat(hours)}:${singleFormat(minutes)}:${singleFormat(
      seconds
    )}`;
  }
}

function App1({ timeRange, onStart, onEnd }) {
  const thisNowTime = useRef();
  const allCount = useRef(0);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    if (!thisNowTime.current && !allCount.current) {
      thisNowTime.current = Date.now();
      allCount.current = Math.ceil(timeRange);
      typeof onStart === "function" && onStart();
    }
    const deviationTime = thisNowTime.current + count - Date.now();
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      if (count >= allCount.current) {
        console.info("endTime", Date.now() - thisNowTime.current);
        typeof onEnd === "function" && onEnd();
        return;
      }
      setCount(count + 1000);
    }, deviationTime);
  }, [count, timeRange]);

  return <div>{getTime(allCount.current - count)}</div>;
}

export default function App() {
  return (
    <div className="App">
      <App1
        timeRange={5000}
        onStart={() => {
          console.info("开始了");
        }}
        onEnd={() => {
          console.info("结束了");
        }}
      />
    </div>
  );
}
