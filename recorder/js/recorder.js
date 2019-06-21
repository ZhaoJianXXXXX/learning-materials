<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

<title>Recorder测试</title>

</head>

<body>
<script src="recorder.js"></script>


<style>
body{
	word-wrap: break-word;
}
</style>
<script src="https://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js"></script>

<script>
//兼容环境
function BuildHtml(html,o,notEncode,loop){return o||(o={}),html=(null==html?"":html+"").replace(/\{(fn:)?(:)?(.+?)\}/gi,function(a,b,c,code){try{var v=eval(b?code:"o."+code);return v=void 0===v?"":v+"",c||notEncode?v:v}catch(e){return console.log("BuildHtml Fail",a+"\n"+e.stack),""}}),loop&&/\{(fn:)?(.+?)\}/.test(html)&&(html=BuildHtml(html,o,notEncode,loop)),html};
function RandomKey(){
	return "randomkey"+(RandomKey.idx++);
};
RandomKey.idx=0;
</script>

<div>
	比特率:<input type="text" class="bit" value="16">kbps
	<div>
		<button class="Btn" onclick="recopen()">打开录音</button>
		<button class="Btn" onclick="recclose()">关闭录音</button>
	</div>
	<div>
		<button class="Btn" onclick="recstart()">录制</button>
		<button class="Btn" onclick="recstop()">停止</button>

		<button class="Btn" onclick="recpause()" style="margin-left:60px">暂停</button>
		<button class="Btn" onclick="recresume()">继续</button>
	</div>
	<div class="recpower">
		<div style="height:40px;width:300px;background:#999;position:relative;">
			<div class="recpowerx" style="height:40px;background:#0B1;position:absolute;"></div>
			<div class="recpowert" style="padding-left:50px; line-height:40px; position: relative;"></div>
		</div>
	</div>
	<div class="reclog"></div>
	<div class="recinfo"></div>
	<audio class="recPlay"></audio>
</div>
<script type="text/template" class="tp_recinfo">
<hr/>
浏览器环境情况:
<pre>
AudioContext:{fn:!!window.AudioContext}
webkitAudioContext:{fn:!!window.webkitAudioContext}
mediaDevices:{fn:!!navigator.mediaDevices}
mediaDevices.getUserMedia:{fn:!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}
navigator.getUserMedia:{fn:!!navigator.getUserMedia}
navigator.webkitGetUserMedia:{fn:!!navigator.webkitGetUserMedia}

UA:{fn:navigator.userAgent}
Recorder Last Modified:{fn:RecorderLM}
</pre>
</script>
<script>
var rec
function reclog(s){
	$(".reclog").prepend('<div>['+new Date().toLocaleTimeString()+']'+s+'</div>');
};
function recopen(){
	var bit=+$(".bit").val();
	rec=Recorder({bitRate:bit,onProcess:function(a,level,time){
		$(".recpowerx").css("width",level+"%");
		$(".recpowert").html(time+"/"+level);
	}});
	rec.open(function(){
		reclog("已打开:"+bit+"kbps");
	},function(e){
		reclog("打开失败："+e);
	});
};
function recclose(){
	if(rec){
		rec.close(function(){
			reclog("已关闭");
		});
	}
};
function recstart(){
	if(rec){
		rec.start();
		reclog("录制中...");
	};
};
function recpause(){
	if(rec){
		rec.pause();
		reclog("已暂停");
	};
};
function recresume(){
	if(rec){
		rec.resume();
		reclog("继续录音中...");
	};
};
var recblob={};
function recstop(){
	if(rec){
		var t1=Date.now();
		rec.stop(function(blob,time){
			var id=RandomKey(16);
			recblob[id]={blob:blob,rec:rec,time:time};
			reclog("已录制:编码耗时"+(Date.now()-t1)+"ms 比特率"+rec.set.bitRate+"kbps 文件大小"+blob.size+"b 音频时长"+time+'ms <button class="Btn BtnMinMin" onclick="recplay(\''+id+'\')">播放</button>');
		},function(s){
			reclog("失败："+s);
		});
	};
};
function recplay(key){
	var o=recblob[key];
	if(o){
		var audio=$(".recPlay")[0];
		if(!(audio.ended || audio.paused)){
			audio.pause();
		};
		audio.src=URL.createObjectURL(o.blob);
		audio.play();
		reclog("已播放"+o.blob.size+"b "+o.time+'ms '+o.rec.set.bitRate+'kbps');
	};
};
$(".recinfo").html(BuildHtml($(".tp_recinfo").html()));
reclog("点击打开录音开始哦");
</script>



</body>
</html>
