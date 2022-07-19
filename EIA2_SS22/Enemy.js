var EIA2;
(function (EIA2) {
    class Enemy extends EIA2.BaseObject {
        constructor() {
            super();
            this.speed = 1;
            this.image = new Image();
            this.image.src = "assets/ladybug.png";
            this.size = new EIA2.Vector2D(EIA2.Helper.enemySize, EIA2.Helper.enemySize);
        }
        setTarget(_target) {
            this.target = _target;
            this.velocity = EIA2.Vector2D.direction(this.position, _target.position).normalize();
        }
        move(_dt) {
            if (this.target != null) {
                if (EIA2.Vector2D.distance(this.target.position, this.position) <= 3) {
                    this.target.dealDamage(_dt);
                }
                else {
                    super.move(_dt);
                }
            }
        }
        draw(_crc2) {
            _crc2.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
        }
    }
    EIA2.Enemy = Enemy;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Enemy.js.map