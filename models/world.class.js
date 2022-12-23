class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    scoreCoins = 0;
    lastThrow;
    statusBar = new StatusBar()
    coinBar = new CoinBar()
    bottleBar = new BottleBar()
    coinAmount = 0
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),]
    bottleAmount = 0
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()]
    throwableObjects = []
    playSound = true;


    chicken = new Chicken()
    SmallChicken = new SmallChicken()
    endBoss = level1.enemies[level1.enemies.length - 1]
    gameEnd = new GameEnd()
    isSoundOn = false;

    coinSound = new Audio('audio/coin.mp3');
    bottleSound = new Audio('audio/bottle.mp3');
    bottleBreakSound = new Audio('audio/bottle_break.mp3');
    lostSound = new Audio('audio/lost.mp3');
    winSound = new Audio('audio/win.mp3');
    gameSound = new Audio('audio/game_sound2.mp3');
    chickenSound = new Audio('audio/dead_chicken.mp3');
    endbossDeadSound = new Audio('audio/sizzle.mp3');
    hurtSound = new Audio('audio/hurt.mp3');
    swooshSound = new Audio('audio/swoosh.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkThrowObjects();
    }


    /**
     * sets the variables for the world
     */
    setWorld() {
        this.character.world = this;
        let endboss = this.level.enemies[this.level.enemies.length - 1];
        endboss.world = this;
    }


    /**
     * checks for collisions the condition for throwing objects, the end of game and the game sound
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkGameEnd()
            this.checkGameSound();
        }, 20);
    }


    /**
     * checks condition for the game sound and plays the game sound
     */
    checkGameSound() {
        if (this.endBoss.energy == 0 || this.character.energy <= 0) {
            this.gameSound.pause();
        } else
            playSound ? this.gameSound.play() : this.gameSound.pause()
    }


    /**
     * checks the condition for throwing a bottle
     */
    checkThrowObjects() {
        if (this.proofCanThrow()) {
            if (this.otherDirection) {
                this.canThrowBottleLeft()
            } else {
                this.canThrowBottleRight()
            }
            playOrStopSound(this.swooshSound);
            this.lastThrow = new Date().getTime();
            this.bottleAmount--
            this.bottleBar.setPercentage(this.bottleAmount * 20)
        }
    }


    /**
     * 
     * @returns requirements for throwing a bottle
     */
    proofCanThrow() {
        return this.keyboard.D && !this.prooflastThrow(1001) && this.bottleAmount != 0;
    }


    /**
     * defines the details for throwing the bottle to the left
     */
    canThrowBottleLeft() {
        let bottle = new ThrowableObject(this.character.x - 120, this.character.y + 120, this.character.otherDirection);
        this.throwableObjects.push(bottle)
    }


    /**
     * defines the details for throwing the bottle to the right
     */
    canThrowBottleRight() {
        let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 120, this.character.otherDirection);
        this.throwableObjects.push(bottle)
    }


    /**
     * sets a delay for throwing a bottle 
     * @param {*} ms - milliseconds after bottle was thrown
     */
    prooflastThrow(ms) {
        let timepassed = new Date().getTime() - this.lastThrow;
        return timepassed < ms;
    }


    /**
     * checks collisions Character with enemies
     */
    checkCollisions() {
        this.checkCollision();
        this.checkCollectCoins();
        this.checkCollectBottles();
        this.checkCollisionBottle();
        this.checkCollisionWithEndboss();
    }


    /**
     * checks the collisions of the character with enemies
     */
    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.contactWithEnemy(enemy)) {
                this.characterDamage(enemy.damage);
            }
            if (this.contactWithChicken(enemy)) {
                this.chickenDead(enemy);
            }
            if (this.contactWithSmallChicken(enemy)) {
                this.smallChickenDead(enemy);
            }
        });
    }


    /**
     * 
     * @param {*} enemy - the enemy
     * @returns requirements for contact with enemy
     */
    contactWithEnemy(enemy) {
        return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.dead
    }


    /**
     * 
     * @param {*} enemy - the enemy
     * @returns requirements for contact with chicken
     */
    contactWithChicken(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY >= -30 && this.character.speedY < 0 && (enemy instanceof Chicken)
    }


    /**
     * 
     * @param {*} enemy - the enemy
     * @returns requirements for contact with small chicken
     */
    contactWithSmallChicken(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY >= -30 && this.character.speedY < 0 && (enemy instanceof SmallChicken)
    }


    /**
     * defines what happens when the character ist hit
     * @param {*} damage - the damage of the character
     */
    characterDamage(damage) {
        this.character.hit(damage);
        this.statusBar.setPercentage(this.character.energy);
        playOrStopSound(this.hurtSound);
    }


    /**
     * defines what happens when chicken is dead
     * @param {*} enemy 
     */
    chickenDead(enemy) {
        if (enemy instanceof Chicken && !enemy.dead) {
            this.character.speedY = 15;
            enemy.playAnimation(this.chicken.CHICKEN_DEAD)
            enemy.stopAnimation()
            enemy.dead = true
            playOrStopSound(this.chickenSound);
        }
    }


    /**
     * defines what happens when small chicken is dead
     * @param {*} enemy 
     */
    smallChickenDead(enemy) {
        if (enemy instanceof SmallChicken && !enemy.dead) {
            this.character.speedY = 15;
            enemy.playAnimation(this.SmallChicken.CHICKEN_DEAD)
            enemy.stopAnimation()
            enemy.dead = true
            playOrStopSound(this.chickenSound);
        }
    }


    /**
     * defines what happens when character collects coins
     */
    checkCollectCoins() {
        this.coins.forEach(coin => {
            if (this.character.isColliding(coin) && (coin.heigth != 0 && coin.width != 0)) {
                coin.height = 0;
                coin.width = 0;
                this.coinAmount++;
                this.coinBar.setPercentage(this.coinAmount * 20);
                playOrStopSound(this.coinSound);
            }
        })
    }


    /**
     * defines what happens when character collects bottle
     */
    checkCollectBottles() {
        this.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle) && (bottle.heigth != 0 && bottle.width != 0)) {
                bottle.height = 0
                bottle.width = 0
                this.bottleAmount++
                this.bottleBar.setPercentage(this.bottleAmount * 20)
                playOrStopSound(this.bottleSound);
            }
        })
    };


    /**
     * checks the conditions for collision with bottle 
     */
    checkCollisionBottle() {
        this.throwableObjects.forEach(throwableObject => {
            if (this.checkBottleHitsEndboss(throwableObject)) {
                this.bottleHitsEndboss(throwableObject);
            } else if (this.checkBottleHitsFloor(throwableObject)) {
                this.bottleHitsFloor(throwableObject);
            }
        })
    }


    /**
     * 
     * @param {*} throwableObject - the bottle
     * @returns the requirements for bottle hitting the endboss
     */
    checkBottleHitsEndboss(throwableObject) {
        return this.endBoss.isColliding(throwableObject) &&
            !throwableObject.isBroken &&
            (throwableObject.heigth != 0 && throwableObject.width != 0 && throwableObject.y > 90)
    }


    /**
     * 
     * @param {*} throwableObject - the bottle
     * @returns the requirements of bottle hitting the floor
     */
    checkBottleHitsFloor(throwableObject) {
        return !throwableObject.isBroken &&
            throwableObject.y > 340 &&
            throwableObject.speedY < 0
    }


    /**
     * defines what happens when the bottle hits the endboss
     * @param {*} throwableObject - the bottle
     */
    bottleHitsEndboss(throwableObject) {
        this.endBoss.hit()
        playOrStopSound(this.bottleBreakSound);
        throwableObject.isBroken = true
        throwableObject.splash()
        setTimeout(() => {
            throwableObject.height = 0
        }, 500)
    }


    /**
     * defines what happens the botle hits the floor
     * @param {*} throwableObject - the bottle
     */
    bottleHitsFloor(throwableObject) {
        playOrStopSound(this.bottleBreakSound);
        throwableObject.isBroken = true
        throwableObject.splash()
        setTimeout(() => {
            throwableObject.height = 0
        }, 500)
    }


    /**
     * defines what happens when character hits endboss
     */
    checkCollisionWithEndboss() {
        if (this.endBoss.isColliding(this.character)) {
            this.character.energy = 0
        }
    }


    /**
     * checks conditions for game end
     */
    checkGameEnd() {
        if (this.endBoss.energy == 0) {
            this.gameWon();
            this.gameSound.pause()
        }
        if (this.character.energy <= 0) {
            this.gameLost();
            this.gameSound.pause()
        }
    }


    /**
     * defines what happens when the game is won and plays the win sound
     */
    gameWon() {
        setTimeout(() => {
            this.gameEnd.wonGame()
            this.endbossDeadSound.pause()
            playOrStopSound(this.winSound);
        }, 1000)
    }


    /**
     * defines what happens when the game is lost and plays the lost sound
     */
    gameLost() {
        setTimeout(() => {
            this.gameEnd.lostGame()
            playOrStopSound(this.lostSound);
        }, 1000)
    }


    /**
     * removes the coin from the game
     * @param {*} coin 
     */
    removeCoin(coin) {
        let index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
    }


    /**
     * draws the objects in the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.cactus);
        this.ctx.translate(-this.camera_x, 0);
        // -----Space for fixed objects ------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.coins)
        this.addObjectsToMap(this.bottles)
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * adds the objects to the map
     * @param {*} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }


    /**
     * adds movable object to the map
     * @param {*} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }


    /**
     * flips the object when moving in different direction
     * @param {*} mo - mpvable object
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    
    /**
     * flips the image back
     * @param {*} mo - movable object
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}