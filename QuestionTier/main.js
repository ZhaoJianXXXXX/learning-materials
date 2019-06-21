import React, { Component } from 'react';
import './style.less';

/**
 *遮罩层
 * @class
 * @param {object} question 问题
 * @param {number, string number} showTime 等待显示时间
 * @param {number, string number} hideTime 等待隐藏时间，可不传 ，默认为0。
 * @param {boolean} reset  是否重置动画 true 重置
 * @param {boolean} maskVisible 蒙层是否显示 true 显示  false 隐藏
 * @param {string} className  自定义样式
 * maskVisible >  reset = showAnim > showTime = hideTime
 * @extends {Component}
 */
class QuestionTier extends Component {

    constructor(props){
        super(props);
        this.state = {
            initProps : { showTime : 5, hideTime : 0 , showAnim : false },
            TimeoutObj : function(props){    //自定义设置和清除定时器
                this.setTimeout = props && props.setTimeout;
                this.clearTimeout = () => {
                    if(this.setTimeout){
                        clearTimeout(this.setTimeout)
                    }
                    this.setTimeout = undefined;
                }
            },
            objContent:{}, //
            maskVisible : undefined, //蒙层是否显示
        }
    }

    //初始化动画
    init(props){
        let { initProps } = this.state;
        let obj = { ...initProps, ...props };
        let { showTime , hideTime , maskVisible , showAnim , reset } = obj;
        // if(showAnim && reset && !this.jusType(maskVisible, 'Boolean')){
        if(showAnim && reset && maskVisible !== true && maskVisible !== false){
            this.setState({ maskVisible : false }, this.setAnim(showTime, hideTime))
        }else if(showAnim && maskVisible !== true && maskVisible !== false){
            this.setAnim(showTime, hideTime)
        }else{
            this.setState({ maskVisible })
        }
    }

    componentDidMount(){
        this.init(this.props);
    }

    //maskVisible，根据maskVisible控制蒙层何时显示。
    //reset，重置动画
    componentWillReceiveProps(nextProps){
        if(nextProps && (nextProps.maskVisible === true || nextProps.maskVisible === false)){
            this.resetTimeout(() => this.setState({ maskVisible : nextProps.maskVisible }));
        }else if(nextProps && nextProps.reset){
            this.resetTimeout(() => this.init(nextProps));
        }
    }

    componentWillUnmount(){
        this.resetTimeout();
    }
    //设置蒙层动画
    setAnim(showTime, hideTime){
        let { TimeoutObj , objContent } = this.state;
        let self = this;
        if(isNaN(showTime + '') || isNaN(hideTime + '')){
            throw new Error('time must be number');
        }else{
            //享元模式 如果已存在，则不需要重新new对象
            if(objContent && this.jusType(objContent, 'Object') && Object.keys(objContent).length > 0){
                objContent.show.setTimeout = setTimeout(() => { self.setState({ maskVisible : true }, objContent.show.clearTimeout) }, Number(showTime) * 1000);
                objContent.hide.setTimeout = setTimeout(() => { self.setState({ maskVisible : false }, objContent.hide.clearTimeout) }, Number(hideTime) * 1000);
            }else{
                let show = new TimeoutObj({ setTimeout : setTimeout(() => { self.setState({ maskVisible : true }, show.clearTimeout) }, Number(showTime) * 1000) });
                let hide = new TimeoutObj({ setTimeout : setTimeout(() => { self.setState({ maskVisible : false }, hide.clearTimeout) }, Number(hideTime) * 1000) });
                objContent.show = show;
                objContent.hide = hide;
            }
            self.setState({ objContent });
        }
    }
    //清除定时器
    resetTimeout(callback){
        let {objContent} = this.state;
        if(this.jusType(objContent, 'Object')){
            for(let i in objContent){
                objContent[i].clearTimeout();
            }
            this.setState({objContent},callback)
        }else{
            callback && callback();
        }
    }
     //判断参数数据类型
    jusType = (param, type) => Object.prototype.toString.call(param) === '[object ' + type + ']';

    render() {
        let { maskVisible } = this.state;
        let { className } = this.props;
        let format_className = this.jusType(className, 'String') ? ' ' + className : '';
        return (
            <div className={ 'QuestionTier'+ format_className } style = { !maskVisible ? { display : 'none' } : null }>
                <div className="tier"></div>
                <p className='tier-question' dangerouslySetInnerHTML={{ __html: this.props.question }} />
            </div>
        );
        // return ReactDOM.createPortal(
        //     <div className={ 'QuestionTier'+ format_className } style = { !maskVisible ? { display : 'none' } : null }>
        //         <div className="tier"></div>
        //         <p className='tier-question' dangerouslySetInnerHTML={{ __html: this.props.question }} />
        //     </div>,
        //     document.body
        // );
    }
}

export default QuestionTier;
