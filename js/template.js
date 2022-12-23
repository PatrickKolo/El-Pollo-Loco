/**
 * 
 * @returns the loadscreen, the game info and the canvas
 */
function generateGameInfo() {
    return /*html*/`

    <div id="landscape-popup-bg">
        <div id="landscape-popup">
            <h2>Please rotate your device</h2>
        </div>
    </div>

    <h1 class="headline">El Pollo Loco</h1>
   
    <div class="canvas-body" id="fullscreen">

      <div class="load-screen" id="load-screen">
         <img class="loading-circle" src="img/play_info/loading-circle.gif" alt="">
         <p> Kill the Chicken!!</p>
         <img class="loadingChicken" src="img/4_enemie_boss_chicken/2_alert/G11.png" alt="">
      </div>

      <img onclick="openFullscreen()" class="fullscreen" src="img/play_info/fullscreen.ico" alt="">
      <img onclick="muteSounds()" id="sound" class="mute" src="img/play_info/volume.ico" alt="">

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


    `
}