let score = 0;


// Question 1
function answer1(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 2
function answer2(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 3
function answer3(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 4
function answer4(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 5
function answer5(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 6
function answer6(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 7
function answer7(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 8
function answer8(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 9
function answer9(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Question 10
function answer10(answer, button) {

    if (answer == "correct") {
        button.className = "correct";
        score++;
    } else {
        button.className = "wrong";
    }
}


// Next question
function nextQuestion(number) {

    document.getElementById("q" + number).style.display = "none";

    document.getElementById("q" + (number + 1)).style.display = "block";
}


// Result
function showResult() {

    document.getElementById("q10").style.display = "none";

    document.getElementById("result").innerHTML =
        "Your Score is " + score + " / 10";
}
