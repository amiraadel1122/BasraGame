$(document).ready(function() {

  /* Declaring Variables */
  Score = 0;
  var path = "images/cards/";
  var type = ".png";
  var suits = ["clubs", "diamonds", "hearts", "spades"];
  var names = ["jack", "king", "queen"];
  var fcDown = "images/facedown.png";
  var originalDeck = [];
  var deck = [];
  var onGround = [];
  var clickCounter = 0;
  //var playerScore = [];
  var compScore = 0;
  var playerScore = 0;

  /******** to make a deck of cards *********/
  for (var n = 1; n < 11; n++) { // for numbers
    for (var s = 0; s < suits.length; s++) { // for suits
      var imagesObj = {
        name: path + n + "_of_" + suits[s] + type,
        value: n
      }
      originalDeck.push(imagesObj);
    }
  }
  //console.log(deck);

  for (var s = 0; s < suits.length; s++) {

    for (var na = 0; na < names.length; na++) {
      var namesObj = {
        name: path + names[na] + "_of_" + suits[s] + type,
        value: names[na]
      }
      originalDeck.push(namesObj)
    }
  }
  deck = originalDeck.slice();
  console.log(deck)
  /********** TO SHUFFLE THE DECK **************/
  for (var i = 0; i < 4; i++) {
    var shuffle = Math.floor(Math.random() * deck.length);
    var rn = deck.splice(shuffle, 1); // not to repeat the shuffled cards
    /****** check if there is a jack ********/
    if (rn[0].value === "jack") {
      deck.push(rn); //if there is a jack push it on deck
      i--;

    } else {
      //select the class and show the cards on ground
      $(".game >div").eq(i).css("background-image", "url(" + rn[0].name + ")") // all div that it's parent is game
      $(".game >.card" + (
      i + 1)).attr("value", rn[0].value); // to set value attribute
      $(".game >.card" + (
      i + 1)).attr("name", rn[0].name);
      onGround.push($(".game > .card" + (
      i + 1))[0]);
    }
  }

  var randBtn = document.getElementById('btn');

  randBtn.addEventListener("click", function() {

    $('.aud1').attr('src', 'sounds/dist.wav')
    $(this).fadeOut(5000)
    setTimeout(function() {
      for (var i = 0; i < 8; i++) {

        var shuffle = Math.floor(Math.random() * deck.length);
        var rn = deck.splice(shuffle, 1)

        if (i < 4) { //distibute cards to computer
          $(".compCards >.card" + (
          i + 1)).css("background-image", "url(" + rn[0].name + ")");

          $(".compCards >.card" + (
          i + 1)).attr("value", rn[0].value);

          $(".compCards >.card" + (
          i + 1)).attr("name", rn[0].name);

        } else { //distribute cards to player
          $(".playerCards >.card" + (
          i - 3)).css("background-image", "url(" + rn[0].name + ")");
          $(".playerCards >.card" + (
          i - 3)).attr("value", rn[0].value);
          $(".playerCards >.card" + (
          i - 3)).attr("name", rn[0].name);
        }

      }
    }, 3000)

    clickCounter++; // count of pressing button
    if (clickCounter >= 6) { // make it disable after round 6
      randBtn.disabled = true;
      $(".card").fadeOut("1000");
    }
  })

  $(document.body).on("click", ".playerCards  div", function() {
    $('audio').attr("src", "sounds/card.wav")
    var currentValue = this.attributes["value"].value;
    var name = this.attributes["name"].value;
    $(".game").append(this);
    console.log($(".game div"));
    var x = ($(".game div").length) - 1
    console.log(x)

    var firstValue = 0;
    var secondValue = 0;
    var sum = 0;

    console.log(name + "  " + currentValue)

    if (currentValue == "jack" || name == "images/cards/7_of_diamonds.png") {
      console.log(onGround);
      playerScore += onGround.length + 1;
      onGround = [];
      $(".game div").fadeOut(1000, function() {
        this.remove();
      });

      console.log(onGround);
    } else {

      /*************** check of equal cards ****************/
      var tempScore = 0
      for (var i = 0; i < x; i++) {
        if ($(".game  div").eq(i).attr("value") == currentValue) {

          $(".game div").eq(x).addClass("match1").fadeOut(1000);
          var rank = -1;
          for (var j = 0; j < onGround.length; j++) {
            if (onGround[j].attributes["name"].value == $(".game  div").eq(i).attr("name")) {
              rank = j;
              break;
            }
          }
          console.log("rank is " + rank)
          $(".game  div").eq(i).fadeOut(1000, function() {
            this.remove();
          });

          onGround.splice(rank, 1);
          if (onGround.length == 0) {
            tempScore += 10;
            $('audio').attr("src", "sounds/basra.wav")
          }
          tempScore += 1

          //console.log(onGround);

          //break;
        }
      }
      var combination = [];
      function checkSum(start,prev){
        for (var i = 0; i < floor.length; i++) {

          str +=floor[i];
          combination.push(str);
          checkSum(i+1,str);
        }
      }

 // for (var i = 0; i < onGround.length; i++) {
 //        firstValue = onGround[i].attributes["value"].value;
 //        //console.log("FirstValue = "+firstValue)
 //        for (var j = i + 1; j < onGround.length; j++) {
 //          secondValue = onGround[j].attributes["value"].value;
 //          sum = parseInt(firstValue) + parseInt(secondValue);
 //          if (currentValue == sum) {
 //            console.log("double match")
 //            $("[name='" + this.attributes["name"].value + "']").addClass("match2").fadeOut(1000);
 //            $("[name='" + onGround[i].attributes['name'].value + "']").fadeOut(1000, function() {
 //              this.remove();
 //            });
 //            $("[name='" + onGround[j].attributes['name'].value + "']").fadeOut(1000, function() {
 //              this.remove();
 //            });
 //            break;
 //            playerScore += 2
 //          }
 //        }
 //      }
      //*****************************//

      if (this.attributes["class"].value.includes("match1")) {
        tempScore += 1
        this.remove(); // remove it from DOM

        console.log(onGround);
      } else {
        onGround.push(this);
        console.log(onGround);
      }
      //code goes here
      playerScore += tempScore;
    }

    $(".plScore").empty().html(playerScore);
    setTimeout(function() {
      compScore += computerTurn(onGround, deck)
    }, 2000)

  })

})

