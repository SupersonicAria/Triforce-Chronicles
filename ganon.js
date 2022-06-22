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
    defense: 0.5
}

let ganonHp
let uncleHp
let playerTurn = true
let shade
let shadeCount

let setupGame = function () {
    ganonHp = document.getElementById('playerHp')
    ganonHp.textContent = `Hp:${ganon.hp}`

    uncleHp = document.getElementById('enemyHp')
    uncleHp.textContent = `Enemy Hp:${uncle.hp}`
}

let attack = function () {
    if (uncle.hp >= 1 && playerTurn) {
        //from codegrepper how to choose number between 1 and 6
        let roll = Math.floor(Math.random() * 6) + 1;
        let dmgCalc = roll / 2
        let appliedDmg = dmgCalc * ganon.strength

        let luckRoll = ganon.luck * Math.floor(Math.random() * 33.4)
        if (luckRoll >= 1) {
            appliedDmg = appliedDmg * 2.5
            console.log("CRIT")
        }


        

        if (shade) {
            shadeAttack()
        }

        appliedDmg = appliedDmg * uncle.defense

        let integerCheck = appliedDmg % 1
        if (integerCheck != 0) {
            appliedDmg = Math.round(appliedDmg)
        }

        uncle.hp = uncle.hp - appliedDmg
        uncleHp = document.getElementById('enemyHp')
        uncleHp.textContent = `Enemy Hp:${uncle.hp}`
    }
}

let magic = function () {
    if (uncle.hp >= 1 && playerTurn) {
        let roll = Math.floor(Math.random() * 6) + 1;
        let dmgCalc = roll / 2
        let appliedDmg = dmgCalc * ganon.magic



        let luckRoll = ganon.luck * Math.floor(Math.random() * 33.4) * 1.2
        if (luckRoll >= 1) {
            appliedDmg = appliedDmg * 2.5
            console.log("CRIT")
        }

        if (shade) {
            shadeAttack()
        }

        

        appliedDmg = appliedDmg * uncle.defense

        let integerCheck = appliedDmg % 1
        if (integerCheck != 0) {
            appliedDmg = Math.round(appliedDmg)
        }

        uncle.hp = uncle.hp - appliedDmg
        uncleHp = document.getElementById('enemyHp')
        uncleHp.textContent = `Enemy Hp:${uncle.hp}`

        console.log("attack no shade: ", appliedDmg)
    }
}

let fist = function () {
    if (uncle.hp >= 1 && playerTurn) {
        let roll = Math.floor(Math.random() * 6) + 1;
        let dmgCalc = roll / 3
        let appliedDmg = dmgCalc * ganon.strength * 1.5

        let luckRoll = ganon.luck * Math.floor(Math.random() * 33.4)
        if (luckRoll >= 1) {
            appliedDmg = appliedDmg * 2.5
            console.log("CRIT")
        }


        

        if (shade) {
            shadeAttack()
        }

        appliedDmg = appliedDmg * uncle.defense

        let integerCheck = appliedDmg % 1
        if (integerCheck != 0) {
            appliedDmg = Math.round(appliedDmg)
        }

        uncle.hp = uncle.hp - appliedDmg
        uncleHp = document.getElementById('enemyHp')
        uncleHp.textContent = `Enemy Hp:${uncle.hp}`

        uncle.defense = uncle.defense + 0.1
    }
}

let summon = function(){
    if (!shade){
        shade = true
        shadeCount = 5
        console.log("shade summoned")
    }
    
}

let shadeAttack = function(){
    if (uncle.hp >= 1 && playerTurn) {
        //from codegrepper how to choose number between 1 and 6
        let roll = Math.floor(Math.random() * 6) + 1;
        let dmgCalc = roll / 4
        let shadeDmg = dmgCalc * ganon.strength


        shadeDmg = shadeDmg * uncle.defense

        let integerCheck = shadeDmg % 1
        if (integerCheck != 0) {
            shadeDmg = Math.round(shadeDmg)
        }

        uncle.hp = uncle.hp - shadeDmg
        uncleHp = document.getElementById('enemyHp')
        uncleHp.textContent = `Enemy Hp:${uncle.hp}`

        if (shadeCount == 1) {
            shade = false
        }

        shadeCount = shadeCount - 1
        console.log("shade", shadeDmg)
        console.log("shade count", shadeCount)

        
    }
}
































//Debug
let sayHey = function () {
    console.log("I'm Here!!!")
}

