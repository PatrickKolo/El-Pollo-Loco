class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = []; // Bilderspeicher
    currentImage = 0;
    offset = { right: 0, left: 0, top: 0, bottom: 0 };


    //loadImage('img/Test.png')
    loadImage(path) {
        this.img = new Image(); // das gleiche wie this.img = document.getElementById('image') <img id="image".....
        this.img.src = path;
    }

    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss ) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    loadImages(arr) { // Array in die Funktion übergeben mit 6 verschiedenen Bildern allerdings als strings / Pfade
        arr.forEach((path) => { // 6x durch die schleife durch: 6 pfade = for each
            let img = new Image(); // Variable angelegt mit einem neuen Bild
            img.src = path; // Bild/Path wird in das Image Objekt geladen
            this.imageCache[path] = img; // ImageCache wird geupdatet und das erste Bild eingefügt
        });
    }


    setPercentage(percentage) {
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }

    
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