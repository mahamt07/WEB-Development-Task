var buttonBox = document.querySelector('.btns'),
    btns = document.querySelectorAll('.btns .btn'),
    x_turn = document.querySelector('.x_turn'),
    o_turn = document.querySelector('.o_turn'),
    showChange = document.querySelector('.showChange'),
    choose = document.querySelectorAll('.choose'),
    startingPage = document.querySelector('.starting_page'),
    winnerName = document.querySelector('.winnerName'),
    mainPage = document.querySelector('.main_page'),
    winnerPage = document.querySelector('.winner_page'),
    playAgainBtn = document.querySelector('.playAgainBtn'),
    ResetBtn = document.querySelector('.Reset'),
    timerAnimation = document.querySelector('.timer')


let changeTurn = false;
let hasWinner = false;
let turnTimer

function startTimer(){
    clearTimeout(turnTimer)
    resetAnimation()
    turnTimer = setTimeout(() => {
        changeTurn = !changeTurn
        updateTurnIndicator()
        startTimer()
    }, 4000)
}

function resetAnimation(){
    timerAnimation.style.animation = 'none';
    timerAnimation.offsetHeight;
    timerAnimation.style.animation = 'animate 4s linear forwards'
}

function updateTurnIndicator(){
    if(changeTurn){
        buttonBox.classList.remove('X')
        buttonBox.classList.add('O')
        timerAnimation.style.backgroundColor = '#600112'
        showChange.style.left = '155px'
        showChange.style.backgroundColor = "#000"
        o_turn.style.color = '#fff'
        x_turn.style.color = "transparent"
        x_turn.style.backgroundColor = "transparent"
        o_turn.style.backgroundColor = '#600112'
    } else{
        buttonBox.classList.remove('X')
        buttonBox.classList.add('O')
        timerAnimation.style.backgroundColor = '#000'
        showChange.style.left = '0'
        showChange.style.backgroundColor = "#000"
        o_turn.style.color = "transparent"
        x_turn.style.color = '#fff' 
        o_turn.style.backgroundColor = "transparent"
        x_turn.style.backgroundColor = '#000'
    }
}


choose.forEach(chooseNow => {
    chooseNow.addEventListener('click', ()=> {
        if(chooseNow.id == 'playerX'){
            changeTurn = false
            updateTurnIndicator()
        } else {
            changeTurn = true
            updateTurnIndicator()
        }
        startingPage.style.display = "none"
        mainPage.style.display = "block"
        startTimer() 
    })
})



btns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        if(btn.innerHTML === ""){
            if(!changeTurn){
                btn.innerHTML = 'X'
                btn.style.backgroundColor = '#000'
                btn.id = "X"
                btn.style.pointerEvents = "none"
                changeTurn = true
            } else{
                btn.innerHTML = 'O'
                btn.style.backgroundColor = '#600112'
                btn.id = "O"
                btn.style.pointerEvents = "none"
                changeTurn = false
            }
            updateTurnIndicator()
            startTimer()
            winningFunc()

            if(!hasWinner){
                drawFunc()
            }
        }
    })
})

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function winningFunc() {
    for(let a = 0; a <= 7; a++){
        let b = winningCombinations[a]

        if(btns[b[0]].id == "" || btns[b[1]].id == "" || btns[b[2]].id == ""){
            continue
        }

        else if(btns[b[0]].id == "X" && btns[b[1]].id == "X" && btns[b[2]].id == "X"){
            winnerName.innerHTML = `Player <span class="winnerText">X</span> Won The Game!`

            let winnerText = document.querySelector('.winnerText')

            winnerName.style.color = '#fff'
            winnerText.style.color = '#fff'
            playAgainBtn.style.backgroundColor = '#600112'
            hasWinner = true

            incrementWinCount("X")

            setTimeout(() => {
                mainPage.style.display = 'none'
                winnerPage.style.display = 'block'
            }, 300)
            clearTimeout(turnTimer) 
            break
        }

        else if(btns[b[0]].id == "O" && btns[b[1]].id == "O" && btns[b[2]].id == "O"){
            winnerName.innerHTML = `Player <span class="winnerText">O</span> Won The Game!`

            let winnerText = document.querySelector('.winnerText')

            winnerName.style.color = '#fff'
            winnerText.style.color = '#fff'
            playAgainBtn.style.backgroundColor = '#600112'
            hasWinner = true

            incrementWinCount("O")

            setTimeout(() => {
                mainPage.style.display = 'none'
                winnerPage.style.display = 'block'
            }, 300)
            clearTimeout(turnTimer) 
            break
        }
    }
}

function drawFunc() {
    if(!hasWinner && Array.from(btns).every(box => box.id != "")){
        winnerName.innerHTML = 'Match has been Drawn!'
        setTimeout(() => {
            mainPage.style.display = 'none'
            winnerPage.style.display = 'block'
        }, 300)
        clearTimeout(turnTimer) 
    }
}


function incrementWinCount(player){
    if(player === "X"){
        let xWins = document.getElementById('x_wins_count')
        xWins.innerHTML = parseInt(xWins.innerHTML) + 1
    }
    else if(player == "O"){
        let oWins = document.getElementById('o_wins_count')
        oWins.innerHTML = parseInt(oWins.innerHTML) + 1
    }
}


function resetGame(){
    changeTurn = false 
    hasWinner = false 

    winnerName.innerHTML = ""
    btns.forEach(btn => {
        btn.innerHTML = ""
        btn.id = ""
        btn.style.backgroundColor = ""
        btn.style.pointerEvents = "auto"
    })

    startingPage.style.display = "block"
    mainPage.style.display = "none"
    winnerPage.style.display = "none"
}

playAgainBtn.addEventListener('click', ()=> {
    resetGame()
})

function Reset(){
    let xWins = document.getElementById('x_wins_count')
    xWins.innerHTML = "0"
    let oWins = document.getElementById('o_wins_count')
    oWins.innerHTML = "0"
}

ResetBtn.addEventListener('click', ()=> {
    Reset()
})