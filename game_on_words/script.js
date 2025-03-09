document.addEventListener("DOMContentLoaded", function () {
    const wordText = document.querySelector(".word"),
        hintText = document.querySelector(".hint span"),
        timeText = document.querySelector(".time b"),
        inputField = document.querySelector("input"),
        refreshBtn = document.querySelector(".refresh-word"),
        checkBtn = document.querySelector(".check-word");

    let correctWord, timer;

    const initTimer = maxTime => {
        clearInterval(timer);
        timer = setInterval(() => {
            if (maxTime > 0) {
                maxTime--;
                timeText.innerText = maxTime;
            } else {
                clearInterval(timer);
                window.location.href = `output.html?status=timeout`;

            }
        }, 1000);
    };

    const initGame = () => {
        const randomObj = words[Math.floor(Math.random() * words.length)];
        const wordArray = randomObj.word.split("");
        for (let i = wordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
        wordText.innerText = wordArray.join("");
        hintText.innerText = randomObj.hint;
        correctWord = randomObj.word.toLowerCase();
        inputField.value = "";
        inputField.setAttribute("maxlength", correctWord.length);
        initTimer(30); 
    };

    const checkWord = () => {
        const userWord = inputField.value.trim().toLowerCase();
        if (userWord != correctWord) {
            
            window.location.href = `output.html?status=wrong&guessedWord=${userWord}`;
        } else {
            window.location.href = `output.html?status=correct&guessedWord=${correctWord}`;     
           }
    };

    initGame();

    refreshBtn.addEventListener("click", initGame);
    checkBtn.addEventListener("click", checkWord);
});
