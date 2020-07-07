class State {
    constructor(){
        this.state = {};
    }
    setState(nextState){
        this.componentWillUpdate(nextState);
        if(this.shouldComponentUpdate(nextState)){
            const preState = this.state;
            this.state = {
                ...preState,
                ...nextState
            };
            this.componentDidUpdate(preState)
        }
    }
    componentWillUpdate(){
        //默认啥也不做
    }
    shouldComponentUpdate(){
        //默认返回true，一直允许更新
        return true;
    }
    componentDidUpdate(){
        //默认啥也不做
    }
}


//测试用例
class User extends State {
    constructor(props){
        super(props);
        this.state = {
            name: props.name
        }
    }
    componentWillUpdate(nextState){
        console.info('componentWillUpdate', nextState);
    }
    shouldComponentUpdate(nextState){
//        if(nextState.name === this.state.name){
//            return false;
//        }
        return true;
    }
    componentDidUpdate(preState){
        console.info('componentDidUpdate',preState)
    }
}

const user = new User({ name: '123' });
user.setState({ name: 5 });
