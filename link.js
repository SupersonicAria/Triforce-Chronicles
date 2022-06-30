let link = {
    hp: 300,
    strength: 18,
    magic: 14,
    luck: 0.3
}
let helm = {
    hp: 600,
    strength: 20,
    magic: 14,
    defense: 0.5
}
let linkHp
let helmHp
let enemyHp
let bombCount = 0
let crit = false
let playerTurn = true



let setupGame = function () {

    let srt = document.getElementById('start')
    srt.remove()

    let tune = document.getElementById('music')
    tune.play()

    linkHp = document.getElementById('playerHp')
    linkHp.textContent = `Link\'s Hp:${link.hp}`

    helmHp = document.getElementById('enemyHp')
    helmHp.textContent = `Enemy Hp:${helm.hp}`

    let moves = document.getElementById('moves')

    let attk = document.createElement('button')
    attk.innerHTML = "Attack"
    attk.id = "attack"
    attk.onclick = function () {
        attack()
    }

    let mag = document.createElement('button')
    mag.innerHTML = "Magic"
    mag.id = "magic"
    mag.onclick = function () {
        magic()
    }

    let spn = document.createElement('button')
    spn.innerHTML = "Spin Attack"
    spn.id = "spin"
    spn.onclick = function () {
        spin()
    }

    let bmb = document.createElement('button')
    bmb.innerHTML = "Bomb Arrow"
    bmb.id = "bomb"
    bmb.onclick = function () {
        bomb()
    }

    let top = document.createElement('div')
    top.id = "top"
    let bottom = document.createElement('div')
    bottom.id = "bottom"

    top.appendChild(attk)
    top.appendChild(mag)
    bottom.appendChild(spn)
    bottom.appendChild(bmb)

    moves.appendChild(top)
    moves.appendChild(bottom)
}



let attack = function () {
    clearInfo()
    if (helm.hp >= 1 && playerTurn && link.hp >= 1) {
        dealDamage(2, link, 'Link', link.strength, 1, true, 1, helm)

        checkEnemyHealth()

        playAudio('attackSound')
    
        if (helm.hp > 0) {
            passTurn()
        }
    }
}

let magic = function () {
    clearInfo()
    if (helm.hp >= 1 && playerTurn && link.hp >= 1) {
        dealDamage(2, link, 'Link', link.magic, 1, true, 1.2, helm)

        checkEnemyHealth()

        playAudio('attackSound')

        if (helm.hp > 0) {
            passTurn()
        }
    }
}

let bomb = function () {
    clearInfo()
    if (helm.hp >= 1 && playerTurn && link.hp >= 1) {

        if (helm.defense <= 0.9) {
            dealDamage(2, link, 'Link', link.strength, .8, false, 1, helm)
            bombCount++
            if (bombCount == 1) {
                inform(`The Helmasaur\'s armor cracks...`)
            }
            if (bombCount == 2) {
                inform(`The Helmasaur\'s armor cracks some more...`)
            }
            if (bombCount == 3) {
                inform(`The Helmasaur is exposed!`)
                helm.defense = helm.defense + 0.5
                inform(`Enemy defense reduced!`)
            }

        } else {
            dealDamage(2, link, 'Link', link.strength, .8, false, 1, helm)
            inform(`Enemy defense cannot go any lower!`)
        }

        checkEnemyHealth()

        playAudio('bombSound')

        if (helm.hp > 0) {
            passTurn()
        }
    }
}

let spin = function () {
    clearInfo()
    inform("Link performs a spin attack!")
    dealDamage(2, link, 'Link', link.strength, 1.4, true, 2, helm)

    checkEnemyHealth()

    playAudio('spinSound')

    if (helm.hp > 0) {
        passTurn()
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
        helmSpecial()
    }
}

let enemyAttack = function () {
    inform(`The Helmasaur swings it\'s tail!`)

    takeDamage(4, 'The Helmasaur', helm.strength, 1, link)

    checkLinkHealth()
}

let enemyMagic = function () {
    inform(`The Helmasaur breathes fire!`)

    takeDamage(3, 'The Helmasaur', helm.magic, 1, link)

    checkLinkHealth()
}

let helmSpecial = function () {
    inform(`The Helmasaur charges with all it\'s might!`)

    if (bombCount < 3) {
        takeDamage(2, 'The Helmasaur', helm.strength, 2.2, link)
    } else {
        takeDamage(2, 'The Helmasaur', helm.strength, 0.5, link)
    }
    

    checkLinkHealth()

}

let dealDamage = function (odds, player, playerName, stat, statBonus, luckCheck, luckBonus, enemy) {
    let roll = Math.floor(Math.random() * 6) + 1;
    let dmgCalc = roll / odds
    let appliedDmg = dmgCalc * stat * statBonus

    let isLuck = luckCheck
    if (isLuck) {
        let luckRoll = player.luck * Math.floor(Math.random() * 4.77) * luckBonus
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
    linkHp = document.getElementById('playerHp')
    linkHp.textContent = `Link\'s Hp:${player.hp}`

    let dmgTaken = startHp - trueDmg
    inform(`${enemyName} dealt ${dmgTaken} damage!`)
}

let loseGame = function () {
    let tune = document.getElementById('music')
    tune.pause()
    tune.currentTime = 0

    let loseTune = document.getElementById('loseTune')
    loseTune.play()
    
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
    
    let tune = document.getElementById('music')
    tune.pause()
    tune.currentTime = 0

    let winTune = document.getElementById('winTune')
    winTune.play()

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
        window.location.href = 'index.html'
    }

    moves.remove()
    buttons.appendChild(charSelect)
    messageBox.appendChild(winMessage)
    messageBox.appendChild(buttons)
    battleBox.appendChild(messageBox)
}


let checkLinkHealth = function () {
    if (link.hp < 1) {
        inform(`Link\'s Hp has been reduced to 0...`)
        loseGame()
    }
}

let checkEnemyHealth = function () {
    if (helm.hp < 1) {
        inform(`The Helmasaur has no Hp Left!`)
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

let playAudio = function (song) {
    let music = document.getElementById(song)
    music.play()
}

//debug

console.log("I'm Here!!!")

