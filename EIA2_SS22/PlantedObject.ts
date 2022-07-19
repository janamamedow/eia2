namespace EIA2 {
    export class PlantedObject {
        health: number;
        price: number;
        sellPrice: number;
        growTime: number;
        elapsedGrowTime: number;
        waterLevel: number;
        fertilizerLevel: number;
        image: HTMLImageElement;

        constructor() {
            this.image = new Image();
            this.health = 1.0;
            this.elapsedGrowTime = 0;
            this.waterLevel = 0.5;
            this.fertilizerLevel = 0.5;
        }

        public update(_dt: number): void {
            // wenn schädling dann leben runter

            if (!this.isDead() && !this.isReadyToHarvest()) {

                this.elapsedGrowTime += _dt;
                this.elapsedGrowTime = Math.min(this.elapsedGrowTime, this.growTime);

                this.waterLevel -= _dt / 45000;
                this.waterLevel = Math.max(this.waterLevel, 0);
                this.waterLevel = Math.min(this.waterLevel, 1);

                this.fertilizerLevel -= _dt / 60000;
                this.fertilizerLevel = Math.max(this.fertilizerLevel, 0);

                if (this.fertilizerLevel == 0 || this.waterLevel == 0) {
                    this.health = 0;
                }
            }
        }

        public isDead(): boolean {
            return this.waterLevel <= 0 || this.fertilizerLevel <= 0 || this.waterLevel >= 1 || this.fertilizerLevel >= 1 || this.health <= 0;
        }

        public isReadyToHarvest(): boolean {
            return this.elapsedGrowTime >= this.growTime;
        }

        public copy(): PlantedObject {
            var copy: PlantedObject = new PlantedObject();
            copy.growTime = this.growTime;
            copy.image = this.image;
            copy.price = this.price;
            copy.sellPrice = this.sellPrice;
            return copy;
        }
    }
}