class Cactus extends MovableObject {
    width = 150;
    height = 200;
  

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 215
        this.x = x;
    }
}
