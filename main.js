let fails = 0
const hangman = ["&nbsp;&nbsp;_____<br>", String.raw`&nbsp;&nbsp;|&nbsp;&nbsp;\|<br>`, "&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;|<br>", String.raw`&nbsp;/|\&nbsp;&nbsp;| <br>`, String.raw`&nbsp;/&nbsp;\&nbsp;&nbsp;| <br>`, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/|<br>", "=======<br>"]

function confirmSelection()  {
    const word = document.getElementById("WordInput").value.toLowerCase();
    const onlySelection = document.getElementById("onlySelection");
    const mainGame = document.querySelectorAll(".mainGame");
    clearErrors()
    clearInput()
    localStorage.setItem("word", word);
    localStorage.setItem("wrongAnswers", JSON.stringify([]));
    onlySelection.innerHTML = "";
    for (thingy of mainGame) {
        thingy.classList.remove("hidden");
    };
    let uscores = "";
    for (let i = 0; i < localStorage.getItem("word").length; i++) {
        uscores += "_ ";
    };
    document.getElementById("word").innerHTML = uscores;
    document.getElementById("errors").innerHTML = "";
};

function confirmAnswer() {
    let wrongAnswers = JSON.parse(localStorage.getItem("wrongAnswers"));
    const answer = document.getElementById("AnswerInput").value.toLowerCase();
    const word = localStorage.getItem("word");
    let uscores = document.getElementById("word").innerHTML;
    clearInput();

    if (answer.length != 1) {
        clearInput();
        clearErrors();
        document.getElementById("errors").innerHTML = "Bitte nur einen Buchstaben eingeben!";
        return;
    } 

    if ("abcdefghijklmnopqrstuvwxyzäöüß".indexOf(answer) == -1) {
        clearInput();
        clearErrors();
        document.getElementById("errors").innerHTML = "Bitte einen Buchstaben eingeben!";
        return;
    };

    if (wrongAnswers.includes(answer)) {
        clearInput()
        clearErrors()
        document.getElementById("errors").innerHTML = "Dieser Buchstabe ist nicht im Wort!"
        return
    }

    if (word.includes(answer)) {
        for (let i = 0; i < word.length * 2; i++) {
            if (word.charAt(i) == answer) {
                uscores = uscores.substr(0, i * 2) + answer + uscores.substr(i * 2 + 1);
            };
        };
        document.getElementById("word").innerHTML = uscores;

        if (!uscores.includes("_")) {
            const mainGame = document.querySelectorAll(".mainGame")
            for (thingy of mainGame) {
                thingy.classList.add("hidden")
            }
            document.getElementById("Message").innerHTML = "Du hast gewonnen! <br> <input type='button' value='Neues Spiel' onClick='window.location.reload(true)'>";
        };
    } else {
        document.getElementById("errors").innerHTML = "Buchstabe nicht im Wort!"
        wrongAnswers.push(answer)
        localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswers))
        document.getElementById("wrongAnswers").innerHTML = wrongAnswers.join(", ")
        fails += 1
        let hangmanOutput = document.getElementById("hangman").innerHTML
        hangmanOutput = hangmanOutput + hangman[fails - 1]
        document.getElementById("hangman").innerHTML = hangmanOutput
        if (fails >= 7) {
            const mainGame = document.querySelectorAll(".mainGame")
            for (thingy of mainGame) {
                thingy.classList.add("hidden")
            }
            document.getElementById("Message").innerHTML = "Du hast verloren! <br> <input type='button' value='Neues Spiel' onClick='window.location.reload(true)'>"
        }
    };
    clearInput()
    clearErrors()
};

function clearInput() {
    document.getElementById("AnswerInput").value = "";
    return;
};

function clearErrors() {
    document.getElementById("errors").innerHTML = "";
    return;
};