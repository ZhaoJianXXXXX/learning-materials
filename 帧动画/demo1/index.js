let imgurl = '../image/rabbit-big.png';
let position = ['0,-854', '-174,-852','-349,-852', '-524,-852', '-698,-852', '-873,-848'];
let node = document.getElementById('rabbit');

animation(node, position, imgurl);

function animation(node, positions, imgurl){
	node.style.backgroundImage = `url(${imgurl})`;
	node.style.backgroundRepeat = 'no-repeat';
	let index = 0;
	function run(){
		let position = positions[index].split(',');
		node.style.backgroundPosition = `${position[0]}px ${position[1]}px`;
		index++;
		if(index >= positions.length){
			index = 0;
		}
		setTimeout(run, 80)
	}
	run();
}
