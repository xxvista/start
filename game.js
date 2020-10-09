var buttonColors = ["black", "blue", "pink", "red", "yellow", "white"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var check = true;
var highScore = 1;


$(document).keypress(function() {
  checkClick();
  if (check===false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).click(function(event) {
  checkClick();
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  } else if (check===false) {
    wrong();
    started=false;
  }
});

$(".btn").click(function(event) {
  checkClick();
  if (!started && check === true) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    console.log("first click");
  } else if (check === false) {
    started = false;
    console.log("wrong click");
  } else {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("normal click");
  }
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 600);
    }
    console.log("true");
  } else {
    wrong();
  }
}

function wrong() {
  if (level>highScore) {
    highScore = level;
  }
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass('game-over');
  }, 150);
  $("#level-title").text("Game Over, Press to Restart");
  $("#click").text("Your High Score " + highScore);
  level = 0;
  gamePattern = [];
  check = false;
  console.log("wrong");
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  var i = level;
  $("#level-title").text("Level " + level);
  $("#click").text("Your High Score " + highScore);
  var randomNumber = Math.floor(Math.random() * 6);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  if (level !== 1) {
    var audio = new Audio("sounds/level-up.mp3");
    audio.play();
    $("#level-title").fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function() {
      // var i = level;
      // myLoop();
      (function myLoop(i) {
        setTimeout(function() {
          $("#" + gamePattern[gamePattern.length - i]).fadeIn(100).fadeOut(100).fadeIn(100);
          playSound(gamePattern[gamePattern.length - i]); //  your code here
          if (--i) myLoop(i); //  decrement i and call myLoop again if i > 0
        }, 400)
      })(level); //  pass the number of iterations as an argument
      i = level;
      // setTimeout(function(){
      //   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
      // }, i*500);
    }, 700);


  } else {
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass('pressed');
  }, 100);
}

function checkClick() {
  var text = $("#level-title").text();
  if (text === "Game Over, Press to Restart") {
    check = false;
  } else {
    check = true;
  }
  return check;
}

// function myLoop() {         //  create a loop function
//   setTimeout(function() {   //  call a 3s setTimeout when the loop is called
//     $("#" + gamePattern[gamePattern.length-i]).fadeIn(100).fadeOut(100).fadeIn(100);   //  your code here
//     i--;                    //  increment the counter
//     if (i >= 0) {           //  if the counter < 10, call the loop function
//       myLoop();             //  ..  again which will trigger another
//     }                       //  ..  setTimeout()
//   }, 1000)
// }

// function doSetTimeoutAnimate(i) {
//   setTimeout(function() {
//     $("#" + gamePattern[gamePattern.length-i]).fadeIn(100).fadeOut(100).fadeIn(100);
//     // playSound(gamePattern[gamePattern.length-i]);
//   }, 500);
// }
//
// function doSetTimeoutSound(i) {
//   setTimeout(function() {
//     playSound(gamePattern[gamePattern.length-i]);
//   }, 1000);
// }
//
// function doSetTimeout(i) {
//   setTimeout(function() {
//     doSetTimeoutAnimate(i);
//     doSetTimeoutSound(i);
//   }, 1500);
// }
