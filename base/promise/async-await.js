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
