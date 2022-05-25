colors = ["#8AC8FF", "#FFEF8A", "#F85555", "#A389BE", "#F39450", "#F785A2"];

function switchColor(code) {
    document.getElementById("circle").style.backgroundColor = colors[code];
}

input.addEventListener("keyup", function(event) {
    if (event.code === "Enter") {
        event.preventDefault();
        document.getElementById("enter").click();
  }
});

let petName = "";

function setName(){
    petName = document.getElementById("input").value;
    document.getElementById("name").innerHTML = petName + "'s stats";
};

function changeToSecond(){
    let choices = document.getElementsByClassName('choices')[0];
    choices.style.display = 'none';
    let secondary = document.getElementsByClassName("second")[0]
    secondary.style.display = 'flex';
    let pet = document.getElementsByClassName("pet")[0];
    pet.style.top = '150px';
    pet.style.right = '220px';
    document.getElementById("ready").style.display = "none";
    Swal.fire({
        text: "This is your smiley " + petName + "!\nIt needs to be healthy to survive but needs to be happy and fed to be healthy.\nPlay with " + petName + " to boost happiness and feed it to keep the food levels up.",
        confirmButtonColor: "#b9d6a5",
        confirmButtonText: "Start",
        color: "#0b1708",
    });
    start();
}

let playStats = 100;
let healthStats = 100;
let foodStats = 100;
healthStats = (playStats + foodStats)/2;

const count1 = document.getElementById("mHappiness")
const count2 = document.getElementById("mFood")
const count3 = document.getElementById("mHealth")
const smile =  document.getElementById("smile");

interval = null;
interval2 = null;

count3.style.width = healthStats + "%";

function health(){
    healthStats = (playStats + foodStats)/2;
    count3.style.width = healthStats + "%";
    if(healthStats == 0){
        document.getElementById("btnPlay").disabled = 'true';
        document.getElementById("btnFeed").disabled = 'true';
        Swal.fire({
            text: "Your smiley " + petName + " has died. Refresh the page to play again!",
            confirmButtonColor: "#b9d6a5",
            confirmButtonText: "Ok",
            color: "#0b1708",
        });
    } else if(healthStats < 50){
        smile.innerHTML = ":  (";
    } else{
        smile.innerHTML = ":  )";
    }
}

function play(){
    if (playStats >= 100){
        playStats == 100;
    } else{
        playStats += 10;
        health();
    }
    clearInterval(interval);
    interval = setInterval(function() {
        if (playStats <= 0){
            playStats == 0;
        } else {playStats -= 10;
        count1.style.width = playStats + "%";
        health();
        }}, 2500)
    count1.style.width = playStats + "%";
};

function feed(){
    if (foodStats >= 100){
        foodStats == 100;
    } else{
        foodStats += 10;
        health();
    }
    clearInterval(interval2);
    interval2 = setInterval(function() {
        if (foodStats <= 0){
            foodStats == 0;
        } else {foodStats -= 10;
        count2.style.width = foodStats + "%";
        health();
        }}, 2500)
    count2.style.width = foodStats + "%";
}

function start(){
    play();
    feed();
    health();
};
