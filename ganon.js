let ganon = {
    hp: 400,
    strength: 20,
    magic: 18,
    luck: 0.03
}
let uncle = {
    hp: 800,
    strength: 18,
    magic: 12,
}

let ganonHp
let uncleHp

let setupGame = function(){
    ganonHp = document.getElementById('playerHp')
    ganonHp.textContent = `Hp:${ganon.hp}`

    uncleHp = document.getElementById('enemyHp')
    uncleHp.textContent = `Enemy Hp:${uncle.hp}`
}
    



































//Debug
let sayHey = function(){
    console.log("I'm Here!!!")
}

