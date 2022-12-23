let canvas;
let world;
level = level1;
let keyboard = new Keyboard();
let playSound = true;

gameSound = new Audio('audio/game_sound2.mp3');

/**
 * renders the canvas the loading screen and the game Infos
 */
function startGame() {
    initLevel();
    showLoadScreen();
    document.getElementById('body').innerHTML = ''
    document.getElementById('body').innerHTML += generateGameInfo();
    canvas = document.getElementById('canvas')
    world = new World(canvas, keyboard)
}

/**
 * shows the loading screen for 2 seconds
 */
function showLoadScreen() {
    setTimeout(() => {
        document.getElementById("load-screen").classList.add("d-none");
    }, 2000);
}

/**
 * checks the orientation of the display
 */
function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    }
    else {
        document.getElementById('canvas').style.height = `100%`;
    }
}


/**
 * enables fullscreen mode
 */
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


/**
 * function for muting the sounds in the game
 */
function muteSounds() {
     playSound ? soundOff() : soundOn();

}

/**
 * turns sound off and shows the mute icon
 */
function soundOff() {
    document.getElementById('sound').src = "img/play_info/mute.ico";
    playSound = false;
}

/**
 * turns sound on and shows the sound on icon
 */
function soundOn() {
    document.getElementById('sound').src = "img/play_info/volume.ico";
    playSound = true;
}

/**
 * function for muting and unmuting the sounds in the game
 * @param {*} sound - the game sound which should be muted or unmuted
 */
function playOrStopSound(sound) {
    playSound ? sound.play() : sound.pause()
}


/**
 * reads the keyboard input for game control
 */
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


/**
 * reads the keyboard input for game control
 */
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


/**
 * reads the touches on the control buttons for playing on mobile devices
 */
function listenForTouches() {
    touchMoveLeft();
    touchMoveRight();
    touchThrow();
    touchJump();
}

/**
 * reads the touches on the control buttons for playing on mobile devices
 */
function touchMoveLeft() {
    document.getElementById('touch-move-left').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.LEFT = true
    })
    document.getElementById('touch-move-left').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.LEFT = false
    })
}

/**
 * reads the touches on the control buttons for playing on mobile devices
 */
function touchMoveRight() {
    document.getElementById('touch-move-right').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.RIGHT = true
    })
    document.getElementById('touch-move-right').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.RIGHT = false
    })
}

/**
 * reads the touches on the control buttons for playing on mobile devices
 */
function touchThrow() {
    document.getElementById('touch-throw').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.D = true
    })
    document.getElementById('touch-throw').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.D = false
    })
}

/**
 * reads the touches on the control buttons for playing on mobile devices
 */
function touchJump() {
    document.getElementById('touch-jump').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.UP = true
    })
    document.getElementById('touch-jump').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.UP = false
    })
}


