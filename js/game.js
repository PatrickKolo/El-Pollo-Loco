let canvas;
let world;
level = level1;
let keyboard = new Keyboard();
let playSound = true;

game_sound = new Audio('audio/game_sound2.mp3');

function startGame() {
    initLevel()
    document.getElementById('body').innerHTML = ''
    document.getElementById('body').innerHTML += /*html*/`

    <h1 class="headline">El Pollo Loco</h1>

    <div id="fullscreen">
        <canvas id="canvas" width="720" height="480"></canvas>
    </div>
    
      <div class="play-info">
        <div class="move-info left" onclick="listenForTouches()">
        <img id="touch-move-left" class="cactus" src="img/play_info/sombrero1.png" alt="">
        <p>move left: <img class="arrow" src="img/play_info/arrow_left.ico" alt=""></p>
        </div>

        <div class="move-info right" onclick="listenForTouches()">
        <img id="touch-move-right" class="cactus" src="img/play_info/sombrero1.png" alt="">
        <p>move right: <img class="arrow" src="img/play_info/arrow_right2.ico" alt=""></p>
        </div>

        <div class="move-info jump" onclick="listenForTouches()">
        <img id="touch-jump" class="cactus" src="img/play_info/sombrero1.png" alt="">
        <p>jump: <img class="arrow" src="img/play_info/arrow_up.ico" alt=""></p>
        </div>

        <div  class="move-info throw" onclick="listenForTouches()">
        <img  id="touch-throw" class="cactus" src="img/play_info/sombrero1.png" alt="">
        <p>throw bottle: D</p>
        </div>
    </div>  
    <img onclick="openFullscreen()" class="fullscreen" src="img/play_info/fullscreen.ico" alt="">
    <img onclick="muteSounds()" id="sound" class="mute" src="img/play_info/volume.ico" alt="">
    `
    canvas = document.getElementById('canvas')
    world = new World(canvas, keyboard)
}



function openFullscreen() {
    let elem = document.getElementById("canvas");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


function muteSounds() {
    if (document.getElementById('sound').src = "img/play_info/volume.ico") {
        soundOff();
    } else {
        soundOn();
    }
}

function soundOff() {
    document.getElementById('sound').src = "img/play_info/mute.ico";
    playSound = false;

}

function soundOn() {
    document.getElementById('sound').src = "img/play_info/volume.ico";
    playSound = true;

}

function playOrStopSound(sound) {
    if (playSound) {
        sound.play();
    } else {
        sound.pause();
    }
}



window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

function listenForTouches() {
    document.getElementById('touch-move-left').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.LEFT = true
    })
    document.getElementById('touch-move-left').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.LEFT = false
    })
    document.getElementById('touch-throw').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.D = true
    })
    document.getElementById('touch-throw').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.D = false
    })
    document.getElementById('touch-jump').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.SPACE = true
    })
    document.getElementById('touch-jump').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.SPACE = false
    })
    document.getElementById('touch-move-right').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.RIGHT = true
    })
    document.getElementById('touch-move-right').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.RIGHT = false
    })
}