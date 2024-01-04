// 列表项高度不固定，随内容适应，且调用方无法确定具体高度

<!-- 设置默认虚拟 高度 fuzzyItemHeight -->
<!-- 由于无法得知节点具体高度，可以通过给出一个模糊高度fuzzyItemHeight来初始化一个并不准确的高度撑起容器。
接着在滚动过程中，item组件挂载后可以得到准确的高度，此时更新totalHeight，使totalHeight趋于准确-->

componentWillMount() {
<!-- 所有元素虚拟高度集合 不准确-->
    this.heightCache = new Array(this.props.listData.length).fill(this.props.fuzzyItemHeight || 30);
}



<!-- 子组件命周期componentDidMount内更新totalHeight-->
onMount(index: number, height: number) {
    if (index > this.lastCalcIndex) {
        this.heightCache[index] = height;  // heightCache数组存储已挂载过的列表项的高度
        this.lastCalcIndex = index;  //lastCalcIndex记录最后一个已挂载节点的索引
        this.lastCalcTotalHeight += height;  //lastCalcTotalHeight记录已挂载节点的全部高度和
        //趋于准确
        this.totalHeight = this.lastCalcTotalHeight + (this.props.listData.length - 1 - this.lastCalcIndex) * (this.props.fuzzyItemHeight || 30);
    }
}



<!-- 计算可见节点
遍历已缓存的节点高度，calcHeight记录已遍历的节点总高度，直到calcHeight > scrollTop，记录当前节点索引为startIndex，同理找出calcHeight > scrollTop + containerHeight的节点索引为endIndex。与此同时，posInfo记录各节点到顶部的距离，以便直接给出偏移量offset = posInfo[startIndex] -->

private getListToDisplay(params: {
    scrollTop: number;
    containerHeight: number;
    itemHeights: number[];
    bufferNumber: number;
    listData: any[];
}) {
    const { scrollTop, containerHeight, itemHeights, bufferNumber, listData } = params;
    let calcHeight = itemHeights[0]; //初始化（已遍历的节点总高度） 值为 第一个已遍历节点的高度 
    let startIndex = 0;
    let lastIndex = 0;
    const posInfo = []; // posInfo记录各节点到顶部的距离
    posInfo.push(0);
    for (let index = 1; index < itemHeights.length; index++) {
        //已遍历节点的总高度 > scrollTop滚动距离
        if (calcHeight > scrollTop) {
            startIndex = index - 1;
            break;
        }
        posInfo.push(calcHeight);
        calcHeight += itemHeights[index];
    }
    for (let index = startIndex; index < itemHeights.length; index++) {
        if (calcHeight > scrollTop + containerHeight) {
            lastIndex = index;
            break;
        }
        calcHeight += itemHeights[index];
    }
    startIndex = Math.max(0, startIndex - bufferNumber);
    lastIndex = Math.min(itemHeights.length - 1, lastIndex + bufferNumber);
    return {
        data: listData.slice(startIndex, lastIndex + 1),
        offset: posInfo[startIndex]
    }
}


<!-- 渲染 -->
render() {
const { height: containerHeight, listData, bufferNumber = 10 } = this.props;
const { scrollTop } = this.state;
<!-- 
scrollTop 滚动距离
itemHeights 需要挂在的元素 高度 默认为 30 若挂载过 则会更新高度值 Arr 
containerHeight 容器高度 【固定】
bufferNumber 缓冲元素数
 -->
const { data: _listToDisplay, offset } = this.getListToDisplay({ scrollTop, listData, itemHeights: this.heightCache, containerHeight, bufferNumber });

return (
    <div ref={this.container} onScroll={this.onScroll} style={{ height: `${containerHeight}px`, overflow: 'auto' }}>
        <div className="virtual-list-wrapper" style={{ height: `${this.totalHeight}px` }}>
            <div style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }}>
                {
                    _listToDisplay.map((item, index) => {
                        return (
                            <ListItem key={item.key ? item.key : index} onMount={this.onMount.bind(this, listData.indexOf(item))}>
                                {/* <img src={item.img} /> */}
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

