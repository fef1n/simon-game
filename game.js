buttonColours = ["red","blue","green","yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;
started = false;

$(document).on("keypress", function () { 
    if (started !== true) {
        nextSequence();
        started = true;
    }});

$(".btn").on("click", function () {
    if (started === true){
        userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    }});

function nextSequence(){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
}

function playSound(sound){
    buttonSound = new Audio("sounds/" + sound + ".mp3");
    buttonSound.play();
}  

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("h1").text("Game Over, Press Any Key to Restart.");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
        resetGame();
    }}

function resetGame(){
    started = false;
    level = 0;
    gamePattern = [];
}