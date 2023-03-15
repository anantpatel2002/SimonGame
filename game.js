var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started)
    {
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnwer(userClickedPattern.length-1);
})

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnwer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("right");
        
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    }
    else
    {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
        
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}