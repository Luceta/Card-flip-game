const lineFriends = document.querySelector(".line");
const kaokaoFriends = document.querySelector(".kaokao");
const choiceScreen = document.querySelector(".choice-screen");
const container = document.querySelector(".container");


const colorList = ["red", "green", "yellow", "black", "blue", "beige", "red", "green", "yellow", "black", "blue", "beige"]
let clickedCards = [];
let answerCards = [];
let isSettingFinished = true;
let startTime;

function CardBoards(x, y) {
    this.x = x;
    this.y = y;
    this.size = function () {
        return x * y;
    }
    this.chracter = "";
}

CardBoards.prototype.genRandomIconsNumber = function () {
    const randomIcons = [];
    while (randomIcons.length !== 12) {
        const randomNumber = Math.floor(Math.random() * this.size());
        if (randomIcons.length != this.size()) {
            if (!randomIcons.includes(randomNumber)) {
                randomIcons.push(randomNumber);
            }
        }
    }
    return randomIcons.splice(6);
}

CardBoards.prototype.makeCardBackgrounds = function () {
    let selectedColors = [];
    let iconsList = [];
    let result = {};
    for (let i = 0; i < this.size(); i++) {
        const number = Math.floor(Math.random() * colorList.length);
        selectedColors = selectedColors.concat(colorList.splice(number, 1));
        iconsList = iconsList.concat(iconsCandidates.splice(number, 1));
    }
    result.backgroundColor = selectedColors;
    result.cardicons = iconsList;
    return result;
}

CardBoards.prototype.checkChracters = function () {
    if (this.x === 3 && this.y === 4) {
        return this.chracter = "kaokao";
    } return this.chracter = "line";
}



CardBoards.prototype.makeBoards = function (iconNumber) {
    let userChosenChracter = this.checkChracters();
    let backCardList = this.makeCardBackgrounds();
    let cardImageNumber = backCardList.cardicons;
    let cardBackgroundColor = backCardList.backgroundColor;

    isSettingFinished = false;
    for (i = 0; i < this.size(); i++) {
        const card = document.createElement("div");
        const cardInner = document.createElement("div");
        const cardFront = document.createElement("div");
        const cardBack = document.createElement("div");
        const cardImage = document.createElement("img");

        if (userChosenChracter === "kaokao") {
            cardImage.src = `images/kaokao/${cardImageNumber[i] + 1}.png`
            cardImage.className = "card-image";

        } else {
            cardImage.src = `images/linefriends/8-${cardImageNumber[i] + 1}.png`
            cardImage.className = "card-image";
        }

        card.className = "card";
        cardInner.className = "card-inner";
        cardFront.className = "card-front"
        cardBack.className = "card-back"
        cardBack.style.backgroundColor = cardBackgroundColor[i];

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        cardBack.appendChild(cardImage);
        container.append(card);
    }
}



let chracter = new CardBoards(3, 4);
const icons = chracter.genRandomIconsNumber();
const iconsCandidates = icons.concat(icons)


function setChracter(ev) {
    function choiceChracter(ev) {
        if (ev.target.className === "line") {
            container.dataset.id = "line";
        }
        choiceScreen.classList.add("start");
        container.classList.add("start");
    }
    choiceChracter(ev);
    if (container.dataset.id === "kaokao") {
        const kaokao = new CardBoards(3, 4);
        chracter = kaokao;
        kaokao.makeBoards();
        showCardAnswer();
    }
    else {
        const line = new CardBoards(4, 3);
        chracter = line;
        container.classList.add("line");
        line.makeBoards();
        showCardAnswer();
    }
}

container.addEventListener("click", function (ev) {
    let card = document.querySelectorAll(".card");
    if (isSettingFinished && !answerCards.includes("card")) {
        let eventLength = ev.path.length;
        if (eventLength === 8) {
            let card = ev.path[2];
            card.classList.add("flipped");
            clickedCards.push(card);

            if (clickedCards.length === 2) {
                let firstClickedCard = clickedCards[0].querySelector(".card-back").style.backgroundColor;
                let secondClickedCard = clickedCards[1].querySelector(".card-back").style.backgroundColor;
                if (firstClickedCard === secondClickedCard) {
                    answerCards.push(clickedCards[0]);
                    answerCards.push(clickedCards[1]);
                    clickedCards = [];
                    if (answerCards.length === 12) {
                        let finishedTime = new Date();
                        let showFinishedTime = Math.floor((finishedTime - startTime) / 1000);
                        alert('축하합니다! 성공! ' + showFinishedTime + '초 걸렸습니다.');
                        answerCards = [];
                        //초기화 작업 코드
                    }
                } else { //색깔이 다르면
                    isSettingFinished = false;
                    setTimeout(function () {
                        clickedCards[0].classList.remove("flipped");
                        clickedCards[1].classList.remove("flipped");
                        isSettingFinished = true;
                        clickedCards = [];
                    }, 1000);
                }
            }
        }
    }
})


function showCardAnswer() {
    let cards = document.querySelectorAll(".card");
    cards.forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add("flipped");
        }, 1000 + 100 * index);
    });
    setTimeout(function () { // 카드 감추기
        cards.forEach(function (card) {
            card.classList.remove('flipped');
        });
        isSettingFinished = true;
        startTime = new Date();
    }, 3000);
}


function init() {
    choiceScreen.addEventListener("click", setChracter);

}

init();

