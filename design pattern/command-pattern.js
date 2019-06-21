/*
 * 命令模式
 */


/* 
 * demo1
 * 在大型项目中 分工明确 有绘制按钮的程序员 有实现按钮功能的程序员 两者相互不了解对方工作内容
 */
<html>
	<div>
		<button id = 'button'>按钮</button>
	</div>
</html>

<script type = 'text/javascript'>
	//绘制按钮，调用方法，他并不知道具体方法执行
	let button = document.getElementById('button');
	
	//菜单事件落地，只需要专注方法实现
	let MenuBar = {
		refresh : function(){
			console.info('刷新菜单界面')	
		}
	}
	
	//将按钮和其事件结合起来
	let RefreshMenuBarCommand = function(receiver){
		return function(){
			receiver.refresh();
		}
	}
	let setCommand = function(button, fn){
		button.onclick = function(){
			fn();
		}
	}
	setCommand(button, RefreshMenuBarCommand(MenuBar));
</script>

/* 
 * demo2
 * 宏命令
 * 万能遥控器 帮我们 关门 开电脑 登QQ
 */
let closeDoorCommand = {
	execute : function(){ console.info('关门') }
}
	
let openPcCommand = {
	execute : function(){ console.info('开电脑') }
}

let openQQCommand = {
	execute : function(){ console.info('上QQ') }
}

let MacroCommand = function(){
	return{
		commandList : [],
		add : function(command){
			this.commandList.push(command);
		},
		execute : function(){
			for(let i = 0 ; i < this.commandList.length ; i++){
				this.commandList[i].execute();	
			}
		}
	}
}

let macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();

