class GameEnd extends DrawableObject{

    IMAGE_LOST = 'img/9_intro_outro_screens/game_over/oh no you lost!.png'

    IMAGE_WON = 'img/9_intro_outro_screens/game_over/game over!.png'

    

    constructor() {

        super().loadImage(this.IMAGE_LOST)
        this.loadImage(this.IMAGE_WON)
    }

    wonGame() {
        stopInterval()
        document.getElementById('body').innerHTML =''
        document.getElementById('body').innerHTML += `
        <img class="game-over-img" src="img/9_intro_outro_screens/game_over/game over!.png">
        <a class="restart-btn-won" href="index.html">play again</a>
        `
    }

    lostGame() {
        stopInterval()
        document.getElementById('body').innerHTML =''
        document.getElementById('body').innerHTML += `
        <img class="game-over-img" src="img/9_intro_outro_screens/game_over/you lost.png">
        <a class="restart-btn-lost" href="index.html">play again</a>
        `
    }


    
}