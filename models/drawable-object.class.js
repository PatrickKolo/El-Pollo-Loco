class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = []; // Bilderspeicher
    currentImage = 0;
    offset = { right: 0, left: 0, top: 0, bottom: 0 };



    /**
     * loads the images for the animation
     * @param {*} path - The Path of the targeted image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    
    /**
     * defines the position of the object/ image
     * @param {*} ctx - 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * defines the frame for collision checkingg
     * @param {*} ctx 
     */
    drawFrame(ctx) {
        if (this.canDrawFrame()) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * 
     * @returns all objects for the collision frames
     */
    canDrawFrame() {
        return this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof Coin;
    }


    /**
     * loads the Images in a loop from the Array for the animation
     * @param {*} arr - Array with the images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * sets the percentage for the 3 bars
     * @param {*} percentage - the percentage
     */
    setPercentage(percentage) {
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }


    /**
     * translates the percentage to the value
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5
        } else if (this.percentage >= 80) {
            return 4
        } else if (this.percentage >= 60) {
            return 3
        } else if (this.percentage >= 40) {
            return 2
        } else if (this.percentage >= 20) {
            return 1
        } else {
            return 0
        }
    }
}