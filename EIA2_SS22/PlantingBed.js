var EIA2;
(function (EIA2) {
    class PlantingBed extends EIA2.BaseObject {
        constructor() {
            super();
            this.size = new EIA2.Vector2D(EIA2.Helper.plantingBedWidth(), EIA2.Helper.plantingBedHeight());
        }
        move(_dt) {
            super.move(_dt);
            if (this.plantedObject != null) {
                this.plantedObject.update(_dt);
                if (!this.plantedObject.isDead() && !this.plantedObject.isReadyToHarvest() && Math.random() > EIA2.Helper.enemySpawnThreshold) {
                    var customEvent = new CustomEvent('spawnEnemy', { detail: this });
                    window.dispatchEvent(customEvent);
                }
            }
        }
        dealDamage(_dt) {
            if (this.plantedObject != null) {
                this.plantedObject.health -= 0.1 * _dt / 10000;
                this.plantedObject.health = Math.max(this.plantedObject.health, 0);
            }
        }
        draw(_crc2) {
            _crc2.fillStyle = EIA2.Helper.plantingBedFreeColor;
            _crc2.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            if (this.plantedObject != null) {
                /* Wachstimsanzeige */
                _crc2.fillStyle = EIA2.Helper.plantingBedPlantedColor;
                if (this.plantedObject.isDead()) {
                    _crc2.fillStyle = EIA2.Helper.plantingBedDeadColor;
                }
                else if (this.plantedObject.isReadyToHarvest()) {
                    _crc2.fillStyle = EIA2.Helper.plantingBedHarvestColor;
                }
                var elapsed = this.plantedObject.elapsedGrowTime / this.plantedObject.growTime;
                var height = elapsed * EIA2.Helper.plantingBedHeight();
                _crc2.fillRect(this.position.x, this.position.y + EIA2.Helper.plantingBedHeight() - height, EIA2.Helper.plantingBedWidth(), height);
                /* Lebensanzeige */
                var offsetX = this.plantedObject.health * EIA2.Helper.plantingBedWidth();
                var width = (1.0 - this.plantedObject.health) * EIA2.Helper.plantingBedWidth();
                _crc2.fillStyle = '#000';
                _crc2.fillRect(this.position.x, this.position.y, EIA2.Helper.plantingBedWidth(), 10);
                _crc2.fillStyle = '#00FF00';
                _crc2.fillRect(this.position.x, this.position.y + 1, EIA2.Helper.plantingBedWidth() - 2, 8);
                _crc2.fillStyle = '#FF0000';
                _crc2.fillRect(this.position.x + offsetX, this.position.y + 1, width, 8);
                /* Wasseranzeige */
                var range = EIA2.Helper.plantingBedHeight() - 20;
                var grd = _crc2.createLinearGradient(0, this.position.y + 16, 0, this.position.y + EIA2.Helper.plantingBedHeight() - 5);
                grd.addColorStop(0, "#fff");
                grd.addColorStop(0.5, "#4287f5");
                grd.addColorStop(1, "#fff");
                _crc2.fillStyle = '#000';
                _crc2.fillRect(this.position.x + 5, this.position.y + 15, 10, EIA2.Helper.plantingBedHeight() - 20);
                _crc2.fillStyle = grd;
                _crc2.fillRect(this.position.x + 6, this.position.y + 16, 8, EIA2.Helper.plantingBedHeight() - 22);
                _crc2.fillStyle = 'red';
                _crc2.fillRect(this.position.x + 3, this.position.y + 2 - range * this.plantedObject.waterLevel + EIA2.Helper.plantingBedHeight() - 10, 14, 4);
                /* Düngeranzeige */
                var grd = _crc2.createLinearGradient(0, this.position.y + 16, 0, this.position.y + EIA2.Helper.plantingBedHeight() - 5);
                grd.addColorStop(0, "#fff");
                grd.addColorStop(0.5, "#943b00");
                grd.addColorStop(1, "#fff");
                _crc2.fillStyle = '#000';
                _crc2.fillRect(this.position.x + EIA2.Helper.plantingBedWidth() - 15, this.position.y + 15, 10, EIA2.Helper.plantingBedHeight() - 20);
                _crc2.fillStyle = grd;
                _crc2.fillRect(this.position.x + EIA2.Helper.plantingBedWidth() - 14, this.position.y + 16, 8, EIA2.Helper.plantingBedHeight() - 22);
                _crc2.fillStyle = 'red';
                _crc2.fillRect(this.position.x + EIA2.Helper.plantingBedWidth() - 17, this.position.y + 2 - range * this.plantedObject.fertilizerLevel + EIA2.Helper.plantingBedHeight() - 10, 14, 4);
                /* Pflanzen Anzeige was hier wächst */
                _crc2.drawImage(this.plantedObject.image, this.position.x + this.size.x / 4, this.position.y + this.size.y / 3, this.size.x / 2, this.size.x / 2);
            }
        }
    }
    EIA2.PlantingBed = PlantingBed;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=PlantingBed.js.map