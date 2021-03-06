
// This is used as a way to specify which key starts the timer for each player.
var PlayerKey = {
    PLAYERRED: 114,
    PLAYERWHITE: 119
};
// This is used to specify which player's clock is currently running.
var ClockState = {
    OFF: 0,
    PLAYERRED: 1,
    PLAYERWHITE: 2
};
// The number of minutes allocated to each player at the start of the match.
var numMinutes = 3;
// The number of seconds that each player gets to make a move.
var numSecondsPerPlay = 15;
var playerRedTime;
var playerWhiteTime;
var gameClockState = ClockState.OFF;

function refreshClock(playerColour) {
    var clockId = "#player" + playerColour + "Time";
    var playerTime = playerColour == "Red" ? playerRedTime.toString() : playerWhiteTime.toString();
    $(clockId).text(playerTime);
}

function runTimerRed() {
    if (gameClockState == ClockState.PLAYERRED) {
        playerRedTime--;
        refreshClock("Red");
        if (playerRedTime > 0) {
            var t = setTimeout(runTimerRed, 1000);
        }
        else {
            clockRanOut("Red");
        }
    }
}
function runTimerWhite() {
    if (gameClockState == ClockState.PLAYERWHITE) {
        playerWhiteTime--;
        refreshClock("White");
        if (playerWhiteTime > 0) {
            var t = setTimeout(runTimerWhite, 1000);
        }
        else {
            clockRanOut("White");
        }
    }
}

function clockRanOut(playerColour) {
    gameClockState = ClockState.OFF;
    var message = playerColour + " player ran out of time!";
    console.log(message);
    $("#result").text(message);
}


function resultBox() {
    var rb = document.createElement("h1");
    rb.setAttribute("class", "informationText");
    rb.setAttribute("id", "result");
    return(rb);
}

function playerBox(playerTitle) {
    var playerTitleEl = document.createElement("h1");
    playerTitleEl.innerHTML = playerTitle;
    playerTitleEl.setAttribute("id", "player" + playerTitle + "Name");
    playerTitleEl.setAttribute("class", "player" + playerTitle + "Off");

    var playerTimeEl = document.createElement("p");
    playerTitleEl.setAttribute("id", "player" + playerTitle + "Time");
    playerTitleEl.setAttribute("class", "player" + playerTitle + "Off");

    var pb = document.createElement("div");
    pb.setAttribute("id", "player" + playerTitle + "Box");
    pb.setAttribute("class", "player" + playerTitle + "BoxOff");

    pb.append(playerTitleEl, playerTimeEl);
    return(pb);
}

function pauseButton() {
    var pbTitle = document.createElement("h1");
    pbTitle.innerHTML = "Pause";
    pbTitle.setAttribute("class", "informationText");
    var pb = document.createElement("div");
    pb.setAttribute("id", "pauseButton");
    pb.setAttribute("class", "informationBox");
    pb.append(pbTitle);
    return(pb);
}

function restartButton() {
    var rbTitle = document.createElement("h1");
    rbTitle.innerHTML = "Restart";
    rbTitle.setAttribute("class", "informationText");
    var rb = document.createElement("div");
    rb.append(rbTitle);
    rb.setAttribute("id", "restartButton");
    rb.setAttribute("class", "informationBox");
    return(rb);
}

function togglePlayer(colour, state) {
    var newState = "player" + colour + state;
    var newStateBox = "player" + colour + "Box" + state;
    $("#player" + colour + "Name").attr("class", newState);
    $("#player" + colour + "Time").attr("class", newState);
    $("#player" + colour + "Box").attr("class", newStateBox);
}

$(document).ready(function(){
    console.log("hello world");

    $("#bgClock").append(resultBox(),
                         playerBox("Red"),
                         playerBox("White"),
                         pauseButton(),
                         restartButton());

    $("#playerRedBox").click(function() {
        if (gameClockState == ClockState.PLAYERWHITE) {
            playerWhiteTime += numSecondsPerPlay;
            refreshClock("White");
        }
        togglePlayer("Red", "On");
        togglePlayer("White", "Off");
        if (gameClockState != ClockState.PLAYERRED) {
            gameClockState = ClockState.PLAYERRED;
            console.log("starting player red timer");
            runTimerRed();
        }
    });

    $("#playerWhiteBox").click(function() {
        if (gameClockState == ClockState.PLAYERRED) {
            playerRedTime += numSecondsPerPlay;
            refreshClock("Red");
        }
        togglePlayer("White", "On");
        togglePlayer("Red", "Off");
        if (gameClockState != ClockState.PLAYERWHITE) {
            gameClockState = ClockState.PLAYERWHITE;
            console.log("starting player white timer");
            runTimerWhite();
        }
    });

    $("#restartButton").click(function() {
        console.log("setting the clocks to initial state");
        togglePlayer("Red", "Off");
        togglePlayer("White", "Off");
        playerRedTime = numMinutes * 60;
        playerWhiteTime = numMinutes * 60;
        gameClockState = ClockState.OFF;
        document.getElementById("playerRedTime").innerHTML = playerRedTime.toString();
        document.getElementById("playerWhiteTime").innerHTML = playerWhiteTime.toString();
        $("#result").text("");
    });


    console.log("setting the clocks to initial state");

    togglePlayer("Red", "Off");
    togglePlayer("White", "Off");

    playerRedTime = numMinutes * 60;
    playerWhiteTime = numMinutes * 60;
    gameClockState = ClockState.OFF;
    document.getElementById("playerRedTime").innerHTML = playerRedTime.toString();
    document.getElementById("playerWhiteTime").innerHTML = playerWhiteTime.toString();
});

