let boxes = document.querySelectorAll('.box')
let resetButton = document.querySelector('.reset-btn');
let newGameButton = document.querySelector('.newgame-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector(".msg");

let result = []
let count = 0;
let player0Turn = true

let winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]




boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count += 1;
        console.log(count)
        if (player0Turn) {
            box.classList.remove("green")
            box.classList.add("black")
            box.innerText = "X"
            player0Turn = false
        } else {
            box.classList.remove("black")
            box.classList.add("green")
            box.innerText = "O"
            player0Turn = true
        }
        box.disabled = true;
        let isWinner = checkWinner();
        if (count == 9 && !isWinner) {
            console.log(isWinner)
            drawMatch();
        }
    });

});

const showWinner = (winner) => {



    msg.innerText = `Congratulations! Winner is ${winner} `;
    msgContainer.classList.remove("hide");
    resetButton.classList.add("hide")

    disableBoxes();


}


const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}

const newGame = () => {
    count = 0;
    player0Turn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetButton.classList.remove("hide")

}

const enableBoxes = () => {

    clearInterval();
    for (box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }


}

const drawMatch = () => {
    msg.innerText = "Match Drawn!"
    msgContainer.classList.remove("hide");
    resetButton.classList.add("hide")
    disableBoxes();

}


const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let value1 = boxes[pattern[0]].innerText;
        let value2 = boxes[pattern[1]].innerText;
        let value3 = boxes[pattern[2]].innerText;

        if (value1 != "" && value2 != "" && value3 != "") {

            if (value1 === value2 && value2 === value3) {
                console.log("Winner", value1)
                showWinner(value1);
                return true;

            }
        }
    };
}

newGameButton.addEventListener("click", newGame);
resetButton.addEventListener("click", newGame);