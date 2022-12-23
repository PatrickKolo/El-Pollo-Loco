
let level1;
/**
 * generates enemies, clouds, backgrounds and the cactus
 */
function initLevel() {
    level1 = new Level (
        generateEnemies(),
        generateClouds(),
        generateBackground(),
        generateCactus()
    );
}

/**
 * 
 * @returns the barrier cactus on the left of the game 
 */
function generateCactus(){
  return [
    new Cactus('img/play_info/cactus.png', -80)
  ]  
}

/**
 * 
 * @returns the enemies in the game
 */
function generateEnemies() {
    return [
        new Chicken,
        new SmallChicken,
        new Chicken,
        new SmallChicken,
        new Chicken,
        new SmallChicken,
        new Endboss,
    ]
  }

  /**
   * 
   * @returns the clouds in the game
   */
  function generateClouds(){
    return [
        new Cloud()
    ]
  }

/**
 * 
 * @returns the backgrounds
 */
  function generateBackground() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719, 0, 480, 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0, 0, 480, 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719, 0, 480, 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2, 0, 480, 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3, 0, 480, 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ]
  }

