class Endboss extends MovableObject {

    height = 400
    width = 250
    moveX
    energy = 25
    damage = 5

    IMAGES_NORMAL = [
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    endboss_dead_sound = new Audio('audio/sizzle.mp3')
    endboss_walking = new Audio('audio/ChickenBoss.mp3')

    constructor() {
        super().loadImage(this.IMAGES_NORMAL[0])
        this.loadImages(this.IMAGES_NORMAL)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_DEAD)
        this.y = 55
        this.x = 2500
        this.animate()
    }

    
    /**
     * animates the endboss
     */
    animate() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.animateEndbossDead()
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            }
            else if (this.energy <= 20 && this.energy >= 0) {
                this.animateEndbossWalking()
            }
            else if (this.energy >= 25) {
                this.playAnimation(this.IMAGES_NORMAL)
            }
        }, 200)
        this.animateEndbossMoving();
    }


    /**
     * plays the dead animation of the endboss
     */
    animateEndbossDead() {
        this.playAnimation(this.IMAGES_DEAD)
        clearInterval(this.moveX)
        playOrStopSound(this.endboss_dead_sound);
        this.endboss_walking.pause()
    }


    /**
     * plays the walking animation of the endboss
     */
    animateEndbossWalking() {
        this.playAnimation(this.IMAGES_WALKING)
        playOrStopSound(this.endboss_walking);
    }


    /**
     * enables the boss to move when first hit
     */
    animateEndbossMoving() {
        setStoppableInterval(() => {
            if (!this.isDead() && this.energy <= 20 && this.energy >= 0) {
                this.x -= 1.2
            }
        }, 1000 / 60)
    }
}