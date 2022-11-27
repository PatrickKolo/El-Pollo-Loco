class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = []; // Bilderspeicher
    currentImage = 0;



    
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

    loadImages(arr) { // Array in die Funktion übergeben mit 6 verschiedenen Bildern allerdings als strings / Pfade
        arr.forEach((path) => { // 6x durch die schleife durch: 6 pfade = for each
            let img = new Image(); // Variable angelegt mit einem neuen Bild
            img.src = path; // Bild/Path wird in das Image Objekt geladen
            this.imageCache[path] = img; // ImageCache wird geupdatet und das erste Bild eingefügt
        });
    }




}