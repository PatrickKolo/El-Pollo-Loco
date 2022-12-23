class MovableObject extends DrawableObject {

    groundPosition = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    damage = 0.5;


    /**
     * defines the gravity for the game
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }


    /**
     * 
     * @returns the area above the ground
     */
    isAboveGround() {
        return this.y < this.groundPosition;
    }


    /**
     * defines when to objects objects are colliding with the character
     * @param {*} mo - movable object that collides with the character
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }


    /**
     * defines what happens when the character is hit. Substracts damage from energy
     */
    hit() {
        this.energy -= this.damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * sets the delay after the character is hit 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * 
     * @returns condition of death of the character
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * plays the animation for the movable objects 
     * @param {*} images - the images for the animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2......
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * enables movable object moving right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * enables movable object moving left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    
    /**
     * enables movable object jumping
     */
    jump() {
        this.speedY = 20;
    }
}


