function calculateBMI() {

    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    height = height / 100;

    let bmi = weight / (height * height);

    bmi = bmi.toFixed(2);

    document.getElementById("result").innerHTML = "Your BMI is " + bmi;

    if (bmi < 18.5) {

        document.getElementById("message").innerHTML = "You are Underweight";

    } else if (bmi < 25) {

        document.getElementById("message").innerHTML = "You have Normal Weight";

    } else if (bmi < 30) {

        document.getElementById("message").innerHTML = "You are Overweight";

    } else {

        document.getElementById("message").innerHTML = "You are Underweight";

    }
}
