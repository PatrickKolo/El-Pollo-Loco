class MovableObject extends DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = []; // Bilderspeicher
    currentImage = 0;
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
        return this.y < 180;
    }

    //loadImage('img/Test.png')
    loadImage(path) {
        this.img = new Image(); // das gleiche wie this.img = document.getElementById('image') <img id="image".....
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character.iscolliding (chicken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
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



    loadImages(arr) { // Array in die Funktion übergeben mit 6 verschiedenen Bildern allerdings als strings / Pfade
        arr.forEach((path) => { // 6x durch die schleife durch: 6 pfade = for each
            let img = new Image(); // Variable angelegt mit einem neuen Bild
            img.src = path; // Bild/Path wird in das Image Objekt geladen
            this.imageCache[path] = img; // ImageCache wird geupdatet und das erste Bild eingefügt
        });
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


