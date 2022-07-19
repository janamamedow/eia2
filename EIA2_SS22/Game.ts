namespace EIA2 {
    window.addEventListener('load', init);

    let crc2: CanvasRenderingContext2D;
    let objects: BaseObject[] = [];
    let plants: PlantedObject[] = [];
    let dynamicPrices: DynamicPrice[] = [];
    let selectedAction: number = -1;
    let selectedPlant: number = -1;
    let money: number = 0;

    function init(_event: Event): void {

        /* Canvas */
        let canvas: HTMLCanvasElement = Helper.canvas();
        canvas.hidden = true;
        crc2 = canvas.getContext('2d');

        /* Pflanzen definieren */
        plants[0] = new PlantedObject();
        plants[0].growTime = 30000;
        plants[0].image.src = 'assets/artichoke.png';

        plants[1] = new PlantedObject();
        plants[1].growTime = 45000;
        plants[1].image.src = 'assets/beet.png';

        plants[2] = new PlantedObject();
        plants[2].growTime = 60000;
        plants[2].image.src = 'assets/sunflower.png';

        plants[3] = new PlantedObject();
        plants[3].growTime = 28000;
        plants[3].image.src = 'assets/cabbage.png';

        plants[4] = new PlantedObject();
        plants[4].growTime = 20000;
        plants[4].image.src = 'assets/pea.png';

        for (var i: number = 0; i < 5; i++) {
            dynamicPrices[i] = new DynamicPrice();
        }

        var plant0SellPriceLabel: TextLabel = new TextLabel(plants[0].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var plant1SellPriceLabel: TextLabel = new TextLabel(plants[1].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var plant2SellPriceLabel: TextLabel = new TextLabel(plants[2].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var plant3SellPriceLabel: TextLabel = new TextLabel(plants[3].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var plant4SellPriceLabel: TextLabel = new TextLabel(plants[4].sellPrice + '$', '16px Comic Sans MS', '#fff200');

        var startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('startButton');
        startButton.addEventListener('click', function () {
            document.getElementById('settings').hidden = true;
            canvas.hidden = false;

            var moneyInput: HTMLInputElement = <HTMLInputElement>document.getElementById('money');
            money = Number(moneyInput.value);

            var plant0buy: HTMLInputElement = <HTMLInputElement>document.getElementById('plant0buy');
            plants[0].price = Number(plant0buy.value);

            var plant0sell: HTMLInputElement = <HTMLInputElement>document.getElementById('plant0sell');
            plants[0].sellPrice = Number(plant0sell.value);

            var plant1buy: HTMLInputElement = <HTMLInputElement>document.getElementById('plant1buy');
            plants[1].price = Number(plant1buy.value);

            var plant1sell: HTMLInputElement = <HTMLInputElement>document.getElementById('plant1sell');
            plants[1].sellPrice = Number(plant1sell.value);

            var plant2buy: HTMLInputElement = <HTMLInputElement>document.getElementById('plant2buy');
            plants[2].price = Number(plant2buy.value);

            var plant2sell: HTMLInputElement = <HTMLInputElement>document.getElementById('plant2sell');
            plants[2].sellPrice = Number(plant2sell.value);

            var plant3buy: HTMLInputElement = <HTMLInputElement>document.getElementById('plant3buy');
            plants[3].price = Number(plant3buy.value);

            var plant3sell: HTMLInputElement = <HTMLInputElement>document.getElementById('plant3sell');
            plants[3].sellPrice = Number(plant3sell.value);

            var plant4buy: HTMLInputElement = <HTMLInputElement>document.getElementById('plant4buy');
            plants[4].price = Number(plant4buy.value);

            var plant4sell: HTMLInputElement = <HTMLInputElement>document.getElementById('plant4sell');
            plants[4].sellPrice = Number(plant4sell.value);

            var customEvent: CustomEvent = new CustomEvent("updateMoneyLabel")
            window.dispatchEvent(customEvent);

            /* Labels mit den EK Preisen */
            var plant0PriceLabel: TextLabel = new TextLabel(plants[0].price + '$', '16px Comic Sans MS', '#ffffff');
            plant0PriceLabel.position = new Vector2D(plant0Button.position.x + Helper.margin, plant0Button.position.y + Helper.buttonSize + Helper.buttonMargin);
            plant0PriceLabel.attach();

            var plant1PriceLabel: TextLabel = new TextLabel(plants[1].price + '$', '16px Comic Sans MS', '#ffffff');
            plant1PriceLabel.position = new Vector2D(plant1Button.position.x + Helper.margin, plant1Button.position.y + Helper.buttonSize + Helper.buttonMargin);
            plant1PriceLabel.attach();

            var plant2PriceLabel: TextLabel = new TextLabel(plants[2].price + '$', '16px Comic Sans MS', '#ffffff');
            plant2PriceLabel.position = new Vector2D(plant2Button.position.x + Helper.margin, plant2Button.position.y + Helper.buttonSize + Helper.buttonMargin);
            plant2PriceLabel.attach();

            var plant3PriceLabel: TextLabel = new TextLabel(plants[3].price + '$', '16px Comic Sans MS', '#ffffff');
            plant3PriceLabel.position = new Vector2D(plant3Button.position.x + Helper.margin, plant3Button.position.y + Helper.buttonSize + Helper.buttonMargin);
            plant3PriceLabel.attach();

            var plant4PriceLabel: TextLabel = new TextLabel(plants[4].price + '$', '16px Comic Sans MS', '#ffffff');
            plant4PriceLabel.position = new Vector2D(plant4Button.position.x + Helper.margin, plant4Button.position.y + Helper.buttonSize + Helper.buttonMargin);
            plant4PriceLabel.attach();

            /* Labels mit den VK Preisen */
            plant0SellPriceLabel.position = new Vector2D(plant0Button.position.x + Helper.margin, plant0Button.position.y + Helper.buttonSize + 2 * Helper.buttonMargin);
            plant0SellPriceLabel.attach();

            plant1SellPriceLabel.position = new Vector2D(plant1Button.position.x + Helper.margin, plant1Button.position.y + Helper.buttonSize + 2 * Helper.buttonMargin);
            plant1SellPriceLabel.attach();

            plant2SellPriceLabel.position = new Vector2D(plant2Button.position.x + Helper.margin, plant2Button.position.y + Helper.buttonSize + 2 * Helper.buttonMargin);
            plant2SellPriceLabel.attach();

            plant3SellPriceLabel.position = new Vector2D(plant3Button.position.x + Helper.margin, plant3Button.position.y + Helper.buttonSize + 2 * Helper.buttonMargin);
            plant3SellPriceLabel.attach();

            plant4SellPriceLabel.position = new Vector2D(plant4Button.position.x + Helper.margin, plant4Button.position.y + Helper.buttonSize + 2 * Helper.buttonMargin);
            plant4SellPriceLabel.attach();
        });

        canvas.addEventListener('click', (_e: MouseEvent) => {
            const x = _e.offsetX;
            const y = _e.offsetY;
            let clickPosition: Vector2D = new Vector2D(x, y);

            for (var i: number = 0; i < objects.length; i++) {
                var object: BaseObject = objects[i];
                if (object.checkClick(clickPosition)) {
                    if (object.onClick != undefined) {
                        object.onClick(object, clickPosition);
                    }
                }
            }
        });

        window.addEventListener('destroyObject', (_e: Event) => {
            let object: BaseObject = (_e as CustomEvent)?.detail;
            if (object != null) {
                let index = objects.indexOf(object);
                if (index !== -1) {
                    objects.splice(index, 1);
                }
            }
        });

        window.addEventListener('attachObject', (_e: Event) => {
            let object: BaseObject = (_e as CustomEvent)?.detail;
            if (object != null) {
                objects.push(object);
            }
        });

        /* Textzeile definieren */
        var textLabel: TextLabel = new TextLabel('', '32px Comic Sans MS', '#ffffff');
        textLabel.position = new Vector2D(Helper.margin, Helper.margin + Helper.textLineFontSize);
        textLabel.attach();

        /* Spielfeld Elemente definieren */
        for (var i: number = 0; i < 8; i++) {
            var x: number = Helper.margin + i * (Helper.plantingBedWidth() + Helper.plantingBedFieldPadding);
            for (var j: number = 0; j < 5; j++) {
                var y: number = Helper.margin + Helper.textLineFontSize + Helper.plantingBedMargin + j * (Helper.plantingBedHeight() + Helper.plantingBedFieldPadding);
                var position: Vector2D = new Vector2D(x, y);
                var plantingBed: PlantingBed = new PlantingBed();
                plantingBed.position = position;
                plantingBed.attach();
                plantingBed.onClick = (_o, _p) => {
                    var plantedObject: PlantedObject = (_o as PlantingBed).plantedObject;
                    switch (selectedAction) {
                        case 0:
                            if (selectedPlant == -1 || selectedPlant > 4) {
                                break;
                            }
                            if (plantedObject == null || plantedObject.isDead()) {
                                var plant: PlantedObject = plants[selectedPlant].copy();
                                money -= plant.price;
                                (_o as PlantingBed).plantedObject = plant;
                                var customEvent: CustomEvent = new CustomEvent("updateMoneyLabel")
                                window.dispatchEvent(customEvent);
                            }
                            break;
                        case 1:
                            if (plantedObject != null) {
                                plantedObject.waterLevel += 0.15;
                            }
                            break;
                        case 2:
                            if (plantedObject != null) {
                                plantedObject.fertilizerLevel += 0.15;
                            }
                            break;
                        case 3:
                            break;
                        case 4:
                            if (plantedObject != null && plantedObject.isReadyToHarvest()) {
                                money += plantedObject.sellPrice;

                                (_o as PlantingBed).plantedObject = null;
                                var customEvent: CustomEvent = new CustomEvent("updateMoneyLabel")
                                window.dispatchEvent(customEvent);
                            }
                            break;
                        case -1:
                        default:
                            break;
                    }
                };
            }
        }

        /* Gegener Spawnen */
        window.addEventListener('spawnEnemy', (_e: Event) => {
            let plantingBed: PlantingBed = (_e as CustomEvent)?.detail;
            var enemy: Enemy = new Enemy();
            enemy.speed = 1;
            enemy.setTarget(plantingBed);
            enemy.attach();

            enemy.onClick = (_o, _p) => {
                if (selectedAction == 3) {
                    enemy.destory();
                }
            };
        });

        window.addEventListener('updateMoneyLabel', (_e: Event) => {
            textLabel.text = 'Kapital: ' + money.toFixed(2) + '$';
        });

        window.addEventListener('updatePriceLabels', (_e: Event) => {
            plant0SellPriceLabel.text = dynamicPrices[0].getPrice(plants[0].sellPrice).toFixed(2) + '$';
            plant1SellPriceLabel.text = dynamicPrices[1].getPrice(plants[1].sellPrice).toFixed(2) + '$';
            plant2SellPriceLabel.text = dynamicPrices[2].getPrice(plants[2].sellPrice).toFixed(2) + '$';
            plant3SellPriceLabel.text = dynamicPrices[3].getPrice(plants[3].sellPrice).toFixed(2) + '$';
            plant4SellPriceLabel.text = dynamicPrices[4].getPrice(plants[4].sellPrice).toFixed(2) + '$';
        });

        /* Aktionsbuttons definieren */

        var marginAndPlantingBeds = Helper.margin + 8 * (Helper.plantingBedWidth() + Helper.plantingBedFieldPadding) + Helper.plantingBedMargin;
        var actionButtonGroup: ImageButton[] = [];

        var plantButton: ImageButton = new ImageButton('assets/plant.png');
        plantButton.position = new Vector2D(marginAndPlantingBeds, Helper.margin + Helper.textLineFontSize + Helper.plantingBedMargin);
        actionButtonGroup.push(plantButton);
        plantButton.onClick = (_o, _p) => {
            for (var i: number = 0; i < actionButtonGroup.length; i++) {
                var button: ImageButton = actionButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedAction = 0;
        };
        plantButton.attach();

        var waterButton: ImageButton = new ImageButton('assets/water.png');
        waterButton.position = new Vector2D(marginAndPlantingBeds, Helper.margin + Helper.textLineFontSize + Helper.plantingBedMargin + (Helper.buttonSize + Helper.buttonMargin));
        actionButtonGroup.push(waterButton);
        waterButton.onClick = (_o, _p) => {
            for (var i: number = 0; i < actionButtonGroup.length; i++) {
                var button: ImageButton = actionButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedAction = 1;
        };
        waterButton.attach();

        var fertilizeButton: ImageButton = new ImageButton('assets/fertilize.png');
        fertilizeButton.position = new Vector2D(marginAndPlantingBeds, Helper.margin + Helper.textLineFontSize + Helper.plantingBedMargin + 2 * (Helper.buttonSize + Helper.buttonMargin));
        actionButtonGroup.push(fertilizeButton);
        fertilizeButton.onClick = (_o, _p) => {
            for (var i: number = 0; i < actionButtonGroup.length; i++) {
                var button: ImageButton = actionButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedAction = 2;
        };
        fertilizeButton.attach();

        var pestControlButton: ImageButton = new ImageButton('assets/pestcontrol.png');
        pestControlButton.position = new Vector2D(marginAndPlantingBeds, Helper.margin + Helper.textLineFontSize + Helper.plantingBedMargin + 3 * (Helper.buttonSize + Helper.buttonMargin));
        actionButtonGroup.push(pestControlButton);
        pestControlButton.onClick = (_o, _p) => {
            for (var i: number = 0; i < actionButtonGroup.length; i++) {
                var button: ImageButton = actionButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedAction = 3;
        };
        pestControlButton.attach();

        var harvestButton: ImageButton = new ImageButton('assets/harvest.png');
        harvestButton.position = new Vector2D(marginAndPlantingBeds, Helper.margin + Helper.textLineFontSize + Helper.plantingBedMargin + 4 * (Helper.buttonSize + Helper.buttonMargin));
        actionButtonGroup.push(harvestButton);
        harvestButton.onClick = (_o, _p) => {
            for (var i: number = 0; i < actionButtonGroup.length; i++) {
                var button: ImageButton = actionButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedAction = 4;
        };
        harvestButton.attach();

        /* Pflanzbuttons definieren */

        var marginAndPlantingBeds = Helper.margin + 5 * (Helper.plantingBedHeight() + Helper.plantingBedFieldPadding) + Helper.plantingBedMargin + Helper.textLineFontSize + Helper.buttonMargin;
        var plantButtonGroup: ImageButton[] = [];

        var plant0Button: ImageButton = new ImageButton('assets/artichoke.png');
        plant0Button.position = new Vector2D(Helper.margin, marginAndPlantingBeds);
        plantButtonGroup.push(plant0Button);
        plant0Button.onClick = (_o, _p) => {
            for (var i: number = 0; i < plantButtonGroup.length; i++) {
                var button: ImageButton = plantButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedPlant = 0;
        };
        plant0Button.attach();

        var plant1Button: ImageButton = new ImageButton('assets/beet.png');
        plant1Button.position = new Vector2D(Helper.margin + Helper.buttonSize + Helper.buttonMargin, marginAndPlantingBeds);
        plantButtonGroup.push(plant1Button);
        plant1Button.onClick = (_o, _p) => {
            for (var i: number = 0; i < plantButtonGroup.length; i++) {
                var button: ImageButton = plantButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedPlant = 1;
        };
        plant1Button.attach();

        var plant2Button: ImageButton = new ImageButton('assets/sunflower.png');
        plant2Button.position = new Vector2D(Helper.margin + 2 * (Helper.buttonSize + Helper.buttonMargin), marginAndPlantingBeds);
        plantButtonGroup.push(plant2Button);
        plant2Button.onClick = (_o, _p) => {
            for (var i: number = 0; i < plantButtonGroup.length; i++) {
                var button: ImageButton = plantButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedPlant = 2;
        };
        plant2Button.attach();

        var plant3Button: ImageButton = new ImageButton('assets/cabbage.png');
        plant3Button.position = new Vector2D(Helper.margin + 3 * (Helper.buttonSize + Helper.buttonMargin), marginAndPlantingBeds);
        plantButtonGroup.push(plant3Button);
        plant3Button.onClick = (_o, _p) => {
            for (var i: number = 0; i < plantButtonGroup.length; i++) {
                var button: ImageButton = plantButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedPlant = 3;
        };
        plant3Button.attach();

        var plant4Button: ImageButton = new ImageButton('assets/pea.png');
        plant4Button.position = new Vector2D(Helper.margin + 4 * (Helper.buttonSize + Helper.buttonMargin), marginAndPlantingBeds);
        plantButtonGroup.push(plant4Button);
        plant4Button.onClick = (_o, _p) => {
            for (var i: number = 0; i < plantButtonGroup.length; i++) {
                var button: ImageButton = plantButtonGroup[i];
                button.selected = false;
            }
            (_o as ImageButton).selected = true;
            selectedPlant = 4;
        };
        plant4Button.attach();

        loop();
    }

    function loop(): void {
        setTimeout(loopLogic, Helper.msBetweenFrames);
    }

    function loopLogic(): void {
        crc2.clearRect(0, 0, Helper.canvasWidth(), Helper.canvasHeight());

        for (var i: number = 0; i < objects.length; i++) {
            var object: BaseObject = objects[i];
            object.move(Helper.msBetweenFrames);
        }

        for (var i: number = 0; i < dynamicPrices.length; i++) {
            var dynamicPrice: DynamicPrice = dynamicPrices[i];
            dynamicPrice.update(Helper.msBetweenFrames);
        }
        var customEvent: CustomEvent = new CustomEvent("updatePriceLabels")
        window.dispatchEvent(customEvent);

        for (var i: number = 0; i < objects.length; i++) {
            var object: BaseObject = objects[i];
            object.draw(crc2);
        }

        loop();
    }
}