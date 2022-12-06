class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    scoreCoins = 0;
    statusBar = new StatusBar()
    coinBar = new CoinBar()
    bottleBar = new BottleBar()
    coinAmount = 0
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),]
    bottleAmount = 0
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()]
    throwableObjects = [new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(),]
    chicken = new Chicken()
    SmallChicken = new SmallChicken()
    endBoss = level1.enemies[level1.enemies.length - 1]
    gameEnd = new GameEnd()

    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    bottle_break_sound = new Audio('audio/bottle_break.mp3');
    lost_sound = new Audio('audio/lost.mp3');
    win_sound = new Audio('audio/win.mp3');
    game_sound = new Audio('audio/game_sound2.mp3');
    chicken_sound = new Audio('audio/dead_chicken.mp3');
    endboss_dead_sound = new Audio('audio/sizzle.mp3')

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkThrowObjects()
    }

    setWorld() {
        this.character.world = this;

        let endboss = this.level.enemies[this.level.enemies.length - 1];
        endboss.world = this;
    } // Damit man in der Klasse Character auf die World Inhalte zugreifen kann


    run() {
        setStoppableInterval(() => {
            //Check for Collisions wih Objects
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkGameEnd()
            this.game_sound.play()
        }, 100);
    }



    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle);

        }
    }

    // Collision Character with enemies

    checkCollisions() {
        this.checkCollision();
        this.checkCollectCoins();
        this.checkCollectBottles();
        this.checkCollisionBottleWithEndboss();
        this.checkCollisionWithEndboss();
    }


    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.dead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken)) {
                if (enemy instanceof Chicken) {
                    enemy.playAnimation(this.chicken.CHICKEN_DEAD)
                    enemy.stopAnimation()
                    enemy.dead = true
                    this.chicken_sound.play()
                }
            }
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof SmallChicken)) {
                if (enemy instanceof SmallChicken) {
                    enemy.playAnimation(this.SmallChicken.CHICKEN_DEAD)
                    enemy.stopAnimation()
                    enemy.dead = true
                    this.chicken_sound.play()
                }
            }
        });
    }

    checkCollectCoins() {
        this.coins.forEach(coin => {
            if (this.character.isColliding(coin) && (coin.heigth != 0 && coin.width != 0)) {
                coin.height = 0;
                coin.width = 0;
                this.coinAmount++;
                this.coinBar.setPercentage(this.coinAmount * 20);
                this.coin_sound.play();
            }
        })
    }

    checkCollectBottles() {
        this.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle) && (bottle.heigth != 0 && bottle.width != 0)) {
                bottle.height = 0
                bottle.width = 0
                this.bottleAmount++
                this.bottleBar.setPercentage(this.bottleAmount * 20)
                this.bottle_sound.play()
            }
        })
    };

    checkCollisionBottleWithEndboss() {
        this.throwableObjects.forEach(throwableObject => {

            if (this.endBoss.isColliding(throwableObject) && !throwableObject.isBroken && (throwableObject.heigth != 0 && throwableObject.width != 0 && throwableObject.y > 90)) {
                this.endBoss.hit()
                //this.endBoss.energy -= 40
                this.bottle_break_sound.play()
                console.log("endboss energy", this.endBoss.energy)
                throwableObject.isBroken = true
                throwableObject.splash()
                //throwableObject.groundPosition =  throwableObject.y


                setTimeout(() => {
                    throwableObject.height = 0
                }, 500)

            }
        })
    }

    checkCollisionWithEndboss() {
        if (this.endBoss.isColliding(this.character)) {
            this.character.energy = 0
            console.log("endboss colliding")
        }
    }

    checkGameEnd() {
        if (this.endBoss.energy == 0) {
            setTimeout(() => {
                this.gameEnd.wonGame()
                this.game_sound.pause()
                this.endboss_dead_sound.pause()
                this.win_sound.play()
            }, 1000)
        }

        if (this.character.energy <= 0) {
            setTimeout(() => {
                this.gameEnd.lostGame()
                this.game_sound.pause()
                this.lost_sound.play()
            }, 1000)
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.bottleAmount != 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
                this.throwableObjects.push(bottle)
                this.bottleAmount--
                this.bottleBar.setPercentage(this.bottleAmount * 20)
            }

        }
    }



    removeCoin(coin) {
        let index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0); // verschiebt den Bildauschnitt um die variable camera_x auf der x-achse
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Back
        // -----Space for fixed objects ------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0); // Forward


        this.addObjectsToMap(this.coins)
        this.addObjectsToMap(this.bottles)

        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);// Reihenfolge der Funktionen ist wichtig
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0); // verschieben wird wieder aufgehoben. bzw alles gezeichnete wird verschoben


        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) { // falls spiegelverkehrt
            this.flipImage(mo)
        }

        mo.draw(this.ctx);
       // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save(); // aktuelle einstellungen werden gespeichert
        this.ctx.translate(mo.width, 0); // Methode wie wir die Bilder einfügen wird verändert //verschieben damit das Bild wieder an der gleichen Stelle auftaucht
        this.ctx.scale(-1, 1);  // spiegeln
        mo.x = mo.x * -1;

    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore(); // Spiegelung Rückgängig machen
    }

}