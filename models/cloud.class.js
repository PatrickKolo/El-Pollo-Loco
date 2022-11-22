class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
   


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png', 'img/5_background/layers/4_clouds/2.png');


        this.x = Math.random() * 500; // Zahl zwischen 200 und 700
        this.animate();
    }


    animate() {  // reduziert die pixel auf der X Achse pro frame um 0,15 => 60 frames pro sekunde
        this.moveLeft();
    }


}