class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar()

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    setWorld() {
        this.character.world = this;
    } // Damit man in der Klasse Character auf die World Inhalte zugreifen kann


    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {

                    this.character.hit();
                    console.log('Collision with Character, energy', this.character.energy)
                }
            });
        }, 1000);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0); // verschiebt den Bildauschnitt um die variable camera_x auf der x-achse

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.statusBar);
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.enemies);
        // Reihenfolge der Funktionen ist wichtig

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
        mo.drawFrame(this.ctx);




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