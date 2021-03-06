$(function() {

  var questions = [
    {
      text: "I walk a lonely road, <br>the only one that I have ever known...",
      answerList: [ ["1901", "Phoenix"],
                    ["Rebellion", "Arcade Fire"],
                    ["Boulevard of Broken Dreams", "Green Day"],
                    ["Vertigo", "U2"] ],
      correctChoice: 2,
      imgName: "green_day"
    },
    {
      text: "Go, go, go, go go, go, go, shawty, <br>It's your birthday...", 
      answerList: [ ["In Da Club", "50 Cent"],
                    ["Poker Face", "Lady Gaga"],
                    ["Lose Yourself", "Eminem"], 
                    ["Jesus Walks", "Kanye West"] ],
      correctChoice: 0, 
      imgName: "50_cent"
    },
    {
      text: "Wait, they don't love you like I love you...",
      answerList: [ ["Hey Ya", "Outkast"],
                    ["Time to Pretend", "MGMT"],
                    ["Boulevard of Broken Dreams", "Green Day"],
                    ["Maps", "The Yeah Yeah Yeahs"] ],
      correctChoice: 3,
      imgName: "maps"
    },
    {
      text: "My baby don't mess around,<br>Because she loves me so,<br>And this I know for sho...",
      answerList: [ ["In Da Club", "50 Cent"],
                    ["Hey Ya", "Outkast"],
                    ["Crazy", "Gnarls Barkley"],
                    ["My Girls", "Animal Collective"] ],
      correctChoice: 1,
      imgName: "outkast"
    },
    {
      text: "I remember when,<br>I remember, I remember when I lost my mind...",
      answerList: [ ["Time to Pretend", "MGMT"],
                    ["Feel Good Inc.", "Gorillaz"],
                    ["Crazy", "Gnarls Barkley"],
                    ["Such Great Heights", "The Postal Service"] ],
      correctChoice: 2,
      imgName: "gnarls"
    }, 
    {
      text: "Counting all different ideas drifting away,<br>Past and present, they don't matter.<br>Now the future's sorted out...",
      answerList: [ ["1901", "Phoenix"],
                    ["Boulevard of Broken Dreams", "Green Day"],
                    ["Vertigo", "U2"],
                    ["Rebellion", "Arcade Fire"] ],
      correctChoice: 0,
      imgName: "phoenix"
    },
    {
      text: "Coming out of my cage,<br>And I've been doing just fine...",
      answerList: [ ["The Funeral", "Band of Horses"],
                    ["New Slang", "The Shins"],
                    ["Poker Face", "Lady Gaga"],
                    ["Mr. Brightside", "The Killers"] ],
      correctChoice: 3,
      imgName: "killers"
    },
    {
      text: "So if you're lonely,<br>You know I'm here waiting for you...",
      answerList: [ ["Such Great Heights", "The Postal Service"],
                    ["Take Me Out", "Franz Ferdinand"],
                    ["Float On", "Modest Mouse"],
                    ["Paper Planes", "M.I.A."] ],
      correctChoice: 1,
      imgName: "franz"
    },
    {
      text: "Sleeping is giving in,<br>No matter what the time is...",
      answerList: [ ["New Slang", "The Shins"],
                    ["Rebellion", "Arcade Fire"],
                    ["Jesus Walks", "Kanye West"],
                    ["Viva La Vida", "Coldplay"] ],
      correctChoice: 1,
      imgName: "funeral"
    },
    {
      text: "Gold teeth and a curse for this town,<br>Were all in my mouth...",
      answerList: [ ["New Slang", "The Shins"],
                    ["Mr. Brightside", "The Killers"],
                    ["Time to Pretend", "MGMT"],
                    ["Lose Yourself", "Eminem"] ],
      correctChoice: 0,
      imgName: "shins"
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

      $("#question").html(question.text);

      game.clicked = false;

      //for each possible answer, append answer text to corresponding div
      //if the answer is the correct one, give it class '.correct'
      for (var i = 0; i < 4; i++) {

        var $answer = $("#answer_list").children().eq(i);

        if (i === question.correctChoice) {
          $answer.addClass("correct");
        }

        //format the song title and artist 
        var answerString = '<h3>"' + question.answerList[i][0] + '"';
        answerString += ' by ';
        answerString += '<span class="artist">' + question.answerList[i][1] + '</span></h3>';

        $answer.html(answerString);
      }

      $("#question_screen").show();

    };

    this.intervalID;

    this.timeLeft;

    //starts timer and calls timeRanOut if time reaches 0
    this.timer = function() {
      var _this = this;
      _this.timeLeft = 15;
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

    this.remainingQuestions = 10;

    this.clicked = false;

    this.timeRanOut = function() {
      var correctAnswer = questions[game.currentQuestion - 1].answerList[questions[game.currentQuestion - 1].correctChoice];
      this.displayResult("Time Ran Out!", correctAnswer);
      this.questionOver(false, 3000);
    };

    //shows the result after user guesses answer, or if time runs out
    this.displayResult = function(str, correct) {
      var correctString = 'The answer was "' + correct[0] + '" by ' + correct[1] + '!';
      // $("#question_screen").hide();
      var $resultMessage = $("<p>");
      var $answerMessage = $("<p>");
      $resultMessage.text(str);
      $answerMessage.html(correctString);
      $answerMessage.addClass("answer-message");
      $resultMessage.addClass("result-message");
      if (str === "Incorrect!" || str === "Time Ran Out!") {
        $resultMessage.addClass("incorrect");
      }

      //create image with album pic
      var $pic = $("<img>");
      $pic.attr("src", "assets/images/" + questions[game.currentQuestion - 1].imgName + ".jpg");

      $("#img_info").append($pic);
      $("#img_info").append($answerMessage);
      $("#result_screen").prepend($resultMessage);
      setTimeout(function() {
        $("#question_screen").hide();
        $("#result_screen").show();
      }, 1000);
    }

    this.questionOver = function(correct, t) {
      if (correct) {
        this.score++;
      }
      var _this = this;
      setTimeout(function() {
        $.each($(".answer"), function( index, value ) {
          $(".answer").eq(index).empty();
          $(".answer").eq(index).removeClass("correct");
          $(".answer").eq(index).removeClass("correct-clicked");
          $(".answer").eq(index).removeClass("incorrect-clicked");
        });
        // console.log($("#result_screen").children().eq(0).text(""));
        $("#result_screen").children().eq(0).remove();
        $("#img_info").empty();
        $("#result_screen").hide();
        if (_this.remainingQuestions === 0) {
          _this.endGame();
          return false;
        }
        _this.buildQuestion(questions[_this.currentQuestion]);
        _this.timer();
      }, t);
      
    };

    this.endGame = function() {
      $.each($(".answer"), function( index, value ) {
        $(".answer").eq(index).empty();
        $(".answer").eq(index).removeClass("correct");
        $(".answer").eq(index).removeClass("correct-clicked");
        $(".answer").eq(index).removeClass("incorrect-clicked");
      });
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

  $(".answer").on("click", function() {
    clearInterval(game.intervalID);
    if (game.clicked) {
      return false;
    }
    game.clicked = true;

    var correctAnswer = questions[game.currentQuestion - 1].answerList[questions[game.currentQuestion - 1].correctChoice];

    if ($(this).hasClass("correct")) {
      $(this).addClass("correct-clicked");
      game.questionOver(true, 3000);
      game.displayResult("Correct!", correctAnswer);
    } else {
      $(this).addClass("incorrect-clicked");
      $(".correct").addClass("correct-clicked");
      game.questionOver(false, 3000);
      game.displayResult("Incorrect!", correctAnswer);
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