//******************************************************************************************************************//
function computerTurn(onGround, deck) {

  //debugger;
  var compCards = $(".compCards  div");
  $('audio').attr("src", "sounds/card.wav")
  var random = Math.floor(Math.random() * compCards.length);
  //console.log("Random "+shuffle);
  var currentValue = compCards.eq(random).attr("value");
  var name = compCards.eq(random).attr("value");
  $(".game").append(compCards.eq(random));
  var x = ($(".game div").length) - 1
  console.log(x)

  var firstValue = 0;
  var secondValue = 0;
  var sum = 0;

  console.log(name + "  " + currentValue)

  if (currentValue == "jack" || name == "images/cards/7_of_diamonds.png") {
    console.log(onGround);
    Score += (onGround.length) + 1;
    onGround = [];
    $(".game div").fadeOut(1000, function() {
      compCards[random].remove();
    });

    console.log(onGround);
  } else {

    /*************** check of equal cards ****************/
    var tempScore = 0
    for (var i = 0; i < x; i++) {
      if ($(".game  div").eq(i).attr("value") == currentValue) {

        $(".game div").eq(x).addClass("match1").fadeOut(1000);
        var rank = -1;
        for (var j = 0; j < onGround.length; j++) {
          if (onGround[j].attributes["name"].value == $(".game  div").eq(i).attr("name")) {
            rank = j;
            break;

          }
        }
        console.log("rank is " + rank)
        $(".game  div").eq(i).fadeOut(1000, function() {
          compCards[random].remove();
        });

        onGround.splice(rank, 1);
        if (onGround.length == 0) {
          tempScore += 10;
          $('audio').attr("src", "sounds/basra.wav")
        }
        tempScore += 1

        //console.log(onGround);

        //break;
      }
    }
    //*****************************//

    for (var i = 0; i < onGround.length; i++) {
      firstValue = onGround[i].attributes["value"].value;
      //console.log("FirstValue = "+firstValue)
      for (var j = i + 1; j < onGround.length; j++) {
        secondValue = onGround[j].attributes["value"].value;
        sum = parseInt(firstValue) + parseInt(secondValue);
        if (currentValue == sum) {
          console.log("double match")
          $("[name='" + compCards[random].attributes["name"].value + "']").addClass("match2").fadeOut(1000);
          $("[name='" + onGround[i].attributes['name'].value + "']").fadeOut(1000, function() {
            compCards[random].remove();
          });
          $("[name='" + onGround[j].attributes['name'].value + "']").fadeOut(1000, function() {
            compCards[random].remove();

          });
          break;
          playerScore += 2
        }
      }
    }
    //*****************************//

    if (compCards[random].attributes["class"].value.includes("match1")) {
      tempScore += 1
      compCards[random].remove(); // remove it from DOM

      console.log(onGround);
    } else {
      onGround.push(compCards[random]);
      console.log(onGround);
    }
    //code goes here
    Score += tempScore;
  }

  $(".coScore").empty().html(Score);

  var compCardsCheck = $(".compCards  div");
  console.log($(".compCards  div"))
  if (compCardsCheck.length <= 0) {
    createDivs();
    for (var i = 0; i < 8; i++) {
      var shuffle = Math.floor(Math.random() * deck.length);
      var rn = deck.splice(shuffle, 1);
      if (i < 4) { //distibute cards to computer
        $(".compCards >.card" + (
        i + 1)).css("background-image", "url(" + rn[0].name + ")");
        $(".compCards >.card" + (
        i + 1)).attr("value", rn[0].value);
        $(".compCards >.card" + (
        i + 1)).attr("name", rn[0].name);
      } else { //distribute cards to player
        $(".playerCards >.card" + (
        i - 3)).css("background-image", "url(" + rn[0].name + ")");
        $(".playerCards >.card" + (
        i - 3)).attr("value", rn[0].value);
        $(".playerCards >.card" + (
        i - 3)).attr("name", rn[0].name);
      }
    }
  }

}

function createDivs() {
  // console.log("dfdfdfdf");
  var Div1c = document.createElement('div');
  var Div2c = document.createElement('div');
  var Div3c = document.createElement('div');
  var Div4c = document.createElement('div');
  var Div1p = document.createElement('div');
  var Div2p = document.createElement('div');
  var Div3p = document.createElement('div');
  var Div4p = document.createElement('div');

  Div1c.className = 'card1';
  Div2c.className = 'card2';
  Div3c.className = 'card3';
  Div4c.className = 'card4';
  Div1p.className = 'card1';
  Div2p.className = 'card2';
  Div3p.className = 'card3';
  Div4p.className = 'card4';

  $(".compCards").append(Div1c);
  $(".compCards").append(Div2c);
  $(".compCards").append(Div3c);
  $(".compCards").append(Div4c);

  $(".playerCards").append(Div1p);
  $(".playerCards").append(Div2p);
  $(".playerCards").append(Div3p);
  $(".playerCards").append(Div4p);
}
