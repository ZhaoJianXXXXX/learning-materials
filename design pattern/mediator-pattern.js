/*
 * 中介者模式
 * 作用：解除对象与对象之间的紧耦合关系，使网状的多对多关系变成了相对简单的一对多关系
 */

/*事例 泡泡堂游戏*/
/*e.g.1 非中介者模式*/
function Player(name){
    this.name = name;
    this.enemy = null;
}

Player.prototype.win = function(){ console.info(this.name + ' won') };
Player.prototype.lose = function(){ console.info(this.name + ' lost') };
Player.prototype.die = function(){ 
    this.lose();
    this.enemy.win();
};

let player1 = new Player('呆呆');
let player2 = new Player('小乖');

player1.enemy = player2;
player2.enemy = player1;

player1.die();              //呆呆 lose 小乖 won

/*e.g.2 人数增多 非中介者模式*/
//定义玩家列表
let players = [];

//玩家构造函数
function Player(name, teamColor){
    this.partners = [];         //队友列表
    this.enemies = [];          //敌人列表
    this.state = 'live';        //玩家状态
    this.name = name;           //玩家姓名
    this.teamColor = teamColor; //队伍颜色
}

Player.prototype.win = function(){ console.info('winner:' + this.name) };
Player.prototype.lose = function(){ console.info('loser:' + this.name) };
Player.prototype.die = function(){ 
    this.state = 'dead';         //玩家状态设置为死亡
    let all_dead = true;
    for(let i = 0 ; i < this.partners.length ; i++){        //遍历队友列表
        //如果有一个队友未死亡，则游戏还未失败
        if(this.partners[i].state !== 'dead'){ all_dead = false; break; }   
    }
    if(all_dead){       //如果队友全部阵亡
        this.lose();    //通知自己游戏失败
        for(let i = 0 ; i < this.partners.length ; i++){
            //通知所有队友失败
            this.partners[i].lose();   
        }
        for(let i = 0 ; i < this.enemies.length ; i++){
            //通知所有敌人胜利
            this.enemies[i].win();   
        }
    }
};

//定义工厂来创建玩家
function playFactory(name, teamColor){
    let newPlayer = new Player(name, teamColor);        //创建新玩家
    for(let i = 0 ; i < players.length ; i++){
        //通知所有玩家有新玩家加入
        if(players[i].teamColor === newPlayer.teamColor){
            //互相添加队友列表
            players[i].partners.push(newPlayer);        
            newPlayer.partners.push(players[i]);
        }else{
            //互相添加敌人列表
            players[i].enemies.push(newPlayer); 
            newPlayer.enemies.push(players[i]);
        }
    }
    players.push(newPlayer);
    
    return newPlayer;
}

//红队
let red1 = playFactory('小乖1','red');
let red2 = playFactory('小乖2','red');
let red3 = playFactory('小乖3','red');
let red4 = playFactory('小乖4','red');

//蓝队
let blue1 = playFactory('呆呆1','blue');
let blue2 = playFactory('呆呆2','blue');
let blue3 = playFactory('呆呆3','blue');
let blue4 = playFactory('呆呆4','blue');


/*e.g.3 人数增多成百上千并且支持倒戈，循环队友与敌人不现实 中介者模式*/
function Player(name, teamColor){
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive'
}
Player.prototype.win = function(){ console.info(this.name + ' won') };
Player.prototype.lose = function(){ console.info(this.name + ' lost') };
//玩家死亡
Player.prototype.die = function(){ 
    this.state = 'dead';
    playDirector.ReceiveMessage('playerDead', this);            //给中介者发消息，玩家死亡
};
//移除玩家
Player.prototype.remove = function(){ 
    playDirector.ReceiveMessage('removePlayer', this);          //给中介者发消息，移除玩家
};
//玩家倒戈
Player.prototype.changeTeam = function(color){ 
    playDirector.ReceiveMessage('changeTeam', this, color);     //给中介者发消息，玩家倒戈
};

//定义工厂创建玩家
function playFactory(name, teamColor){
    let newPlayer = new Player(name, teamColor);
    playDirector.ReceiveMessage('addPlayer', newPlayer);        //给中介者发消息，新建玩家
    return newPlayer;
}

//中介者
let playDirector = (function(){
    let players = {};       //保存所有玩家
    let operations = {};    //中介者可以执行的操作
    /*************新增一个玩家******************/
    operations.addPlayer = function(player){
        let teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || [];          //如果该颜色未成立队伍，则成立一个新队伍
        players[teamColor].push(player);
    }
    /*************移除一个玩家******************/
    operations.removePlayer = function(player){
        let teamColor = player.teamColor;                       //玩家的队伍颜色
        teamPlayers = players[teamColor] || [];                 //该队伍的所有成员
        for(let i = 0 ; i < teamPlayers.length ; i++){
            if(teamPlayers[i] === player){
                teamPlayers.splice(i,1);    
            } 
        }
		let allDead = true;
		for(let i = 0 ; i < teamPlayers.length ; i++){
            if(teamPlayers[i].state !== 'dead'){
                allDead = false;
				break;
            } 
        }
		//移除玩家需要判断剩余的玩家是否全部阵亡
		if(allDead){
			for(let i = 0 ; i < teamPlayers.length ; i++){
                teamPlayers[i].lose();      
            }
			for(let color in players){
				if(color !== teamColor){
                    let otherTeamPlayers = players[color];       //其他队伍的玩家
                    for(let i = 0 ; i < otherTeamPlayers.length ; i++){
                        otherTeamPlayers[i].win();   
                    }
				}
			}		
		}
    }
    /*************玩家倒戈*********************/
    operations.changeTeam = function(player, newTeamColor){
        operations.removePlayer(player);                        //移除原队伍中该玩家   
        player.teamColor = newTeamColor;        
        operations.addPlayer(player);                           //指定阵营添加该玩家
    }
    /*************玩家阵亡*********************/
    operations.playerDead = function(player){
        let teamColor = player.teamColor;
        let teamPlayer = players[teamColor];
        let all_dead = true;
        for(let i = 0 ; i < teamPlayer.length ; i++){
            if(teamPlayer[i].state !== 'dead'){
                all_dead = false;
                break;
            }
        }
        if(all_dead){
            for(let i = 0 ; i < teamPlayer.length ; i++){
                teamPlayer[i].lose();      
            }
            for(let color in players){
                if(color !== teamColor){
                    let teamPlayers = players[color];       //其他队伍的玩家
                    for(let i = 0 ; i < teamPlayers.length ; i++){
                        teamPlayers[i].win();   
                    }
                }   
            }
        }
    }
    
    let ReceiveMessage = function(){
        let message = Array.prototype.shift.call(arguments);    //arguments第一个参数为消息名称
        operations[message].apply(this, arguments);
    }
    
    return {
        ReceiveMessage  
    }
})()

//红队
let red1 = playFactory('小乖1','red');
let red2 = playFactory('小乖2','red');
let red3 = playFactory('小乖3','red');
let red4 = playFactory('小乖4','red');

//蓝队
let blue1 = playFactory('呆呆1','blue');
let blue2 = playFactory('呆呆2','blue');
let blue3 = playFactory('呆呆3','blue');
let blue4 = playFactory('呆呆4','blue');

red1.die();
red2.die();
red3.die();
red4.die();


