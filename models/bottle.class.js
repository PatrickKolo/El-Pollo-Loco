class Bottle extends MovableObject {

    height = 80
    width = 70
    y = 350
    amountBottles;

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ]


    constructor(){
        super().loadImage(this.IMAGES[0])
        this.loadImages(this.IMAGES)
        this.x = 200 + (Math.random()+ 0.05) * 2000;
    
    } 

}