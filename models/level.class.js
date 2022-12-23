class Level {
    enemies;
    clouds;
    backgroundObjects;
    cactus;
    coins;
    bottles;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, cactus, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.cactus = cactus;
        this.coins = coins;
        this.bottles = bottles;
    }
}