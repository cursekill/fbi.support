let transitionActive = false;
var song = document.getElementById("song");
var current_page = "main";

// ---------- FADE FUNCTIONS ----------
function fadeOutIn(callback, duration = 1000) {
    const fade = document.getElementById("fade");
    fade.style.pointerEvents = "all";
    fade.style.opacity = 1;

    setTimeout(() => {
        callback();
        fade.style.opacity = 0;

        setTimeout(() => {
            fade.style.pointerEvents = "none";
        }, duration);
    }, duration);
}

function fadeAndRun(func, speed = 1) {
    if (transitionActive) return;
    transitionActive = true;

    const fade = document.getElementById("fade");
    fade.style.transition = `opacity ${1/speed}s ease`;
    fade.style.pointerEvents = "all";
    fade.style.opacity = 1;

    setTimeout(() => {
        func();
        fade.style.opacity = 0;

        setTimeout(() => {
            fade.style.pointerEvents = "none";
            transitionActive = false;
        }, 1000/speed);
    }, 1000/speed);
}

// ---------- PAGE LOADING ----------
function startHome() {
    if (transitionActive) return;
    transitionActive = true;

    const displayText = document.querySelector('.display-text');
    displayText.style.opacity = 0;

    setTimeout(() => {
        displayText.innerHTML = getRandomSentence();
        displayText.style.opacity = 1;
        transitionActive = false;
    }, 2000);
}

function startPage() {
    const enterButton = document.getElementById("enter-container");
    const memberButtons = document.getElementById("member-container");
    const mainButtons = document.getElementById("main-container");
    const fade = document.getElementById("fade");

    // Hide enter button
    enterButton.style.display = "none";

    // Start fading
    fade.style.pointerEvents = "all";
    fade.style.opacity = 1;

    setTimeout(() => {
        memberButtons.style.display = "flex";
        mainButtons.style.display = "flex";

        requestAnimationFrame(() => {
            memberButtons.style.transition = "opacity 1s ease-in-out";
            memberButtons.style.opacity = 1;
            mainButtons.style.transition = "opacity 1s ease-in-out";
            mainButtons.style.opacity = 1;
        });

        fade.style.opacity = 0;
        fade.style.pointerEvents = "none";

        // Start home text
        setTimeout(startHome, 500);

        // Play random song
        playRandomSong();
    }, 1000);
}

// ---------- MEMBER BUTTONS ----------
function memberCall(pfpSrc, textContent, user) {
    const displayText = document.querySelector(".display-text");
    const pfpImage = document.getElementById("pfp-image");
    const randomGif = document.getElementById("random-gif");

    document.title = "@fbi.support; " + user;

    if (current_page !== "member") {
        current_page = "member";
        pfpImage.style.display = "block";
        pfpImage.style.opacity = 1;
        randomGif.style.display = "none";
    }

    displayText.innerHTML = textContent;
    pfpImage.src = pfpSrc;
}

function lsd() {
    memberCall(
        "assets/lsd_icon.png",
        "<a href='https://instagram.com/jayden19283' target='_blank' style='color: white;'>instagram</a>",
        "jayden"
    );
}

function curseexnt() {
    memberCall(
        "assets/valexnt_icon.png",
        "<a href='https://discord.com/users/1407836273758048448' target='_blank' style='color: white;'>discord</a>,",
        "curse"
    );
}

function loundra() {
    memberCall(
        "assets/l7_icon.png",
        "<a href='https://instagram.com/n/' target='_blank' style='color: white;'>instagram</a>",
        "leak"
    );
}



// ---------- CORE BUTTONS ----------
function updatePage(htmlContent, pageTitle) {
    const displayText = document.querySelector(".display-text");
    document.title = "@fbi.support; " + pageTitle;

    if (current_page !== "main") {
        current_page = "main";
        const randomGif = document.getElementById("random-gif");
        const pfpImage = document.getElementById("pfp-image");

        pfpImage.style.opacity = 0;
        randomGif.style.display = "block";
        randomGif.style.opacity = 1;
        displayText.innerHTML = htmlContent;
        pfpImage.style.display = "none";
    } else {
        displayText.innerHTML = htmlContent;
    }
}

function domains() {
    updatePage(
        "<a href='https://fbi.support/' target='_blank' style='color: white;'>fbi.support</a>, <a href='https://cybercrimin.al/' target='_blank' style='color: white;'>cybercrimin.al</a>, <a href='https://crime.sh/' target='_blank' style='color: white;'>crime.sh</a>",
        "projects"
    );
}




function about() {
    updatePage(
        "<a href='https://discord.gg/fbi.support' target='_blank' style='color: white;'>@fbi.support</a> is a fun website created by said 3 users above, also credits to flights.",
        "about"
    );
}





// ---------- OTHER ----------
function getRandomSentence() {
    const sentences = [
        "@ <a href='https://fbi.support' target='_blank' style='color: white;'>fbi.support</a>, a coterie"
    ];
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
}



var gifs = [
    "alakazam.gif","arceus.gif","articuno.gif","charizard.gif","darkrai.gif","dialga.gif",
    "dragonite.gif","entei.gif","garchomp.gif","gardevoir.gif","genesect.gif","gengar.gif",
    "giratina.gif","groudon.gif","ho-oh.gif","kyogre.gif","kyurem.gif","lugia.gif","mewtwo.gif",
    "moltres.gif","palkia.gif","raikou.gif","rayquaza.gif","reshiram.gif","scizor.gif",
    "suicune.gif","tyranitar.gif","venusaur.gif","zapdos.gif","zekrom.gif"
];

function setRandomGif() {
    var randomIndex = Math.floor(Math.random() * gifs.length);
    var randomGif = gifs[randomIndex];
    document.getElementById("random-gif").src = "assets/" + randomGif;

    document.body.setAttribute("data-current-gif", randomGif);

    updateButtonHoverColor();
}

function updateButtonHoverColor() {
    var currentGif = document.body.getAttribute("data-current-gif");
    var buttons = document.querySelectorAll(".buttons-container button");

    buttons.forEach(function(button) {
        button.setAttribute("data-gif", currentGif);
    });
}

setRandomGif();

// ---------- ENTER KEY MUSIC ----------
const songs = ["assets/song.mp3", "assets/song2.mp3", "assets/song3.mp3"];

function playRandomSong() {
    if (!song) return;

    const randomIndex = Math.floor(Math.random() * songs.length);
    song.src = songs[randomIndex];
    song.volume = 0.7;
    song.playbackRate = 1;

    song.play().catch(err => {
        console.log("Playback blocked, trying to resume after user click.");
        document.body.addEventListener('click', () => song.play(), { once: true });
    });
}

// Play song when Enter key is pressed
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        playRandomSong();
    }
});
