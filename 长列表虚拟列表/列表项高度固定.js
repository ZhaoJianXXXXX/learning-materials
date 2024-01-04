// 列表项高度固定，且每个列表项高度相等

// 为容器绑定 scrollTop，且实时更新scrollTop值
private onScroll() {
    this.setState({scrollTop: this.container.current?.scrollTop || 0});
}

// 计算 数据截取始末index
private calcListToDisplay(params: {
    scrollTop: number,
    listData: any[],
    itemHeight: number,
    bufferNumber: number,
    containerHeight: number,
}) {
    const {scrollTop, listData, itemHeight, bufferNumber, containerHeight} = params;
    // 考虑到buffer
    let startIndex = Math.floor(scrollTop / itemHeight);
    startIndex = Math.max(0, startIndex - bufferNumber);  //计算出 带buffer 的数据起点 取最大值防止起点为负数
    const displayCount = Math.ceil(containerHeight / itemHeight);
    let lastIndex = startIndex + displayCount;  
    lastIndex = Math.min(listData.length, lastIndex + bufferNumber);  //计算出 带buffer 的数据终点，取最小值防止数据溢出

    return {
        data: listData.slice(startIndex, lastIndex + 1), //截取的数据
        offset: startIndex * itemHeight //顶部偏移量
    }
}


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
<VirtualList height={300} itemHeight={38} listData={generateList()} />