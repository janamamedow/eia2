namespace EIA2 {
    export class PlantingBed extends BaseObject {
        plantedObject: PlantedObject;

        constructor() {
            super();
            this.size = new Vector2D(Helper.plantingBedWidth(), Helper.plantingBedHeight());
        }

        public move(_dt: number): void {
            super.move(_dt);
            if (this.plantedObject != null) {
                this.plantedObject.update(_dt);

                if (!this.plantedObject.isDead() && !this.plantedObject.isReadyToHarvest() && Math.random() > Helper.enemySpawnThreshold) {
                    var customEvent: CustomEvent = new CustomEvent('spawnEnemy', { detail: this })
                    window.dispatchEvent(customEvent);
                }
            }
        }

        public dealDamage(_dt: number): void {
            if (this.plantedObject != null) {
                this.plantedObject.health -= 0.1 * _dt / 10000;
                this.plantedObject.health = Math.max(this.plantedObject.health, 0);
            }
        }

        public draw(_crc2: CanvasRenderingContext2D): void {

            _crc2.fillStyle = Helper.plantingBedFreeColor;
            _crc2.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

            if (this.plantedObject != null) {

                /* Wachstimsanzeige */
                _crc2.fillStyle = Helper.plantingBedPlantedColor;
                if (this.plantedObject.isDead()) {
                    _crc2.fillStyle = Helper.plantingBedDeadColor;
                } else if (this.plantedObject.isReadyToHarvest()) {
                    _crc2.fillStyle = Helper.plantingBedHarvestColor;
                }

                var elapsed: number = this.plantedObject.elapsedGrowTime / this.plantedObject.growTime;
                var height: number = elapsed * Helper.plantingBedHeight();

                _crc2.fillRect(this.position.x, this.position.y + Helper.plantingBedHeight() - height, Helper.plantingBedWidth(), height);

                /* Lebensanzeige */

                var offsetX: number = this.plantedObject.health * Helper.plantingBedWidth();
                var width: number = (1.0 - this.plantedObject.health) * Helper.plantingBedWidth();

                _crc2.fillStyle = '#000';
                _crc2.fillRect(this.position.x, this.position.y, Helper.plantingBedWidth(), 10);
                _crc2.fillStyle = '#00FF00';
                _crc2.fillRect(this.position.x, this.position.y + 1, Helper.plantingBedWidth() - 2, 8);
                _crc2.fillStyle = '#FF0000';
                _crc2.fillRect(this.position.x + offsetX, this.position.y + 1, width, 8);

                /* Wasseranzeige */
                var range: number = Helper.plantingBedHeight() - 20;

                var grd: CanvasGradient = _crc2.createLinearGradient(0, this.position.y + 16, 0, this.position.y + Helper.plantingBedHeight() - 5);
                grd.addColorStop(0, "#fff");
                grd.addColorStop(0.5, "#4287f5");
                grd.addColorStop(1, "#fff");

                _crc2.fillStyle = '#000';
                _crc2.fillRect(this.position.x + 5, this.position.y + 15, 10, Helper.plantingBedHeight() - 20);
                _crc2.fillStyle = grd;
                _crc2.fillRect(this.position.x + 6, this.position.y + 16, 8, Helper.plantingBedHeight() - 22);
                _crc2.fillStyle = 'red';
                _crc2.fillRect(this.position.x + 3, this.position.y + 2 - range * this.plantedObject.waterLevel + Helper.plantingBedHeight() - 10, 14, 4);

                /* Düngeranzeige */

                var grd: CanvasGradient = _crc2.createLinearGradient(0, this.position.y + 16, 0, this.position.y + Helper.plantingBedHeight() - 5);
                grd.addColorStop(0, "#fff");
                grd.addColorStop(0.5, "#943b00");
                grd.addColorStop(1, "#fff");

                _crc2.fillStyle = '#000';
                _crc2.fillRect(this.position.x + Helper.plantingBedWidth() - 15, this.position.y + 15, 10, Helper.plantingBedHeight() - 20);
                _crc2.fillStyle = grd;
                _crc2.fillRect(this.position.x + Helper.plantingBedWidth() - 14, this.position.y + 16, 8, Helper.plantingBedHeight() - 22);
                _crc2.fillStyle = 'red';
                _crc2.fillRect(this.position.x + Helper.plantingBedWidth() - 17, this.position.y + 2 - range * this.plantedObject.fertilizerLevel + Helper.plantingBedHeight() - 10, 14, 4);

                /* Pflanzen Anzeige was hier wächst */

                _crc2.drawImage(this.plantedObject.image, this.position.x + this.size.x / 4, this.position.y + this.size.y / 3, this.size.x / 2, this.size.x / 2);

            }
        }
    }
}