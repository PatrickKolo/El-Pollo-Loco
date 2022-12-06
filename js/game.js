let canvas;
let world;
level = level1;
let keyboard = new Keyboard();



function startGame() {
    initLevel()
    document.getElementById('body').innerHTML = ''
    document.getElementById('body').innerHTML += `

    <h1 class="headline">El Pollo Loco</h1>

    <div id="fullscreen">

        <canvas id="canvas" width="720" height="480">
            
            
        </canvas>

    </div>
    
    

    <div class="play-info">

    

        <div class="move-info left">
        <img class="cactus" src="img/play_info/sombrero1.png" alt="">
            <p>move left: <img class="arrow" src="img/play_info/arrow_left.ico" alt=""></p>

        </div>

        

        <div class="move-info right">
        <img class="cactus" src="img/play_info/sombrero1.png" alt="">
        <p>move right: <img class="arrow" src="img/play_info/arrow_right2.ico" alt=""></p>
        
        
        </div>

        

        <div class="move-info jump">
        <img class="cactus" src="img/play_info/sombrero1.png" alt="">
       
            <p>jump: <img class="arrow" src="img/play_info/arrow_up.ico" alt=""></p>
        </div>

        

        <div class="move-info throw">
        <img class="cactus" src="img/play_info/sombrero1.png" alt="">
        <p>throw bottle: D</p>
            
        </div>
        
    </div>

    
    `

    canvas = document.getElementById('canvas')
    world = new World(canvas, keyboard)


    console.log("My character is", world.character)

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

    document.getElementById('throw-bottle').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.D = true
    })

    document.getElementById('throw-bottle').addEventListener('touchend', (e) => {
        e.preventDefault()
        keyboard.D = false
    })

    document.getElementById('jump-up').addEventListener('touchstart', (e) => {
        e.preventDefault()
        keyboard.SPACE = true
    })

    document.getElementById('jump-up').addEventListener('touchend', (e) => {
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