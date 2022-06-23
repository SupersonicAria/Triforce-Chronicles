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
let enemyHp
let shade
let shadeCount
let crit = false
let playerTurn = true

let setupGame = function () {
    ganonHp = document.getElementById('playerHp')
    ganonHp.textContent = `Hp:${ganon.hp}`

    uncleHp = document.getElementById('enemyHp')
    uncleHp.textContent = `Enemy Hp:${uncle.hp}`
}

let attack = function () {
    if (uncle.hp >= 1 && playerTurn) {
        dealDamagePlayer(2, ganon, 'Ganon', ganon.strength, 1, true, 1, uncle)

        if (shade) {
            shadeAttack()
        }

        passTurn()
    }
}

let magic = function () {
    if (uncle.hp >= 1 && playerTurn) {
        dealDamagePlayer(2, ganon, 'Ganon', ganon.magic, 1, true, 1.2, uncle)

        if (shade) {
            shadeAttack()
        }

        passTurn()
    }
}

let fist = function () {
    if (uncle.hp >= 1 && playerTurn) {
        dealDamagePlayer(2.5, ganon, 'Ganon', ganon.strength, 1.5, true, 1, uncle)

        if (shade) {
            shadeAttack()
        }

        uncle.defense = uncle.defense + 0.1
        alert(`Enemy defense reduced!`)

        passTurn()
    }
}

let summon = function () {
    if (!shade) {
        shade = true
        shadeCount = 5
        alert(`Shade Summoned!`)
        passTurn()
    }
}

let shadeAttack = function () {
    if (uncle.hp >= 1 && playerTurn) {

        dealDamagePlayer(4, ganon, 'Shade', ganon.strength, 1, false, 1, uncle)

        if (shadeCount == 1) {
            shade = false
        }

        shadeCount = shadeCount - 1
        console.log("shade count", shadeCount)
    }
}

let passTurn = function () {
    let attackRoll = Math.floor(Math.random() * 5) + 1;

    if (attackRoll == 1 || attackRoll == 2) {
        enemyAttack()
    }
    if (attackRoll == 3 || attackRoll == 4) {
        enemyMagic()
    }
    if (attackRoll == 5) {
        uncleSpecial()
    }
}

let enemyAttack = function () {
    alert(`att!`)
}

let enemyMagic = function () {
    alert(`mag`)
}

let uncleSpecial = function () {
    alert(`spe`)
}

let dealDamagePlayer = function (odds, player, playerName, stat, statBonus, luckCheck, luckOdds, enemy) {
    //from codegrepper how to choose number between 1 and 6
    let roll = Math.floor(Math.random() * 6) + 1;
    let dmgCalc = roll / odds
    let appliedDmg = dmgCalc * stat * statBonus

    let isLuck = luckCheck
    if (isLuck) {
        let luckRoll = player.luck * Math.floor(Math.random() * 33.4) * luckOdds
        if (luckRoll >= 1) {
            appliedDmg = appliedDmg * 2.5
            console.log("CRIT")
            crit = true
        }
    }

    appliedDmg = appliedDmg * enemy.defense

    let integerCheck = appliedDmg % 1
    if (integerCheck != 0) {
        appliedDmg = Math.round(appliedDmg)
    }

    let trueDmg = enemy.hp - appliedDmg
    let startHp = enemy.hp
    enemy.hp = trueDmg
    enemyHp = document.getElementById('enemyHp')
    enemyHp.textContent = `Enemy Hp:${enemy.hp}`

    let dmgTaken = startHp - trueDmg
    if (!crit) {
        alert(`${playerName} dealt ${dmgTaken} damage!`)
    } else {
        alert(`${playerName} dealt ${dmgTaken} critical damage!`)
        crit = false
    }
}































//Debug
let sayHey = function () {
    console.log("I'm Here!!!")
}

