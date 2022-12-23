class ThrowableObject extends MovableObject {
    groundPosition = 360
    breakbottle
    isBroken = false

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    ]


    constructor(x, y, otherDirection) {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0])
        this.loadImages(this.IMAGES_BOTTLE_ROTATION)
        this.loadImages(this.IMAGES_BOTTLE_SPLASH)
        this.x = x
        this.y = y
        this.otherDirection = otherDirection;
        this.height = 60
        this.width = 50
        this.throw()
    }


    throw() {
        this.speedY = 25;
        this.applyGravity()
        this.rotation()
    }




    rotation() {
        setStoppableInterval(() => {
            if (this.isAboveGround() && !this.isBroken) {

                if (this.otherDirection) {

                    this.playAnimation(this.IMAGES_BOTTLE_ROTATION)
                    this.x -= 10
                }
                else {

                    this.playAnimation(this.IMAGES_BOTTLE_ROTATION)
                    this.x += 10
                }


            }
        }, 25)
    }


    splash() {
        this.breakbottle = setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH)
            this.stopSplash()
        }, 25)
    }


    stopSplash() {
        setTimeout(() => {
            clearInterval(this.breakbottle)
        }, 500)
    }
}