1.如何一边遍历一边删除(必须是正向遍历)

2.写一个函数，可以同时实现这四种，如果没法同时实现四种，看看最多可以同时实现几种
    CodingMan('Peter');								//'Hi this is Peter'
    CodingMan('Peter').sleep(3).eat('dinner');		//'Hi this is Peter' 等待3秒 'Eat dinner'
    CodingMan('Peter').eat('dinner').eat('supper');	//'Hi this is Peter' 'dinner' 'Eat sipper'
    CodingMan('Peter').sleepFirst(5).eat('supper');	//等待5秒 'Wake up after 5s' 'Hi this is Peter' 'Eat supper'



//上面代码中， ColorPoint继承了父类Point， 但是它的构造函数没有调用super方法， 导致新建实例时报错。
//ES5 的继承， 实质是先创造子类的实例对象this， 然后再将父类的方法添加到this上面（ Parent.apply(this)）。 ES6 的继承机制完全不同， 实质是先创造父类的实例对象this（ 所以必须先调用super方法）， 然后再用子类的构造函数修改this。
//如果子类没有定义constructor方法， 这个方法会被默认添加， 代码如下。 也就是说， 不管有没有显式定义， 任何一个子类都有constructor方法。



import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";

const { Provider, Consumer } = createContext();

class AliveScope extends React.Component {
  nodes = {};
  state = {};

  keep = (id, children) => {
    return new Promise(resolve => {
      this.setState(
        {
          [id]: { id, children }
        },
        () => {
          console.log("id", this.nodes[id]);
          resolve(this.nodes[id]);
        }
      );
    });
  };

  render() {
    return (
      <Provider value={this.keep}>
        {this.props.children}
        {Object.values(this.state).map(({ id, children }) => {
          console.log("aa", this.nodes[id]);
          return (
            <div
              key={id}
              ref={node => {
                this.nodes[id] = node;
              }}
            >
              {children}
            </div>
          );
        })}
      </Provider>
    );
  }
}

const withScope = WrappedComponent => props => {
  return (
    <Consumer>{keep => <WrappedComponent {...props} keep={keep} />}</Consumer>
  );
};

// @withScope
class KeepAlive1 extends React.Component {
  constructor(props) {
    super(props);
    this.init(props);
  }

  init = async ({ id, children, keep }) => {
    const realContent = await keep(id, children);
    this.placeholder.appendChild(realContent); // 元素移动
  };

  render() {
    return (
      <div
        ref={node => {
          this.placeholder = node;
        }}
      />
    );
  }
}

const KeepAlive = withScope(KeepAlive1);

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      count: {count}
      <button onClick={() => setCount(count => count + 1)}>add</button>
    </div>
  );
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(show => !show)}>Toggle</button>
      <p>无 KeepAlive</p>
      {show && <Counter />}
      <p>有 KeepAlive</p>
      {show && (
        <KeepAlive id="Test">
          <Counter />
        </KeepAlive>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AliveScope>
    <App />
  </AliveScope>,
  rootElement
);
otElement
);



export const ArrayParam = class extends Array{
    getParam(key, value){
        //todo
    }
}

export const ArrayParam = class extends Array{
    //兼容性写法，为了兼容babel不同版本需要这样定义构造器
    constructor(...args){
        super(...args);
        const arr = new Array(...args);
        Object.setPrototypeOf(arr, this.constructor.prototype);
        return arr;
    }
    getParam(key, value){
        //todo
    }
}








function A(score){
    if(score > 30){ return 'A' }
    return 'pass'
}

function B(score){
    if(score > 20 && score <= 30){ return 'B' }
    return 'pass';
}

function C(score){
    if(score <= 20){ return 'C' }
    return 'unknown';
}

Function.prototype.next = function(fn){
    let _this = this;
    return function(...rest){
        let res = _this(...rest);
        if(res === 'pass'){
            return fn(...rest)
        }
        return res;
    }
}

function getScore(score){
    return A.next(B).next(C)(score);
}

getScore(25)


