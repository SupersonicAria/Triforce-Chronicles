let ganon = {
    hp: 500,
    strength: 22,
    magic: 20,
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
    ganonHp.textContent = `Ganon\'s Hp:${ganon.hp}`

    uncleHp = document.getElementById('enemyHp')
    uncleHp.textContent = `Enemy Hp:${uncle.hp}`
}



let attack = function () {
    clearInfo()
    if (uncle.hp >= 1 && playerTurn && ganon.hp >= 1) {
        dealDamage(2, ganon, 'Ganon', ganon.strength, 1, true, 1, uncle)
        
        if (shade) {
            shadeAttack()
        }

        checkEnemyHealth()

        if (uncle.hp > 0) {
            passTurn()
        }
    }
}

let magic = function () {
    clearInfo()
    if (uncle.hp >= 1 && playerTurn && ganon.hp >= 1) {
        dealDamage(2, ganon, 'Ganon', ganon.magic, 1, true, 1.2, uncle)

        if (shade) {
            shadeAttack()
        }

        checkEnemyHealth()

        if (uncle.hp > 0) {
            passTurn()
        }
    }
}

let fist = function () {
    clearInfo()
    if (uncle.hp >= 1 && playerTurn && ganon.hp >= 1) {

        inform(`Ganon delivers a devastating blow!`)

        if (uncle.defense <= 0.9) {
            dealDamage(2.5, ganon, 'Ganon', ganon.strength, 1.6, true, 1, uncle)
            uncle.defense = uncle.defense + 0.1
            inform(`Enemy defense reduced!`)
        } else {
            dealDamage(2.5, ganon, 'Ganon', ganon.strength, 1.5, true, 1, uncle)
            inform(`Enemy defense cannot go any lower!`)
        }

        if (shade) {
            shadeAttack()
        }

        checkEnemyHealth()

        if (uncle.hp > 0) {
            passTurn()
        }
    }
}

let summon = function () {
    clearInfo()
    if (!shade) {
        shade = true
        shadeCount = 5
        inform(`Shade Summoned!`)
        if (uncle.hp > 0) {
            passTurn()
        }
    } else {
        inform(`Ganon\'s shade has already been summoned...`)
        
        if (shade) {
            shadeAttack()
        }

        checkEnemyHealth()

        if (uncle.hp > 0) {
            passTurn()
        }
    }
}

let shadeAttack = function () {
    if (uncle.hp >= 1 && playerTurn && ganon.hp >= 1) {

        dealDamage(4, ganon, 'Ganon\'s shade', ganon.magic, 1, false, 1, uncle)

        if (shadeCount == 1) {
            shade = false
            inform(`Ganon\'s shade has disappeared...`)
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
    inform(`Link\'s Uncle attacks with his sword!`)

    takeDamage(4, 'Link\'s Uncle', uncle.strength, 1, ganon)

    checkGanonHealth()
}

let enemyMagic = function () {
    inform(`Link\'s Uncle casts a magic spell!`)

    takeDamage(3, 'Link\'s Uncle', uncle.magic, 1, ganon)

    checkGanonHealth()
}

let uncleSpecial = function () {
    inform(`Link\'s Uncle performs a spin attack!`)

    takeDamage(2, 'Link\'s Uncle', uncle.strength, 1.6, ganon)

    checkGanonHealth()
}

let dealDamage = function (odds, player, playerName, stat, statBonus, luckCheck, luckBonus, enemy) {

    
    //from codegrepper how to choose number between 1 and 6
    let roll = Math.floor(Math.random() * 6) + 1;
    let dmgCalc = roll / odds
    let appliedDmg = dmgCalc * stat * statBonus

    let isLuck = luckCheck
    if (isLuck) {
        let luckRoll = player.luck * Math.floor(Math.random() * 34.37) * luckBonus
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
        inform(`${playerName} dealt ${dmgTaken} damage!`)
    } else {
        inform(`${playerName} dealt ${dmgTaken} critical damage!`)
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
    ganonHp.textContent = `Ganon\'s Hp:${player.hp}`

    let dmgTaken = startHp - trueDmg
    inform(`${enemyName} dealt ${dmgTaken} damage!`)
}

let loseGame = function() {
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
    retry.id = "retry"
    retry.onclick = function () {
        //Stack Overflow refresh page
        window.location.reload()
    }

    let charSelect = document.createElement('button')
    charSelect.innerHTML = "Return to Character Select"
    charSelect.id = "charSelect"
    charSelect.onclick = function () {
        window.location.href='index.html'
    }

    moves.remove()
    buttons.appendChild(retry)
    buttons.appendChild(charSelect)
    messageBox.appendChild(loseMessage)
    messageBox.appendChild(buttons)
    battleBox.appendChild(messageBox)
    
}

let winGame = function() {
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
    charSelect.id = "charSelect"
    charSelect.onclick = function () {
        window.location.href='index.html'
    }

    moves.remove()
    buttons.appendChild(charSelect)
    messageBox.appendChild(winMessage)
    messageBox.appendChild(buttons)
    battleBox.appendChild(messageBox)
}


let checkGanonHealth = function() {
    if (ganon.hp < 1) {
        inform(`Ganon\'s Hp has been reduced to 0...`)
        loseGame()
    }
}

let checkEnemyHealth = function() {
    if (uncle.hp < 1) {
        inform(`Link\'s Uncle has no Hp Left!`)
        winGame()
    }
}

let createInfoBox =  async function (info) {
    let infoBox = document.createElement('div')
    infoBox.id = 'infoBox'
    infoBox.textContent = info
    return infoBox
}

let inform = async function (info) {
    let infoBox = await createInfoBox(info)
    let sideBox = document.getElementById('side')
    sideBox.appendChild(infoBox)
}

let clearInfo = function () {
    let sideBox = document.getElementById('side')
    sideBox.textContent = ""
}






























//Debug
let sayHey = function () {
    console.log("I'm Here!!!")
}

