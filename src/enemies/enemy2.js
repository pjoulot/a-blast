/* globals ASHOOTER */
var randomPointInSphere = require('../utils.js').randomPointInSphere;

ASHOOTER.registerEnemy(
  // name
  'enemy2',
  // data
  {
    components: {
      enemy: {
        name: 'enemy2',
        bulletName: 'enemy-slow',
        color: '#FF5533',
        scale: 1.3,
        health: 3
      },
      'collision-helper': {
        debug: false,
        radius: 0.6
      },
      'json-model': {
        src: 'url(https://feiss.github.io/a-shooter-assets/models/enemy2.json)',
        texturePath: 'url(https://feiss.github.io/a-shooter-assets/images/)',
        singleModel: true
      }
    },
    poolSize: 10
  },
  // implementation
  {
    init: function () { 
      this.shootingDelay = 5000;
      this.warmUpTime = 1000;
      this.reset(); 
    },
    reset: function () {
      var el = this.el;
      var sc = this.data.scale;
      el.addEventListener('model-loaded', function(event) {
        el.getObject3D('mesh').scale.set(sc, sc, sc);
      });
      this.lastShoot = undefined;
      this.willShootEmited = false;
    },
    tick: function (time, delta) {
      if (this.lastShoot == undefined ) {
        this.lastShoot = time;
      }
      else if (time - this.lastShoot > this.shootingDelay) {
        this.el.components.enemy.shoot(time, delta);
        this.lastShoot = time;
        this.willShootEmited = false;
      }
      else if (!this.willShootEmited && time - this.lastShoot > this.shootingDelay - this.warmUpTime) {
        this.el.components.enemy.willShoot(time, delta, this.warmUpTime);
        this.willShootEmited = true;
      }
    },
    onHit: function (type) {}
  }
);
