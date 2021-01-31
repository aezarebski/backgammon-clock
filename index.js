
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
function refreshClockRed() {
    document.getElementById("playerRedTime").innerHTML = playerRedTime.toString();
}
function refreshClockWhite() {
    document.getElementById("playerWhiteTime").innerHTML = playerWhiteTime.toString();
}
function runTimerRed() {
    if (gameClockState == ClockState.PLAYERRED) {
        playerRedTime--;
        refreshClockRed();
        if (playerRedTime > 0) {
            var t = setTimeout(runTimerRed, 1000);
        }
        else {
            clockRanOut(1);
        }
    }
}
function runTimerWhite() {
    if (gameClockState == ClockState.PLAYERWHITE) {
        playerWhiteTime--;
        refreshClockWhite();
        if (playerWhiteTime > 0) {
            var t = setTimeout(runTimerWhite, 1000);
        }
        else {
            clockRanOut(2);
        }
    }
}
function clockRanOut(playerNumber) {
    gameClockState = ClockState.OFF;
    var message = (playerNumber == 1 ? "Red" : "White") + " player ran out of time!";
    document.getElementById("result").innerHTML = message;
}




function resultBox() {
    var rb = document.createElement("h1");
    rb.addClass("informationText");
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


$(document).ready(function(){
    console.log("hello world");

    $("#bgClock").append(playerBox("Red"),
                         playerBox("White"),
                         pauseButton(),
                         restartButton());

    $("#playerRedBox").click(function() {
        if (gameClockState == ClockState.PLAYERWHITE) {
            playerWhiteTime += numSecondsPerPlay;
            refreshClockWhite();
        }
        $("#playerRedName").attr("class", "playerRedOn");
        $("#playerRedTime").attr("class", "playerRedOn");
        $("#playerRedBox").attr("class", "playerRedBoxOn");
        $("#playerWhiteName").attr("class", "playerWhiteOff");
        $("#playerWhiteTime").attr("class", "playerWhiteOff");
        $("#playerWhiteBox").attr("class", "playerWhiteBoxOff");
        if (gameClockState != ClockState.PLAYERRED) {
            gameClockState = ClockState.PLAYERRED;
            console.log("starting player red timer");
            runTimerRed();
        }
    });

    $("#playerWhiteBox").click(function() {
        if (gameClockState == ClockState.PLAYERRED) {
            playerRedTime += numSecondsPerPlay;
            refreshClockRed();
        }
        $("#playerWhiteName").attr("class", "playerWhiteOn");
        $("#playerWhiteTime").attr("class", "playerWhiteOn");
        $("#playerWhiteBox").attr("class", "playerWhiteBoxOn");
        $("#playerRedName").attr("class", "playerRedOff");
        $("#playerRedTime").attr("class", "playerRedOff");
        $("#playerRedBox").attr("class", "playerRedBoxOff");
        if (gameClockState != ClockState.PLAYERWHITE) {
            gameClockState = ClockState.PLAYERWHITE;
            console.log("starting player white timer");
            runTimerWhite();
        }
    });

    console.log("setting the clocks to initial state");

    $("#playerRedName").attr("class", "playerRedOff");
    $("#playerRedTime").attr("class", "playerRedOff");
    $("#playerRedBox").attr("class", "playerRedBoxOff");
    $("#playerWhiteName").attr("class", "playerWhiteOff");
    $("#playerWhiteTime").attr("class", "playerWhiteOff");
    $("#playerWhiteBox").attr("class", "playerWhiteBoxOff");

    playerRedTime = numMinutes * 60;
    playerWhiteTime = numMinutes * 60;
    gameClockState = ClockState.OFF;
    document.getElementById("playerRedTime").innerHTML = playerRedTime.toString();
    document.getElementById("playerWhiteTime").innerHTML = playerWhiteTime.toString();
});

