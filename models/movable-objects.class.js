class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = []; // Bilderspeicher
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    //loadImage('img/Test.png')
    loadImage(path) {
        this.img = new Image(); // das gleiche wie this.img = document.getElementById('image') <img id="image".....
        this.img.src = path;
    }

    loadImages(arr) { // Array in die Funktion übergeben mit 6 verschiedenen Bildern allerdings als strings / Pfade
        arr.forEach((path) => { // 6x durch die schleife durch: 6 pfade = for each
            let img = new Image(); // Variable angelegt mit einem neuen Bild
            img.src = path; // Bild/Path wird in das Image Objekt geladen
            this.imageCache[path] = img; // ImageCache wird geupdatet und das erste Bild eingefügt
        });
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length; // % = Modulu = Mathematische Rest //  let i = 7 % 6; => 1, Rest 1 
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2......
        let path = images[i]; // current Image ist beim ersten Durchlauf 0 also das 1. Bild des Arrays IMAGES_WALKING
        this.img = this.imageCache[path];
        this.currentImage++; // wird mit jedem Durchlauf um 1 erhöht
    }
    


    moveRight() {
        console.log('moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}