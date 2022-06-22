let ganon = {
    hp: 400,
    strength: 20,
    magic: 16,
    luck: 0.03
}
let uncle = {
    hp: 800,
    strength: 18,
    magic: 12,
}

let ganonHp
let uncleHp
let playerTurn = true

let setupGame = function(){
    ganonHp = document.getElementById('playerHp')
    ganonHp.textContent = `Hp:${ganon.hp}`

    uncleHp = document.getElementById('enemyHp')
    uncleHp.textContent = `Enemy Hp:${uncle.hp}`
}

let attack = function(){
    if (uncle.hp >= 1 && playerTurn){
        //from codegrepper how to choose number between 1 and 6
        let roll = Math.floor(Math.random() * 6) + 1;
        let dmgCalc = roll/2
        let appliedDmg = dmgCalc * ganon.strength
        
        let luckRoll = ganon.luck * Math.floor(Math.random() * 33.4)
        if (luckRoll >= 1) {
            appliedDmg = appliedDmg * 2.5
            console.log("CRIT")
        }
        
        
        
        uncle.hp = uncle.hp - appliedDmg
        uncleHp = document.getElementById('enemyHp')
        uncleHp.textContent = `Enemy Hp:${uncle.hp}`
    }
}

let magic = function(){
    if (uncle.hp >= 1 && playerTurn){
        let roll = Math.floor(Math.random() * 6) + 1;
        let dmgCalc = roll/2
        let appliedDmg = dmgCalc * ganon.magic
        
        
        
        let luckRoll = ganon.luck * Math.floor(Math.random() * 33.4) * 1.2
        if (luckRoll >= 1) {
            appliedDmg = appliedDmg * 2.5
            console.log("CRIT")
        }

        let integerCheck = appliedDmg % 1
        if (integerCheck != 0) {
            appliedDmg = appliedDmg + 0.5
        }
        
        
        
        uncle.hp = uncle.hp - appliedDmg
        uncleHp = document.getElementById('enemyHp')
        uncleHp.textContent = `Enemy Hp:${uncle.hp}`
    }
}
    



































//Debug
let sayHey = function(){
    console.log("I'm Here!!!")
}

