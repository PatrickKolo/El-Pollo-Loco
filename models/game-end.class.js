class GameEnd extends DrawableObject {
    IMAGE_LOST = 'img/9_intro_outro_screens/game_over/oh no you lost!.png'
    IMAGE_WON = 'img/9_intro_outro_screens/game_over/game over!.png'
    gameSound = new Audio('audio/game_sound2.mp3');


    constructor() {
        super().loadImage(this.IMAGE_LOST)
        this.loadImage(this.IMAGE_WON)
        this.coinAmount

    }

    
    /**
     * shows the winning-endscreen when game is won
     */
    wonGame() {
        stopInterval()
        document.getElementById('body').innerHTML = ''
        document.getElementById('body').innerHTML += `
        <img class="game-over-img" src="img/9_intro_outro_screens/game_over/game over!.png">
        <a class="restart-btn-won" href="index.html">play again</a>
        `
    }


    /**
     * shows the losing-endscreen when game is lost
     */
    lostGame() {
        stopInterval()
        document.getElementById('body').innerHTML = ''
        document.getElementById('body').innerHTML += `
        <img class="game-over-img" src="img/9_intro_outro_screens/game_over/you lost.png">
        <a class="restart-btn-lost" href="index.html">play again</a>
        `
    }
}