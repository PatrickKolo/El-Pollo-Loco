class Coin extends DrawableObject {
    height = 130
    width = 130
    img = 'img/8_coin/coin_1.png'


    constructor() {
        super().loadImage(this.img)
        this.x = 350 + Math.random() * 1800;
        this.y = 300 - Math.random() * 170
    }
}    