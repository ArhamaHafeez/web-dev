let number = 0;

let count = document.getElementById("count");


function increase() {

    number = number + 1;

    count.innerHTML = number;
}


function decrease() {

    number = number - 1;

    count.innerHTML = number;
}


function reset() {

    number = 0;

    count.innerHTML = number;
}
