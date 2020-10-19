import { message } from 'antd';
import { checkType } from './validator';

/*
 * 判断上传状态，无校验
 * @param info {object} 文件上传信息，一般是e.file
 * @param successCallback {function} 上传成功自定义回调方法，有的话执行，没有的话按默认处理
 */
export function uploadStatus(info, successCallback){
    let success = false;
	if(!!info){
        //如果文件信息存在，需要默认返回true，只在特定状态返回false，因为onChange事件会多次调用，不干扰之后的逻辑判断，如果真的出错，会在最后一次做出判断
        success = true;
		if (info.status === 'done' && info.response && info.response.success) {
            if(typeof successCallback === 'function'){
                successCallback(info);
            }else{
                //将url直接赋值在最外层，保持和回填数据结构一致，并且方便提交取值(主要是看接口返回格式来取值)
                info.url = info.response.data;
                message.success(`${info.name}上传成功`);
            }
		}else if(info.status === 'error'){
            message.error(info && info.response && info.response.errorMsg ? info.response.errorMsg : `${info.name}上传失败`);
			success = false;
        }else if(info.status !== 'uploading' && info.response && !info.response.success) {
			message.error(info && info.response && info.response.errorMsg ? info.response.errorMsg : `${info.name}上传失败`);
			success = false;
		}
        //除此之外的状况按照成功处理(比如info.status === 'uploading')，不干扰之后的逻辑判断，如果真的出错，会在最后一次做出判断
	}
	return { success, info };
}

//校验文件大小
function checkSize(file, props){
    //符合大小或者压根就没有校验
    if(file.size <= props.realSize || isNaN(props.realSize)){
        return true;
    }
    message.error(`上传文件最大为${props.size}${props.unit}`);
    return false;
}

//校验文件格式(不过通常由组件的accept来限制了)
function checkFileType(file, props){
    const name = file.url || file.name;
    const type = props.allowType;
    //取到最后一个'.'出现的位置(最后一个'.'后面即是文件类型)
    const lastPointIndex = name.lastIndexOf('.');
    const suffix = name.substr(lastPointIndex + 1);
    //获取导入文件的文件类型
	if(lastPointIndex > -1 && type.includes(suffix)){
		return true;
	}
    message.error(`上传文件格式为${type.join('、')}格式`);
    return false;
}

/*
 * 处理返回相应的上传列表和每次上传的校验
 * @param value {array | object} 上传时onChange默认出参
 * @param props {object} UploadFileParams构造函数实例
 */
export function picNormalize(value, props){
    //批量处理，待完善
    if(checkType('Array', value)){
        return value;
    }
    //单个处理
    if(checkType('Object', value)){
        //移除逻辑
        if(value.file.status === 'removed'){
            message.success(`${value.file.name || '文件'}移除成功`);
            return value && value.fileList || [];
        }
        if(checkSize(value.file, props) && checkFileType(value.file, props)){
            let res = uploadStatus(value.file);
            if(res.success){
                //成功的话正常返回
                return value.fileList.map((item) => {
                    //将url直接赋值在最外层，保持和回填数据结构一致，并且方便提交取值(主要是看接口返回格式来取值)
                    item.url = item.response && item.response.data || item.url;
                    return item;
                })
            }
            //失败的话剔除该项后返回
            return value.fileList.filter(item => item.uid !== res.info.uid);
        }
        //没有经过校验剔除该项后返回
        return value.fileList.filter(item => item.uid !== value.file.uid) || [];
    }
    return [];
}

/**
 * 上传图片前图片类型解析
 * @param {object} props 各种参数
 * @param {string} props.type 上传文件类型('image', 'xls', 'audio'...)
 * @param {array} props.allowType 自定义允许上传的文件后缀数组(一般用于表单上展示xx,yy文件可上传,仅做文案展示用),如果不传则显示默认
 * @param {number} props.size 最大上传文件的体量,如果不传则显示默认
 * @param {string} props.unit 最大上传文件的体量的单位,如果不传则显示默认
 * @param {number} props.num 上传图片数量
 */
export function UploadFileParams(props = {}){
	const commonProps = {
		allowType: [],
		accept: '',
		size: 2,
		unit: 'M',
        num: 1
	}
    const size = {
        k: 1024,
        m: 1024 * 1024
    }
	const fileType = {
		image: {
			allowType: ["png", "jpg", "jpeg"],
			accept: 'image/jpg, image/jpeg, image/png',
		},
		xls: {
			allowType: ["xls", "xlsx" ],
//			accept : '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		},
		audio: {
			allowType: ["mp3"],
			accept: 'audio/mpeg',
		},
	}
	const type = props.type;
	this.allowType = props.allowType || (fileType[type] && fileType[type].allowType) || commonProps.allowType;
	this.accept = props.accept || (fileType[type] && fileType[type].accept) || commonProps.accept;
	this.size = props.size || (fileType[type] && fileType[type].size) || commonProps.size;
	this.unit = props.unit || (fileType[type] && fileType[type].unit) || commonProps.unit;
	this.num = props.num || (fileType[type] && fileType[type].num) || commonProps.num;
	this.realSize = this.size * (size[this.unit.toLowerCase()] || 0);
}
