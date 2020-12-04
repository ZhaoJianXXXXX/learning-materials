主要偏向客户端的实现

Android:webview addJavascriptInterface(myJavascriptInterface, 'myFunction')

ios:

//将oc的block，注入给js当作函数
context[@ 'myFunction'] = ^(void){
	//do something
}
