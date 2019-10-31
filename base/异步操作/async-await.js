function levelOne(value){
    let newScore = value + 5;
    return new Promise(function(resolve){
        resolve(newScore);
    });
}

function levelTwo(value){
    let newScore = value + 10;
    return new Promise(function(resolve){
        resolve(newScore);
    });
}

function levelThree(value){
    let newScore = value + 30;
    return new Promise(function(resolve){
        resolve(newScore);
    });
}

// 只有aysnc函数内可以使用await语句
async function startGame(){
    let currentScore = 5;
    console.log('Game Started! Current score is ' + currentScore);

    currentScore = await levelOne(currentScore);
    console.log('You have reached Level One! New score is ' + currentScore);

    currentScore = await levelTwo(currentScore);
    console.log('You have reached Level Two! New score is ' + currentScore);

    currentScore = await levelThree(currentScore);
    console.log('You have reached Level Three! New score is ' + currentScore);
}

startGame();


//在async/await中的串行与并行

function getName () {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('tony')
        }, 2000)
    })
}
function getId () {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('123')
        }, 3000)
    })
}

//串行 等待时间之和后输出(等待5s)
(async function(){
    let name = await getName();
    let id = await getId();
    console.info(`name:${name}, id:${id}`)
})()

//并行 等待最长时间后输出(等待3s)
(async function(){
	//先 生成所有promise 实例
	let namePromise = getName();
    let idPromise = getId();
    let name = await namePromise;
    let id = await idPromise;
    console.info(`name:${name}, id:${id}`)
})()

//并行 等待最长时间后输出((等待3s)
(async function(){
	var result = await Promise.all([getName(), getId()])
    console.info(`name:${result[0]}, id:${result[1]}`)
})()
