namespace EIA2 {
    export class Enemy extends BaseObject {

        target: PlantingBed;
        image: HTMLImageElement;
        constructor() {
            super();

            this.speed = 1;
            this.image = new Image();
            this.image.src = "assets/ladybug.png";
            this.size = new Vector2D(Helper.enemySize, Helper.enemySize);
        }

        public setTarget(_target: PlantingBed): void {
            this.target = _target;
            this.velocity = Vector2D.direction(this.position, _target.position).normalize();
        }

        public move(_dt: number): void {
            if (this.target != null) {
                if (Vector2D.distance(this.target.position, this.position) <= 3) {
                    this.target.dealDamage(_dt);
                } else {
                    super.move(_dt);
                }
            }
        }

        public draw(_crc2: CanvasRenderingContext2D): void {
            _crc2.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
        }
    }
}