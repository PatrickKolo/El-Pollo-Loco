class SmallChicken extends MovableObject{
    height = 50;
    width = 55;
    y = 380;

    dead = false
    move
    animationWalking



    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    CHICKEN_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png']

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.CHICKEN_DEAD)
        this.x = 200 + Math.random() * 1500 // Zahl zwischen 200 und 1500
        this.speed = 0.15 + Math.random() * 0.25
        this.animate()
    }

    animate() {

        this.move =  setInterval( () => {
              this.x -= this.speed
          }, 1000 / 60)
  
        this.animationWalking  =  setInterval( () => {
              
              this.playAnimation(this.IMAGES_WALKING)
          }, 100)   
      }

    stopAnimation() {
        clearInterval(this.move)
        clearInterval(this.animationWalking)
    }

}