$(function() {

  //object containing all questions/answers
  var questions = [
    {
      text: "I walk a lonely road, <br>the only one that I have ever known...",
      answerList: [ ["1901", "Phoenix"],
                    ["Rebellion", "Arcade Fire"],
                    ["Boulevard of Broken Dreams", "Green Day"],
                    ["Vertigo", "U2"] ],
      correctChoice: 2
    },
    {
      text: "Go, go, go, go go, go, go, shawty, <br>It's your birthday...", 
      answerList: [ ["In Da Club", "50 Cent"],
                    ["Poker Face", "Lady Gaga"],
                    ["Lose Yourself", "Eminem"], 
                    ["Jesus Walks", "Kanye West"] ],
      correctChoice: 0
    },
    {
      text: "Wait, they don't love you like I love you...",
      answerList: [ ["Hey Ya", "Outkast"],
                    ["Time to Pretend", "MGMT"],
                    ["Boulevard of Broken Dreams", "Green Day"],
                    ["Maps", "The Yeah Yeah Yeahs"] ],
      correctChoice: 3
    },
    {
      text: "My baby don't mess around,<br>Because she loves me so,<br>And this I know for sho...",
      answerList: [ ["In Da Club", "50 Cent"],
                    ["Hey Ya", "Outkast"],
                    ["Crazy", "Garls Barkley"],
                    ["My Girls", "Animal Collective"] ],
      correctChoice: 1
    },
    {
      text: "I remember when,<br>I remember, I remember when I lost my mind...",
      answerList: [ ["Time to Pretend", "MGMT"],
                    ["Feel Good Inc.", "Gorillaz"],
                    ["Crazy", "Garls Barkley"],
                    ["Such Great Heights", "The Postal Service"] ],
      correctChoice: 2
    }, 
    {
      text: "Counting all different ideas drifting away,<br>Past and present, they don't matter.<br>Now the future's sorted out...",
      answerList: [ ["1901", "Phoenix"],
                    ["Boulevard of Broken Dreams", "Green Day"],
                    ["Vertigo", "U2"],
                    ["Rebellion", "Arcade Fire"] ],
      correctChoice: 0
    },
    {
      text: "Coming out of my cage,<br>And I've been doing just fine...",
      answerList: [ ["The Funeral", "Band of Horses"],
                    ["New Slang", "The Shins"],
                    ["Poker Face", "Lady Gaga"],
                    ["Mr. Brightside", "The Killers"] ],
      correctChoice: 3
    },
    {
      text: "So if you're lonely,<br>You know I'm here waiting for you...",
      answerList: [ ["Such Great Heights", "The Postal Service"],
                    ["Take Me Out", "Franz Ferdinand"],
                    ["Float On", "Modest Mouse"],
                    ["Paper Planes", "M.I.A."] ],
      correctChoice: 1
    },
    {
      text: "Sleeping is giving in,<br>No matter what the time is...",
      answerList: [ ["New Slang", "The Shins"],
                    ["Rebellion", "Arcade Fire"],
                    ["Jesus Walks", "Kanye West"],
                    ["Viva La Vida", "M.I.A."] ],
      correctChoice: 1
    },
    {
      text: "Gold teeth and a curse for this town,<br>Were all in my mouth",
      answerList: [ ["New Slang", "The Shins"],
                    ["Mr. Brightside", "The Killers"],
                    ["Time to Pretend", "MGMT"],
                    ["Lose Yourself", "Eminem"] ],
      correctChoice: 0
    }
  ];

  $("#question_screen").hide();
  $("#end_screen").hide();
  $("#result_screen").hide();


  // game object constructor
  function Game() {

    this.score = 0;
    //index of questions array (0 indexed)
    this.currentQuestion = 0;
    //creates html for a given question
    this.buildQuestion = function(question) {

      var _this = this;

      _this.currentQuestion += 1;
      _this.remainingQuestions -= 1;

      //insert question text into #question div
      $("#question").html(question.text);

      game.clicked = false;

      //for each possible answer, create a div and append to #answer_list
      //if the answer is the correct one, give it class '.correct'
      for (var i = 0; i < 4; i++) {

        //create new div
        var $answer = $("<div>");

        //add the answer class
        $answer.addClass("answer");

        //if this is the correct answer, add class '.correct'
        if (i === question.correctChoice) {
          $answer.addClass("correct");
        }

        //format the song title and artist 
        var answerString = '"' + question.answerList[i][0] + '"';
        answerString += ' by ';
        answerString += '<span class="artist">' + question.answerList[i][1] + '</span>';

        //place answer string in div
        $answer.html(answerString);

        //append answer div to #answer_list
        $("#answer_list").append($answer);
      }

      //show the question screen
      $("#question_screen").show();

    };

    //interval id
    this.intervalID;

    //time remaining for current question
    this.timeLeft;

    //starts timer and calls timeRanOut if time reaches 0
    this.timer = function() {
      var _this = this;
      _this.timeLeft = 30;
      $("#time").text(_this.timeLeft);
      _this.intervalID = setInterval(function() {
        _this.timeLeft -= 1;
        if (_this.timeLeft === 0) {
          clearInterval(_this.intervalID);
          _this.timeRanOut();
        }
        $("#time").text(_this.timeLeft);
      }, 1000);
    };

    //remaining questions
    this.remainingQuestions = 10;

    this.clicked = false;

    this.timeRanOut = function() {
      var _this = this;
      _this.displayResult("Time Ran Out!");
      _this.questionOver(false);
    };

    //shows the result after time has ran out, or if user has guessed
    this.displayResult = function(str) {
      if (this.remainingQuestions === 0) {
        return false;
      }
      setTimeout(function() {
        $("#question_screen").hide();
        var message = str;
        var $resultMessage = $("<p>");
        $resultMessage.text(message);
        $resultMessage.addClass("result-message");
        if (str === "Incorrect!") {
          $resultMessage.addClass("incorrect");
        }
        $("#result_screen").append($resultMessage);
        $("#result_screen").show();
      }, 1500);
    }

    this.questionOver = function(correct) {
      // $("#answer_list").empty();

      var _this = this;
      if (correct) {
        _this.score++;
      }
      if (_this.remainingQuestions === 0) {
        setTimeout(function() {
        _this.endGame();
        return false;
        }, 1500);
      }
      //generate next question
      setTimeout(function() {
        $("#answer_list").empty();
        $("#result_screen").empty();
        $("#result_screen").hide();
        _this.buildQuestion(questions[_this.currentQuestion]);
        _this.timer();
      }, 4000);
      
    };

    this.endGame = function() {
      $("#answer_list").empty();
      $("#question_screen").hide();
      var message = "You guessed " + this.score + " answers correctly out of 10";
      var $scoreMessage = $("<p>");
      $scoreMessage.text(message);
      $scoreMessage.addClass("score-message");
      $("#score").append($scoreMessage);
      $("#end_screen").show();
    }

  }

  var game = new Game();

  $("#start").on("click", function() {
    $("#intro_screen").hide();
    game.buildQuestion(questions[0]);
    game.timer();
  });

  $("#answer_list").on("click", ".answer", function() {
    clearInterval(game.intervalID);
    if (game.clicked) {
      return false;
    }
    game.clicked = true;
    if ($(this).hasClass("correct")) {
      $(this).addClass("correct-clicked");
      game.displayResult("Correct!");
      game.questionOver(true);
    } else {
      $(this).addClass("incorrect-clicked");
      $(".correct").addClass("correct-clicked");
      game.displayResult("Incorrect!");
      game.questionOver(false);
    }
  });

  $("#restart_game").on("click", function() {
    game = new Game();
    game.buildQuestion(questions[0]);
    game.timer();
    $("#score").empty();
    $("#end_screen").hide()
  });


});