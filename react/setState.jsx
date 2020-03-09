/*
 * setState流程还是很复杂的，设计也很精巧，避免了重复无谓的刷新组件。它的主要流程如下
 * 1.enqueueSetState将state放入队列中，并调用enqueueUpdate处理要更新的Component
 * 2.如果组件当前正处于update事务中，则先将Component存入dirtyComponent中。否则调用batchedUpdates处理。
 * 3.batchedUpdates发起一次transaction.perform()事务
 * 4.开始执行事务初始化，运行，结束三个阶段
 		初始化：事务初始化阶段没有注册方法，故无方法要执行
		运行：执行setSate时传入的callback方法，一般不会传callback参数
		结束：更新isBatchingUpdates为false，并执行FLUSH_BATCHED_UPDATES这个wrapper中的close方法
 * 5.FLUSH_BATCHED_UPDATES在close阶段，会循环遍历所有的dirtyComponents，调用updateComponent刷新组件，并执行它的pendingCallbacks, 也就是setState中设置的callback。
   this.setState(newSTate) -> newState存入pending队列 -> 判断是否处于batchUpdate
   如果处于batchUpdate 保存组件与dirtyComponents中
   如果不处于batchUpdate 遍历所有的dirtyComponents -> 调用updateComponent -> 更新 pengding state or props
 */

/*
 * 1.setState
 * ReactBaseClassses.js
 * 这里的partialState可以传object,也可以传function,它会产生新的state以一种Object.assign()的方式跟旧的state进行合并。
 */

ReactComponent.prototype.setState = function (partialState, callback) {
	// 将setState事务放进队列中
	this.updater.enqueueSetState(this, partialState);
	if (callback) {
		this.updater.enqueueCallback(this, callback, 'setState');
	}
};

/*
 * 2.enqueueSetState
 * 这段代码可以得知，enqueueSetState 做了两件事： 1.将新的state放进数组里 2.用enqueueUpdate来处理将要更新的实例对象
 */
enqueueSetState : function (publicInstance, partialState) {
    //获取当前组件的instance
	var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
    //将要更新的state放入一个数组里
    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
  	queue.push(partialState);
    //将要更新的component instance也放在一个队列里
  	enqueueUpdate(internalInstance);
}

/*
 * 3.enqueueUpdate
 * ReactUpdates.js
 * 由这段代码可以看到，当前如果正处于创建/更新组件的过程，就不会立刻去更新组件，而是先把当前的组件放在dirtyComponent里，所以不是每一次的setState都会更新组件~。
 * 这段代码就解释了我们常常听说的：setState是一个异步的过程，它会集齐一批需要更新的组件然后一起更新。
 * 而batchingStrategy 又是个什么东西呢？
 */
function enqueueUpdate(component) {
	//如果没有处于批量创建/更新组件的阶段，则处理update state事务
	if (!batchingStrategy.isBatchingUpdates) {
		batchingStrategy.batchedUpdates(enqueueUpdate, component);
		return;
	}
	//如果正处于批量创建/更新组件的过程，将当前的组件放在dirtyComponents数组中
	dirtyComponents.push(component);
}

/*
 * 4.batchingStrategy
 * ReactDefaultBatchingStrategy.js
 * 这里注意两点：
 * 1.如果当前事务正在更新过程中，则使用enqueueUpdate将当前组件放在dirtyComponent里。
 * 2.如果当前不在更新过程的话，则执行更新事务。
 */
var ReactDefaultBatchingStrategy = {
	//用于标记当前是否出于批量更新
	isBatchingUpdates : false,
	//当调用这个方法时，正式开始批量更新
	batchedUpdates : function (callback, a, b, c, d, e) {
		var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
		ReactDefaultBatchingStrategy.isBatchingUpdates = true;
		//如果当前事务正在更新过程在中，则调用callback，既enqueueUpdate
		if (alreadyBatchingUpdates) {
			return callback(a, b, c, d, e);
		}else{
			//否则执行更新事务
			return transaction.perform(callback, null, a, b, c, d, e);
		}
	}
};

/*
 * 5.transaction
 * 简单说明一下transaction对象，它暴露了一个perform的方法，用来执行anyMethod
 * 在anyMethod执行的前，需要先执行所有wrapper的initialize方法，在执行完后，要执行所有wrapper的close方法，就辣么简单。
 * 在ReactDefaultBatchingStrategy.js,tranction 的 wrapper有两个 FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES
 */
var RESET_BATCHED_UPDATES = {
	initialize : emptyFunction,
	close : function () {
		ReactDefaultBatchingStrategy.isBatchingUpdates = false;
	}
};

var FLUSH_BATCHED_UPDATES = {
	initialize : emptyFunction,
  	close : ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var TRANSACTION_WRAPPERS = [ FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES ];

perform : function (method, scope, a, b, c, d, e, f) {
    var errorThrown;
    var ret;
    try {
		this._isInTransaction = true;
		errorThrown = true;
		// 先运行所有wrapper中的initialize方法
		this.initializeAll(0);
		// 再执行perform方法传入的callback
		ret = method.call(scope, a, b, c, d, e, f);
		errorThrown = false;
	}finally {
		try {
			if (errorThrown) {
		// 最后运行wrapper中的close方法
				try {
					this.closeAll(0);
				} catch (err) {}
			}else {
				// 最后运行wrapper中的close方法
				this.closeAll(0);
			}
		}finally {
			this._isInTransaction = false;
		}
    }
    return ret;
},

initializeAll : function (startIndex) {
	var transactionWrappers = this.transactionWrappers;
	// 遍历所有注册的wrapper
	for (var i = startIndex; i < transactionWrappers.length; i++) {
		var wrapper = transactionWrappers[i];
		try {
			this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
			// 调用wrapper的initialize方法
			this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
		}finally {
			if(this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
				try{
					this.initializeAll(i + 1);
				}catch (err){

				}
			}
		}
	}
},

closeAll : function (startIndex) {
	var transactionWrappers = this.transactionWrappers;
	// 遍历所有wrapper
	for (var i = startIndex; i < transactionWrappers.length; i++) {
		var wrapper = transactionWrappers[i];
		var initData = this.wrapperInitData[i];
		var errorThrown;
		try {
			errorThrown = true;
			if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
				// 调用wrapper的close方法，如果有的话
				wrapper.close.call(this, initData);
			}
			errorThrown = false;
		}finally {
			if (errorThrown) {
				try {
					this.closeAll(i + 1);
				} catch (e) {}
			}
		}
	}
	this.wrapperInitData.length = 0;
}




















