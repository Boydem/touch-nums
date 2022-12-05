'use strict'

// Globals

var gIsGameOver
var firstLevel = 2
var gNums
var gBoardSize
var gSuccessCounter
var gTimerInterval
var gTimerCounter
var gStartTime
const elTimer = document.querySelector('.timer')
const elTable = document.querySelector('table')
const elNextLevelBtn = document.querySelector('.start-game-btn')
const elStats = document.querySelector('.stats')

// Funcs

function initGame() {
    gNums = createNumsArray(firstLevel ** 2)
    gBoardSize = Math.sqrt(gNums.length)
    renderBoard()
    gSuccessCounter = 0
    gTimerInterval = null
    gIsGameOver = false
    gTimerCounter = 0
    gStartTime

}


function onStartGameBtn(elBtn) {
    elTable.style.visibility = 'visible'
    elBtn.style.display = 'none'
    elStats.innerText = `LEVEL:${firstLevel-1}`
}

function renderBoard() {
    const nums = shuffle(gNums.slice())
    const elTableBody = document.querySelector('tbody')
    var strHTML = ''
    for (let i = 0; i < gBoardSize; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < gBoardSize; j++) {
            strHTML += `<td onclick="onTdClick(this)">${nums.pop()}</td>`
        }
        strHTML += `</tr>`
    }
    elTableBody.innerHTML = strHTML
}

function onTdClick(elTd) {
    var isRightNum = elTd.innerText === gNums[gSuccessCounter]
    if (isRightNum) {
        if (!gTimerInterval) gTimerInterval = setInterval(gTimerCounter, 10)
        elTd.style.backgroundColor = `rgb(0, 100, 100)`
        elTd.style.color = `white`
        gSuccessCounter++
    }
    if (gSuccessCounter === gNums.length) {
        // GameOver
        clearInterval(gTimerInterval)
        onLevelUp()
    }

}

function onLevelUp() {
    elTable.style.visibility = 'hidden'
    firstLevel++
    initGame()
    elNextLevelBtn.innerText = 'Level Up'
    elNextLevelBtn.style.display = 'block'
}

function createNumsArray(num) {
    var nums = []
    for (let i = 1; i <= num; i++) {
        nums.push(`${i}`)
    }
    return nums
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startTimer() {
    gTimerCounter++;

    //Format Time
    // let hrs = Math.floor(counter / 3600);
    // let mins = Math.floor((counter - (hrs * 3600)) / 60);
    // let secs = counter % 60;

    let mins = Math.floor(gTimerCounter / 6001);
    let secs = Math.floor((gTimerCounter - (mins * 6001)) / 100);
    let hundrth = gTimerCounter % 100;

    if (hundrth < 10) hundrth = '0' + hundrth;
    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;

    elTimer.innerText = `${mins}:${secs}:${hundrth}`;
}