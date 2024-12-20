$(".yellow").mouseover(function (event) {
  $(this).addClass("yellow_hover");
});

$(".yellow").mouseout(function () {
  $(this).removeClass("yellow_hover");
});

$(".green").mouseover(function () {
  $(this).addClass("green_hover");
});

$(".green").mouseout(function () {
  $(this).removeClass("green_hover");
});

$(".red").mouseover(function () {
  $(this).addClass("red_hover");
});

$(".red").mouseout(function () {
  $(this).removeClass("red_hover");
});

$(".blue").mouseover(function () {
  $(this).addClass("blue_hover");
});

$(".blue").mouseout(function () {
  $(this).removeClass("blue_hover");
});

var lose = false;
var seq = [],
  ans = [],
  level = 1;
var green_element = $(".green"),
  red_element = $(".red");
var yellow_element = $(".yellow"),
  blue_element = $(".blue");

var ava = ["g", "r", "y", "b"];

var paired = new Map([
  ["g", ["green_press",  new Audio("./Sound/Green.wav")]],
  ["r", ["red_press", new Audio("./Sound/Red.wav")]],
  ["y", ["yellow_press", new Audio("./Sound/Yellow.wav")]],
  ["b", ["blue_press", new Audio("./Sound/Blue.wav")]],
]);
var game_over = new Audio("./Sound/video-game-points-lost-retro-glitchedtones-1-00-01.mp3");

async function start_game(e) {
  lose = false;
  $(this).off("keypress");
  while (lose === false) {
    $(".box").off("mousedown");
    $("p").text("Level " + level);
    await new Promise(resolve => {setTimeout(resolve, 700)});
    let rand = Math.floor(Math.random() * ava.length);
    seq.push(ava[rand]); // ids of bot
    $("#" + ava[rand]).addClass(paired.get(ava[rand])[0]);
    await new Promise(resolve => {
      paired.get(ava[rand])[1].play();
      resolve();
    })
    setTimeout(function () {
        $("#" + ava[rand]).removeClass(paired.get(ava[rand])[0]);
    }, 250);
    await new Promise(resolve => {
        $(".box").mousedown(function (event) {
                $("#" + event.target.id).addClass(paired.get(event.target.id)[0])
                paired.get(event.target.id)[1].play();
                setTimeout(function() {
                    $("#" + event.target.id).removeClass(paired.get(event.target.id)[0])
                }, 250);
                ans.push(event.target.id); // ids of player
                if (ans[ans.length - 1] != seq[ans.length - 1]) {
                    lose = true;
                    resolve();
                }
                else if (ans.length === seq.length) {
                    resolve();
                }
    })
    });
    if (!lose) {
        level++;
        ans.length = 0;
    } 
    else {
        lose = true;
        level = 1;
        seq.length = 0;
        ans.length = 0;
        game_over.play();
        $("p").text("Game Over! Press A key to Restart");
        $("body").css("background-color", "red");
        setTimeout(function() {
            $("body").css("background-color", "#011f3f")
        }, 1000);

        $(this).keypress(start_game);
    }
  }
}
$(document).keypress(start_game);
