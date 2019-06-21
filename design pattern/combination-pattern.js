/*
 * 组合模式
 */

/* 
 * demo 1
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

/*
 * demo 2
 * 遥控器进阶
 */

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

/*打开空调*/
let openAcCommand = { 
	execute : function(){ console.info('开空调') },
	//假设该节点不允许添加子节点
	add : function(){ throw new Error('openAcCommand不允许添加子节点') }
}

/*电视和音响是连接在一起的，所以可以用一个宏命令组合打开电视音响*/
let openTvCommand = { execute : function(){ console.info('打开电视') } }
let openSoundCommand = { execute : function(){ console.info('打开音响') } }
let command1 = MacroCommand();
command1.add(openTvCommand);
command1.add(openSoundCommand);

/*关门 打开电脑 登陆QQ*/
let closeDoorCommand = { execute : function(){ console.info('关门') } }
let openPcCommand = { execute : function(){ console.info('开电脑') } }
let openQQCommand = { execute : function(){ console.info('登陆QQ') } }
let command2 = MacroCommand();
command2.add(closeDoorCommand);
command2.add(openPcCommand);
command2.add(openQQCommand);

/*总宏命令*/
let allCommand = MacroCommand();
allCommand.add(openAcCommand);
allCommand.add(command1);
allCommand.add(command2);

allCommand.execute();




















