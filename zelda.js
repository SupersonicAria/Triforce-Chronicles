let zelda = {
    hp: 250,
    strength: 8,
    magic: 22,
    luck: 0.35
}
let moth = {
    hp: 600,
    strength: 10,
    magic: 18,
    defense: 1
}
let zeldaHp
let mothHp
let enemyHp
let bombCount = 0
let crit = false
let playerTurn = true
let charge = false

let setupGame = function () {
    zeldaHp = document.getElementById('playerHp')
    zeldaHp.textContent = `Zelda\'s Hp:${zelda.hp}`

    mothHp = document.getElementById('enemyHp')
    mothHp.textContent = `Enemy Hp:${moth.hp}`
}



let attack = function () {

    moth.strength = 10
    moth.magic = 18

    if (moth.hp >= 1 && playerTurn && zelda.hp >= 1) {
        dealDamage(2, zelda, 'Zelda', zelda.strength, 1, true, 1, moth)

        checkEnemyHealth()

        if (moth.hp > 0) {
            passTurn()
        }
    }
}

let magic = function () {

    moth.strength = 10
    moth.magic = 18

    if (moth.hp >= 1 && playerTurn && zelda.hp >= 1) {
        dealDamage(2, zelda, 'Zelda', zelda.magic, 1, true, 1.2, moth)

        checkEnemyHealth()

        if (moth.hp > 0) {
            passTurn()
        }
    }
}

let arrow = function () {

    moth.strength = 10
    moth.magic = 18

    if (moth.hp >= 1 && playerTurn && zelda.hp >= 1) {

        // let roll = 0.97 * Math.floor(Math.random() * 34.37) * 0.03
        let roll = Math.floor(Math.random() * 34.37) * .03
        if (roll >= 1) {
            alert("Zelda\'s arrow hits it\'s mark!")
            moth.hp = moth.hp - moth.hp
            mothHp = document.getElementById('enemyHp')
            mothHp.textContent = `Enemy Hp:${moth.hp}`
            alert(`Zelda dealt 9999 damage!`)
        } else {
            alert("Mothula dodges the arrow...")
        }

        checkEnemyHealth()

        if (moth.hp > 0) {
            passTurn()
        }
    }
}

let naru = function () {

    moth.strength = 10
    moth.magic = 18

    alert("Zelda casts Naru\'s love!")
    alert("Zelda will not take damage this turn!")

    moth.strength = 0
    moth.magic = 0

    passTurn()

}

let passTurn = function () {
    let attackRoll = Math.floor(Math.random() * 5) + 1;


    if (!charge) {
        if (attackRoll == 1 || attackRoll == 2) {
            enemyAttack()
        }
        if (attackRoll == 3 || attackRoll == 4) {
            enemyMagic()
        }
        if (attackRoll == 5) {
            mothSpecial()
        }
    } else {
        mothUlt()
    }
}

let enemyAttack = function () {
    alert(`Mothula beats it\'s wings!`)

    takeDamage(4, 'Mothula', moth.strength, 1, zelda)

    checkZeldaHealth()
}

let enemyMagic = function () {
    alert(`Mothula shoots eye lasers!`)

    takeDamage(3, 'Mothula', moth.magic, 1, zelda)

    checkZeldaHealth()
}

let mothSpecial = function () {
    alert(`Mothula is charging a powerful attack...`)

    charge = true
}

let mothUlt = function () {
    alert('Mothula unleashes a hyper beam!')

    takeDamage(0.5, 'Mothula', moth.magic, 6, zelda)

    charge = false

    checkZeldaHealth()
}

let dealDamage = function (odds, player, playerName, stat, statBonus, luckCheck, luckOdds, enemy) {
    let roll = Math.floor(Math.random() * 6) + 1;
    let dmgCalc = roll / odds
    let appliedDmg = dmgCalc * stat * statBonus

    let isLuck = luckCheck
    if (isLuck) {
        let luckRoll = player.luck * Math.floor(Math.random() * 4.4) * luckOdds
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
    if (enemy.hp < 0) {
        enemy.hp = 0
    }
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

let takeDamage = function (odds, enemyName, stat, statBonus, player) {



    let roll = Math.floor(Math.random() * 6) + 1;
    let dmgCalc = roll / odds
    let appliedDmg = dmgCalc * stat * statBonus

    let integerCheck = appliedDmg % 1
    if (integerCheck != 0) {
        appliedDmg = Math.round(appliedDmg)
    }

    let trueDmg = player.hp - appliedDmg
    let startHp = player.hp
    player.hp = trueDmg
    if (player.hp < 0) {
        player.hp = 0
    }
    zeldaHp = document.getElementById('playerHp')
    zeldaHp.textContent = `Zelda\'s Hp:${player.hp}`

    let dmgTaken = startHp - trueDmg
    alert(`${enemyName} dealt ${dmgTaken} damage!`)
}

let loseGame = function () {
    let messageBox = document.createElement('div')
    messageBox.id = "message"
    let buttons = document.createElement('div')
    let battleBox = document.getElementById('battle')
    let moves = document.getElementById('moves')

    let loseMessage = document.createElement('h2')
    loseMessage.textContent = "You Lose..."
    loseMessage.id = "loseMessage"

    let retry = document.createElement('button')
    retry.innerHTML = "Retry"
    retry.onclick = function () {
        //Stack Overflow refresh page
        window.location.reload()
    }

    let charSelect = document.createElement('button')
    charSelect.innerHTML = "Return to Character Select"
    charSelect.onclick = function () {
        window.location.href = 'index.html'
    }

    moves.remove()
    buttons.appendChild(retry)
    buttons.appendChild(charSelect)
    messageBox.appendChild(loseMessage)
    messageBox.appendChild(buttons)
    battleBox.appendChild(messageBox)

}

let winGame = function () {
    let messageBox = document.createElement('div')
    messageBox.id = "message"
    let buttons = document.createElement('div')
    let battleBox = document.getElementById('battle')
    let moves = document.getElementById('moves')

    let winMessage = document.createElement('h2')
    winMessage.textContent = "You Win!!"
    winMessage.id = "winMessage"

    let charSelect = document.createElement('button')
    charSelect.innerHTML = "Return to Character Select"
    charSelect.onclick = function () {
        window.location.href = 'index.html'
    }

    moves.remove()
    buttons.appendChild(charSelect)
    messageBox.appendChild(winMessage)
    messageBox.appendChild(buttons)
    battleBox.appendChild(messageBox)
}


let checkZeldaHealth = function () {
    if (zelda.hp < 1) {
        alert(`Zelda\'s Hp has been reduced to 0...`)
        loseGame()
    }
}

let checkEnemyHealth = function () {
    if (moth.hp < 1) {
        alert(`Mothula has no Hp Left!`)
        winGame()
    }
}