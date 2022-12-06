class Coin extends CollactableItem {

    
    height = 120
    width = 120

    img = 'img/8_coin/coin_1.png'

    constructor() {
        super().loadImage(this.img)
        this.x = 200 + Math.random() * 2000;
        this.y = 280 - Math.random() * 200
    }

}    