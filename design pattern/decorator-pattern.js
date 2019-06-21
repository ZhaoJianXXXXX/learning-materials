/*
 * 装饰者模式
 */

/*开发一款飞机大战，飞机可以升级，刚开始是子弹，然后导弹，然后原子弹...*/

/*写法1*/
function Plane(){}

Plane.prototype.fire = function(){ console.info('发射普通子弹') }

function MissileDecorator(plane){
    this.plane = plane; 
}

MissileDecorator.prototype.fire = function(){ this.plane.fire(); console.info('发射导弹') }

function AtomDecorator(plane){
    this.plane = plane;    
}

AtomDecorator.prototype.fire = function(){ this.plane.fire(); console.info('发射原子弹') }

let plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();           //发射普通子弹 发射导弹 发射原子弹

/*写法2*/
let plane = {
    fire : function(){ console.info('发射普通子弹') }
}

let missileDecorator = function(){ console.info('发送导弹') }

let atomDecorator = function(){ console.info('发送原子弹') }

let fire1 = plane.fire;

plane.fire = function(){
    fire1();
    missileDecorator();
}

let fire2 = plane.fire;

plane.fire = function(){
    fire2();
    atomDecorator();
}

plane.fire();           //发射普通子弹 发射导弹 发射原子弹