// componentDidCatch：

//     总是在浏览器中调用
//     当DOM已经更新时，在“提交阶段”期间调用
//     应该用于错误报告之类的事情

// getDerivedStateFromError：

//     在服务器端呈现期间也会调用
//     当DOM尚未更新时，在“提交阶段”之前调用
//     应该用于渲染回退UI

// 不过,我对某些事情感到有些困惑：

// 他们是否都捕获了相同类型的错误？或每个生命周期
// 会抓到不同的错误吗？
// 我应该总是使用两者(可能在同一个“错误捕捉”组件中)吗？
// “使用componentDidCatch进行错误恢复不是最佳选择,因为它会强制后备UI始终同步呈现”这有什么问题？

// 在这种情况下，责任在它们之间分配.
// getDerivedStateFromError是唯一有用的东西，即在发生错误时更新状态
// 而componentDidCatch提供副作用，并且可以在需要时访问此组件实例.

// 新的React版本旨在实现更高效的异步呈现.正如在the comment中也提到的那样,同步渲染不是后备UI的一个大问题,因为它可以被视为边缘情况.

// 正确写法
class ErrorBoundary extends React.Component {
    state = { hasError: false };
   
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
   
    componentDidCatch(error,info) {
      logComponentStackToMyService(info.componentStack);
    }
   
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
   
      return this.props.children; 
    }
  }