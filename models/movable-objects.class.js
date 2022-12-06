class MovableObject extends DrawableObject {

    groundPosition = 0;

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }

    isAboveGround() {
            return this.y < this.groundPosition;
    }



    // character.iscolliding (chicken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    isCollidingCoin(coin) {
        return this.x + this.width > coin.x &&
            this.y + this.height > coin.y &&
            this.x < coin.x &&
            this.y < coin.y + coin.height;
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000;
        return timepassed < 1;

    }

    isDead() {
        return this.energy == 0;
    }




    playAnimation(images) {
        let i = this.currentImage % images.length; // % = Modulu = Mathematische Rest //  let i = 7 % 6; => 1, Rest 1 
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2......
        let path = images[i]; // current Image ist beim ersten Durchlauf 0 also das 1. Bild des Arrays IMAGES_WALKING
        this.img = this.imageCache[path];
        this.currentImage++; // wird mit jedem Durchlauf um 1 erhöht
    }



    moveRight() {
        this.x += this.speed;


    }

    moveLeft() {

        this.x -= this.speed;

    }

    jump() {
        this.speedY = 30;
    }
}


