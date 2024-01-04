// 列表项高度固定不相等，但组件调用方可以明确的传入形如(index: number)=>number的getter方法去指定每个索引处列表项的高度

由于传入了Getter方法，相当于已知每个列表项的高度。
我们可以维护一个数组posInfo来存储每个节点到容器顶部的距离，posInfo[i]即为第i项距离顶部的偏移量。
那么不考虑bufferNumber，只需要找出满足posInfo[k] < scrollTop，且posInfo[k+1] > scrollTop的k即可，由于posInfo一定是递增序列，
可以采用二分法查找提高效率。

<!-- 为容器绑定 scrollTop，且实时更新scrollTop值  -->
private onScroll() {
    this.setState({scrollTop: this.container.current?.scrollTop || 0});
}


<!-- 调用初始化高度 -->
componentWillMount() {
    const { listData, heightGetter } = this.props;
    if (heightGetter instanceof Function) {
        this.initItemPosition(listData, heightGetter);
    }
}
<!-- 使用 posInfo 存储每个节点到容器顶部的距离 -->
private initItemPosition(listData: any[], heightGetter: heightGetter) {
    this.totalHeight = listData.reduce((total: number, item: any, index: number) => {
        const height = heightGetter(index);
        this.posInfo.push(total);
        return total + height;
    }, 0);
}

<!-- 截取数据 获取 lastIndex -->
private getListToDisplay(params: {
    scrollTop: number;
    listData: any[];
    posInfo: number[];
    containerHeight: number;
    bufferNumber: number;
}) {
    const { scrollTop, listData, posInfo, containerHeight, bufferNumber } = params;
    let startIndex = this.searchPos(posInfo, scrollTop);
    let lastIndex = listData.length - 1;
    const lastIndexDistance = containerHeight + scrollTop;
    for (let index = startIndex; index < listData.length; index++) {
        if (posInfo[index] >= lastIndexDistance) {
            lastIndex = index;
            break;
        }
    }
    // 考虑buffer
    startIndex = Math.max(0, startIndex - bufferNumber);
    lastIndex = Math.min(listData.length - 1, lastIndex + bufferNumber);
    return {
        data: listData.slice(startIndex, lastIndex + 1),
        offset: posInfo[startIndex]
    }
}


<!-- 使用二分法得到开始的index  -->
<!-- 即找出满足posInfo[k] < scrollTop，且posInfo[k+1] > scrollTop的k即可 -->
private searchPos(posInfo: number[], scrollTop: number) {
    const _binarySearchPos = (start: number, end: number): number => {
        if (end - start <= 1) {
            return start;
        }
        const mid = Math.ceil((start + end) / 2);
        if (posInfo[mid] === scrollTop) {
            return mid;
        } else if (posInfo[mid] < scrollTop) {
            if (posInfo[mid + 1] && posInfo[mid + 1] >= scrollTop) {
                return mid;
            } else {
                return _binarySearchPos(mid + 1, end);
            }
        } else {
            if (posInfo[mid - 1] && posInfo[mid - 1] <= scrollTop) {
                return mid - 1;
            } else {
                return _binarySearchPos(start, mid - 1);
            }
        }
    }
    return _binarySearchPos(0, posInfo.length - 1);
}

<!-- 不变 -->
render() {
const {itemHeight, listData, height: containerHeight, bufferNumber = 10} = this.props;
const {scrollTop} = this.state;
const totalHeight = itemHeight * listData.length;
const { data: listToDisplay, offset } = 
    this.calcListToDisplay({scrollTop, listData, itemHeight, bufferNumber, containerHeight});
    return (
        <!-- 外层容器 -->
        <div ref={this.container} onScroll={this.onScroll} style={{height: `${containerHeight}px`, overflow: 'auto'}}>
        <!-- 计算所有数据高度，用于显示滚动条 -->
            <div className="virtual-list-wrapper" style={{height: `${totalHeight}px`}}>
            <!-- 展示内容 使用 transform 时刻保持在屏幕中央 -->
                <div style={{transform: `translateY(${offset}px)`}}>
                    {
                        listToDisplay.map((item, index) => {
                            return (
                                <ListItem key={item.key ? item.key: index}>
                                    <img src={item.img}/>
                                    <div>{item.text}</div>
                                </ListItem>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

<!-- 调用组件 -->
<VirtualList height={300} heightGetter={(index) => { return listData[index].height }} listData={listData} />