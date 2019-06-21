/*
 * 享元模式
 */

/*
 * 事例：目前产品有50种男士内衣，50种女士内衣
 */

/*不使用享元模式，则需要50个男模特50个女模特*/

let Modal = function(sex, underware){
    this.sex = sex;
    this.underware = underware;
    this.takePhoto = function(){
        console.info('sex：' + this.sex, 'underware:' + this.underware)
    }
}

for(let i = 0 ; i < 50 ; i++){
    let modal = new Modal('male','underware_' + i);
    modal.takePhoto();
}

for(let i = 0 ; i < 50 ; i++){
    let modal = new Modal('female','underware_' + i);
    modal.takePhoto(); 
}


/*使用享元模式，只需要1个男模特，1个女模特*/
let Modal = function(sex, underware){
    this.sex = sex;
    this.takePhoto = function(){
        console.info('sex：' + this.sex, 'underware:' + this.underware)
    }
}

let maleModal = new Modal('male');
let femaleModal = new Modal('female');

for(let i = 0 ; i < 50 ; i++){
    maleModal.underware = 'underware_' + i;
    maleModal.takePhoto();
}

for(let i = 0 ; i < 50 ; i++){
    femaleModal.underware = 'underware_' + i;
    femaleModal.takePhoto();
}