//两个数组是否重合
function inset(ary1, ary2){
	let ary1Max = Math.max(...ary1);
	let ary1Min = Math.min(...ary1);
	let ary2Max = Math.max(...ary2);
	let ary2Min = Math.min(...ary2);
	return (ary1Max <= ary2Max && ary1Max >= ary2Min) || (ary1Min >= ary2Min && ary1Min <= ary2Max);
}

function digui(arys, i, res = []){
	if(i < arys.length){
		if(res.length > 0){
			let resIndex = 0;
			let pushFlag = false;
			while(resIndex < res.length){
				if(inset(arys[i], res[resIndex])){
					let compareMin = Math.min(...arys[i], ...res[resIndex]);
					let compareMax = Math.max(...arys[i], ...res[resIndex]);
					res[resIndex] = [compareMin, compareMax];
					pushFlag = true;
					break;
				}else{
					resIndex++;
				}
			}
			if(!pushFlag){
				res.push(arys[i]);
			}
		}else{
			res.push(arys[i]);
		}
		digui(arys, i + 1, res);
	}
	return res;
}

function get(arys){
	if(Array.isArray(arys)){
		if(arys.length <= 1){
			return arys;
		}
		return digui(arys, 0);
	}
	return [];
}

get([[1, 4], [3, 6], [8, 12], [9, 15]]); //[[1, 6], [8, 15]]


A([1,2]) => [[1,2], [2,1]]
A([1,2,3]) => [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]

function Father(props){
	this.name = props.name
}
Father.prototype.getName = function(){ return this.name }

function Son(props){
	Father.call(this, props);
	this.sex = props.sex;
}

function Middle(){}

Middle.prototype = = Father.prototype;
Son.prototype = new Middle();
Son.prototype.constructor = Son;




function compareVersion(version1, version2){
    version1 = typeof version1 === 'string' && version1.split('.') || [];
    version2 = typeof version2 === 'string' && version2.split('.') || [];
    const length = Math.max(version1.length, version2.length);
    for(let i = 0; i < length; i++){
        if((version1[i] === '0' && !version2[i]) || (!version1[i] && version2[i] === '0') || version1[i] === version2[i]){
            continue;
        }
        if((version1[i] && !version2[i]) || Number(version1[i]) > Number(version2[i])){
            return 1;
        }
        if((!version1[i] && version2[i]) || Number(version1[i]) < Number(version2[i])){
            return -1;
        }
    }
    return 0;
}

compareVersion('0.1', '1.1.1')
compareVersion('13.37', '1.2')
compareVersion('1.1', '1.1.0')

function EventEmitter(maxListener){
    this.listeners = {};
    this.maxListener = maxListener;
}

Function.prototype.next = function(fn){
    let _this = this;
    return function(){
        let args = Array.from(arguments);
        let res = _this.apply(this, args)
        if(res === 'next'){
            return fn.apply(this, args)
        }
        return res;
    }
}


function A(score){
    if(score >= 30){
        return 'A';
    }
    return 'next';
}

function B(score){
    if(score >= 20 && score < 30){
        return 'B';
    }
    return 'next';
}

function C(score){
    if(score >= 10 && score < 20){
        return 'C';
    }
    return 'next';
}

function D(score){
    if(score < 10){
        return 'D';
    }
    return 'unknown';
}

function getComment(score){
    return A.next(B).next(C).next(D)(score)
}

console.info(getComment(35));
console.info(getComment(23));
console.info(getComment(18));
console.info(getComment(9));

EventEmitter.prototype.on = function (event, callback) {
    let listeners = this.listeners;
    if(listeners[event] && listeners[event].length >= this.maxListener) {
        throw new Error(`监听器的最大数量是${this.maxListener}`);
    }
    if(Array.isArray(listeners[event])) {
        if(listeners[event].indexOf(callback) === -1) {
            listeners[event].push(callback);
        }
    }else{
        listeners[event] = [callback];
    }
}

EventEmitter.prototype.emit = function (event) {
    let args = Array.from(arguments);
    args.shift();
    this.listeners[event].forEach(callback => {
        callback(...args);
    });
}

EventEmitter.prototype.once = function (event, listener) {
    let _this = this;
    function fn() {
        let args = Array.from(arguments);
        listener(...args);
        _this.removeListener(event, fn);
    }
    this.on(event, fn)
}
