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
    defense: 0.4
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
    if (uncle.hp >= 1 && playerTurn && ganon.hp >= 1) {
        dealDamage(2, ganon, 'Ganon', ganon.strength, 1, true, 1, uncle)

        

        passTurn()
    }
}

let magic = function () {
    if (uncle.hp >= 1 && playerTurn && ganon.hp >= 1) {
        dealDamage(2, ganon, 'Ganon', ganon.magic, 1, true, 1.2, uncle)

        

        passTurn()
    }
}

let fist = function () {
    if (uncle.hp >= 1 && playerTurn && ganon.hp >= 1) {

        if (uncle.defense <= 0.9) {
            dealDamage(2.5, ganon, 'Ganon', ganon.strength, 1.5, true, 1, uncle)
            uncle.defense = uncle.defense + 0.1
            alert(`Enemy defense reduced!`)
        } else {
            dealDamage(2.5, ganon, 'Ganon', ganon.strength, 1.5, true, 1, uncle)
            alert(`Enemy defense cannot go any lower!`)
        }

        

        passTurn()
    }
}

let summon = function () {
    if (!shade) {
        shade = true
        shadeCount = 5
        alert(`Shade Summoned!`)
        passTurn()
    } else {
        alert(`Shade has already been summoned...`)
        
        passTurn()
    }
}

let shadeAttack = function () {
    if (uncle.hp >= 1 && playerTurn && ganon.hp >= 1) {

        dealDamage(4, ganon, 'Shade', ganon.strength, 1, false, 1, uncle)

        if (shadeCount == 1) {
            shade = false
            alert(`The shade has disappeared...`)
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
    if (shade) {
        shadeAttack()
    }

    alert(`Link\'s Uncle attacks with his sword!`)

    takeDamage(4, 'Link\'s Uncle', uncle.strength, 1, ganon)

    checkGanonHealth()
}

let enemyMagic = function () {
    if (shade) {
        shadeAttack()
    }

    alert(`Link\'s Uncle casts a magic spell!`)

    takeDamage(3, 'Link\'s Uncle', uncle.magic, 1, ganon)

    checkGanonHealth()
}

let uncleSpecial = function () {
    if (shade) {
        shadeAttack()
    }

    alert(`Link\'s Uncle performs a spin attack!`)

    takeDamage(2, 'Link\'s Uncle', uncle.magic, 1.8, ganon)

    checkGanonHealth()
    
}

let dealDamage = function (odds, player, playerName, stat, statBonus, luckCheck, luckOdds, enemy) {
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
    ganonHp = document.getElementById('playerHp')
    ganonHp.textContent = `Hp:${player.hp}`

    let dmgTaken = startHp - trueDmg
    alert(`${enemyName} dealt ${dmgTaken} damage!`)
}

let loseGame = function() {
    let messageBox = document.createElement('div')
    let buttons = document.createElement('div')
    let battleBox = document.getElementById('battle')
    let moves = document.getElementById('moves')
    
    let loseMessage = document.createElement('h2')
    loseMessage.textContent = "You Lose..."

    let charSelect = document.createElement('button')
    charSelect.innerHTML = "Return to Character Select"
    charSelect.onclick = function () {
        window.location.href='index.html'
    }

    moves.remove()
    buttons.appendChild(charSelect)
    messageBox.appendChild(loseMessage)
    messageBox.appendChild(buttons)
    battleBox.appendChild(messageBox)
    
    

}

let winGame = function() {

}


let checkGanonHealth = function() {
    if (ganon.hp < 1) {
        loseGame()
    }
}




























//Debug
let sayHey = function () {
    console.log("I'm Here!!!")
}

