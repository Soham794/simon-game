let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClicks = [];

let level = 0;
let start = false;

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(button){
    $("#"+button).addClass("pressed");
    setTimeout(function(){
        $("#"+button).removeClass("pressed");
    }, 100);
}

function restart(){
    level = 0;
    start = false;
    gamePattern = [];
    userClicks = [];
    $(document).keypress( function(event){
        start = true;
        // console.log(event.key);
        $(document).off("keypress");
        gameSequence();
    });
}

function nextSequence(){
    userClicks = [];
    level++;
    
    $("#level-title").text("Level " + level);
    
    let randomNumber = Math.floor(Math.random() * 4);

    let randomColor = buttonColors[randomNumber];

    gamePattern.push(randomColor);

    $("#"+randomColor).fadeOut(200).fadeIn(200);

    playSound(randomColor);

}

function gameOverScreen(){
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    return;
}

function checkAnswer(level){
    if(userClicks[level] === gamePattern[level]){
        if(userClicks.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 500);
        }
    }
    else{
        gameOverScreen();
        //
        $(".btn").off();
        //  
        restart();
    }
}


function gameSequence(){

    nextSequence();
    
    $(".btn").on("click", function(){        
        userClicks.push(this.id);
        playSound(this.id);
        animatePress(this.id);

        // console.log(gamePattern);
        // console.log(userClicks);

        checkAnswer(userClicks.length-1);
    });

}


restart();