let questions = [];
let trueButton = null;
let falseButton = null;
let count = 0;
let countPoint = 0;




function init() {

    // When the window loads, start to initialize the SDK
    console.log('Hello')
    const assets = [
    ];

    FBInstant.initializeAsync().then(function () {

        // We can start to load assets
        for (let i in assets) {
            // When preloading assets, make sure to report the progress
            FBInstant.setLoadingProgress(i / assets.length * 100);
        }

        // Now that assets are loaded, call startGameAsync
        FBInstant.startGameAsync().then(onStart);
    });


      
}

function onStart() {

    trueButton = document.querySelector("#trueButton");
    trueButton.addEventListener('click', compareTrueFalse);
    falseButton = document.querySelector("#falseButton");
    falseButton.addEventListener('click', compareTrueFalse);

    fetch("https://shikha-boro.github.io/LocalGyan/questions.json").then(responseReceived) 

    // This is called when the user has tapped Play
    // Information from the SDK can now be accessed
/*     $('#photo').attr('src', FBInstant.player.getPhoto());
    $('#player-name').html(FBInstant.player.getName());
    $('#player-id').html(FBInstant.player.getID());
    $('#context-type').html(FBInstant.context.getType());
    try {
        $('#entrypointdata').html(JSON.stringify(FBInstant.getEntryPointData()));
    } catch (e) {
        console.log(e);
    }
    $('#info-section').show(); */
}


function responseReceived(response) {
    response.json().then(responseBody)

}
function responseBody(body) {
    questions = body.questions;
    changeQuestion();
}



function compareTrueFalse(event) {
    let clickedButton = event.target;
    console.log(clickedButton);
    if (clickedButton.innerHTML == questions[count].answer) {
        console.log("correct");
        displayPoints();
        count++;
    }
    else {
        displayForIncorrect();
        count++;
    }

    if (count == questions.length) {
        document.getElementById("score").style.display = "block";
        document.getElementById("parent").style.display = "none";

        if (countPoint < 0) {
            document.querySelector("#countScore").value = 0;
        }
        else {
            document.querySelector("#countScore").value = countPoint;
        }
    } else {
        changeQuestion();
    }
}


window.addEventListener('load', init);


function changeQuestion() {
    questionDiv = document.querySelector("#question");
    questionDiv.innerHTML = (count + 1) + '. ' + questions[count].question;
}
function displayPoints() {
    countPoint = countPoint + 20;
    document.querySelector("#countPoint").value = countPoint;
    console.log(countPoint);
}
function displayForIncorrect() {
    countPoint = countPoint - 5;
    if (countPoint < 0) {
        document.querySelector("#countPoint").value = 0;
    }
    else {
        document.querySelector("#countPoint").value = countPoint;
        console.log(countPoint);
    }
}