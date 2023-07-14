let buttonColours = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false; 
let level = 0;


$(document).keydown(function() {
    if (!started) { 
 $("#level-title").text("level " + level);
 nextSequence();
 started = true; 
}
});

$(".btn").click(function(){  
   let userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   
  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
   checkAnswer(userClickedPattern.length-1);
})


//Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
       console.log("wrong");

       playSound("wrong");

       $("#level-title").text("Game Over, Press Any Key to Restart");

       $ ("body").addClass ("game-over");

       setTimeout(function() {
       $("body").removeClass("game-over");} , 200);

       startOver();

    }

}
function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor (Math.random() * 4 ) ; 
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

}


function playSound (name){

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {

 $("#" + currentColour).addClass("pressed");

 setTimeout(function() {
 $("#" + currentColour).removeClass("pressed");} , 100);
}



function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
    userClickedPattern = [];
}

