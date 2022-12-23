class Character extends MovableObject {
    height = 220;
    width = 120;
    y = 100;
    groundPosition = 200;
    speed = 6;
    otherDirection = false;


    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3')
    gameOver = new Audio('audio/gameOver.mp3');


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',

    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]
    world;

    offset = {
        top: 150,
        left: 60,
        right: 50,
        bottom: 0
    }



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.jump();
    }

/**
 * animates the Character
 */
    animate() {
        setStoppableInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);

        setInterval(() => {
            this.animateCharacter();
        }, 100);
    }

    /**
     * enables the character to move left to right and jumping as well as the camera follwing the character
     */
    moveCharacter() {
        this.walking_sound.pause();
        this.moveLeftOrRight()
        this.moveUp()
        this.cameraFollowsCharacter();
    }

/**
 * enables the camera to follow the character
 */
    cameraFollowsCharacter() {
        this.world.camera_x = -this.x + 100;
    }

/**
 * lets the character jump and plays the jumping sound
 */
    moveUp() {
        if (this.canJump()) {
            this.jump()
            playOrStopSound(this.jumping_sound);
        }
    }

/**
 * lets the character move left or right
 */
    moveLeftOrRight() {
        if (this.canMoveRight()) {
            this.walkRight();
        }

        if (this.canMoveLeft()) {
            this.walkLeft();
        }
    }

/**
 * lets the character move right, checks the direction and plays the walking sound
 */
    walkRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            playOrStopSound(this.walking_sound);
        }
    }

/**
 * lets the character move left, checks the direction and plays the walking sound
 */
    walkLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            playOrStopSound(this.walking_sound);
        }
    }

/**
 * animates the charcter when dead, hurt, jumping or sleeping
 */
    animateCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        }
        else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
        else if (this.isAboveGround() || this.speedY > 0) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
        else {
            this.animateWalkingOrSleeping();
        }
    }

/**
 * plays the animation when character is not moving
 */
    animateWalkingOrSleeping() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        else {
            this.playAnimation(this.IMAGES_IDLE)
        }
    }

/**
 * 
 * @returns checks the requirements for moving right
 */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
    }

/**
 * 
 * @returns checks the requirements for moving left
 */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0
    }

/**
 * 
 * @returns checks the requirements for moving right
 */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround()
    }

/**
 * 
 * @returns checks the requirements for moving right
 */
    noJump() {
        return !this.world.keyboard.SPACE && !this.isAboveGround()
    }

}