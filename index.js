
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

});

