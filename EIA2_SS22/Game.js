var EIA2;
(function (EIA2) {
    window.addEventListener('load', init);
    let crc2;
    let objects = [];
    let plants = [];
    let dynamicPrices = [];
    let selectedAction = -1;
    let selectedPlant = -1;
    let money = 0;
    function init(_event) {
        /* Canvas */
        let canvas = EIA2.Helper.canvas();
        canvas.hidden = true;
        crc2 = canvas.getContext('2d');
        /* Pflanzen definieren */
        plants[0] = new EIA2.PlantedObject();
        plants[0].growTime = 30000;
        plants[0].image.src = 'assets/artichoke.png';
        plants[1] = new EIA2.PlantedObject();
        plants[1].growTime = 45000;
        plants[1].image.src = 'assets/beet.png';
        plants[2] = new EIA2.PlantedObject();
        plants[2].growTime = 60000;
        plants[2].image.src = 'assets/sunflower.png';
        plants[3] = new EIA2.PlantedObject();
        plants[3].growTime = 28000;
        plants[3].image.src = 'assets/cabbage.png';
        plants[4] = new EIA2.PlantedObject();
        plants[4].growTime = 20000;
        plants[4].image.src = 'assets/pea.png';
        for (var i = 0; i < 5; i++) {
            dynamicPrices[i] = new EIA2.DynamicPrice();
        }
        var plant0SellPriceLabel = new EIA2.TextLabel(plants[0].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var plant1SellPriceLabel = new EIA2.TextLabel(plants[1].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var plant2SellPriceLabel = new EIA2.TextLabel(plants[2].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var plant3SellPriceLabel = new EIA2.TextLabel(plants[3].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var plant4SellPriceLabel = new EIA2.TextLabel(plants[4].sellPrice + '$', '16px Comic Sans MS', '#fff200');
        var startButton = document.getElementById('startButton');
        startButton.addEventListener('click', function () {
            document.getElementById('settings').hidden = true;
            canvas.hidden = false;
            var moneyInput = document.getElementById('money');
            money = Number(moneyInput.value);
            var plant0buy = document.getElementById('plant0buy');
            plants[0].price = Number(plant0buy.value);
            var plant0sell = document.getElementById('plant0sell');
            plants[0].sellPrice = Number(plant0sell.value);
            var plant1buy = document.getElementById('plant1buy');
            plants[1].price = Number(plant1buy.value);
            var plant1sell = document.getElementById('plant1sell');
            plants[1].sellPrice = Number(plant1sell.value);
            var plant2buy = document.getElementById('plant2buy');
            plants[2].price = Number(plant2buy.value);
            var plant2sell = document.getElementById('plant2sell');
            plants[2].sellPrice = Number(plant2sell.value);
            var plant3buy = document.getElementById('plant3buy');
            plants[3].price = Number(plant3buy.value);
            var plant3sell = document.getElementById('plant3sell');
            plants[3].sellPrice = Number(plant3sell.value);
            var plant4buy = document.getElementById('plant4buy');
            plants[4].price = Number(plant4buy.value);
            var plant4sell = document.getElementById('plant4sell');
            plants[4].sellPrice = Number(plant4sell.value);
            var customEvent = new CustomEvent("updateMoneyLabel");
            window.dispatchEvent(customEvent);
            /* Labels mit den EK Preisen */
            var plant0PriceLabel = new EIA2.TextLabel(plants[0].price + '$', '16px Comic Sans MS', '#ffffff');
            plant0PriceLabel.position = new EIA2.Vector2D(plant0Button.position.x + EIA2.Helper.margin, plant0Button.position.y + EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin);
            plant0PriceLabel.attach();
            var plant1PriceLabel = new EIA2.TextLabel(plants[1].price + '$', '16px Comic Sans MS', '#ffffff');
            plant1PriceLabel.position = new EIA2.Vector2D(plant1Button.position.x + EIA2.Helper.margin, plant1Button.position.y + EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin);
            plant1PriceLabel.attach();
            var plant2PriceLabel = new EIA2.TextLabel(plants[2].price + '$', '16px Comic Sans MS', '#ffffff');
            plant2PriceLabel.position = new EIA2.Vector2D(plant2Button.position.x + EIA2.Helper.margin, plant2Button.position.y + EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin);
            plant2PriceLabel.attach();
            var plant3PriceLabel = new EIA2.TextLabel(plants[3].price + '$', '16px Comic Sans MS', '#ffffff');
            plant3PriceLabel.position = new EIA2.Vector2D(plant3Button.position.x + EIA2.Helper.margin, plant3Button.position.y + EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin);
            plant3PriceLabel.attach();
            var plant4PriceLabel = new EIA2.TextLabel(plants[4].price + '$', '16px Comic Sans MS', '#ffffff');
            plant4PriceLabel.position = new EIA2.Vector2D(plant4Button.position.x + EIA2.Helper.margin, plant4Button.position.y + EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin);
            plant4PriceLabel.attach();
            /* Labels mit den VK Preisen */
            plant0SellPriceLabel.position = new EIA2.Vector2D(plant0Button.position.x + EIA2.Helper.margin, plant0Button.position.y + EIA2.Helper.buttonSize + 2 * EIA2.Helper.buttonMargin);
            plant0SellPriceLabel.attach();
            plant1SellPriceLabel.position = new EIA2.Vector2D(plant1Button.position.x + EIA2.Helper.margin, plant1Button.position.y + EIA2.Helper.buttonSize + 2 * EIA2.Helper.buttonMargin);
            plant1SellPriceLabel.attach();
            plant2SellPriceLabel.position = new EIA2.Vector2D(plant2Button.position.x + EIA2.Helper.margin, plant2Button.position.y + EIA2.Helper.buttonSize + 2 * EIA2.Helper.buttonMargin);
            plant2SellPriceLabel.attach();
            plant3SellPriceLabel.position = new EIA2.Vector2D(plant3Button.position.x + EIA2.Helper.margin, plant3Button.position.y + EIA2.Helper.buttonSize + 2 * EIA2.Helper.buttonMargin);
            plant3SellPriceLabel.attach();
            plant4SellPriceLabel.position = new EIA2.Vector2D(plant4Button.position.x + EIA2.Helper.margin, plant4Button.position.y + EIA2.Helper.buttonSize + 2 * EIA2.Helper.buttonMargin);
            plant4SellPriceLabel.attach();
        });
        canvas.addEventListener('click', (_e) => {
            const x = _e.offsetX;
            const y = _e.offsetY;
            let clickPosition = new EIA2.Vector2D(x, y);
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                if (object.checkClick(clickPosition)) {
                    if (object.onClick != undefined) {
                        object.onClick(object, clickPosition);
                    }
                }
            }
        });
        window.addEventListener('destroyObject', (_e) => {
            var _a;
            let object = (_a = _e) === null || _a === void 0 ? void 0 : _a.detail;
            if (object != null) {
                let index = objects.indexOf(object);
                if (index !== -1) {
                    objects.splice(index, 1);
                }
            }
        });
        window.addEventListener('attachObject', (_e) => {
            var _a;
            let object = (_a = _e) === null || _a === void 0 ? void 0 : _a.detail;
            if (object != null) {
                objects.push(object);
            }
        });
        /* Textzeile definieren */
        var textLabel = new EIA2.TextLabel('', '32px Comic Sans MS', '#ffffff');
        textLabel.position = new EIA2.Vector2D(EIA2.Helper.margin, EIA2.Helper.margin + EIA2.Helper.textLineFontSize);
        textLabel.attach();
        /* Spielfeld Elemente definieren */
        for (var i = 0; i < 8; i++) {
            var x = EIA2.Helper.margin + i * (EIA2.Helper.plantingBedWidth() + EIA2.Helper.plantingBedFieldPadding);
            for (var j = 0; j < 5; j++) {
                var y = EIA2.Helper.margin + EIA2.Helper.textLineFontSize + EIA2.Helper.plantingBedMargin + j * (EIA2.Helper.plantingBedHeight() + EIA2.Helper.plantingBedFieldPadding);
                var position = new EIA2.Vector2D(x, y);
                var plantingBed = new EIA2.PlantingBed();
                plantingBed.position = position;
                plantingBed.attach();
                plantingBed.onClick = (_o, _p) => {
                    var plantedObject = _o.plantedObject;
                    switch (selectedAction) {
                        case 0:
                            if (selectedPlant == -1 || selectedPlant > 4) {
                                break;
                            }
                            if (plantedObject == null || plantedObject.isDead()) {
                                var plant = plants[selectedPlant].copy();
                                money -= plant.price;
                                _o.plantedObject = plant;
                                var customEvent = new CustomEvent("updateMoneyLabel");
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
                                _o.plantedObject = null;
                                var customEvent = new CustomEvent("updateMoneyLabel");
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
        window.addEventListener('spawnEnemy', (_e) => {
            var _a;
            let plantingBed = (_a = _e) === null || _a === void 0 ? void 0 : _a.detail;
            var enemy = new EIA2.Enemy();
            enemy.speed = 1;
            enemy.setTarget(plantingBed);
            enemy.attach();
            enemy.onClick = (_o, _p) => {
                if (selectedAction == 3) {
                    enemy.destory();
                }
            };
        });
        window.addEventListener('updateMoneyLabel', (_e) => {
            textLabel.text = 'Kapital: ' + money.toFixed(2) + '$';
        });
        window.addEventListener('updatePriceLabels', (_e) => {
            plant0SellPriceLabel.text = dynamicPrices[0].getPrice(plants[0].sellPrice).toFixed(2) + '$';
            plant1SellPriceLabel.text = dynamicPrices[1].getPrice(plants[1].sellPrice).toFixed(2) + '$';
            plant2SellPriceLabel.text = dynamicPrices[2].getPrice(plants[2].sellPrice).toFixed(2) + '$';
            plant3SellPriceLabel.text = dynamicPrices[3].getPrice(plants[3].sellPrice).toFixed(2) + '$';
            plant4SellPriceLabel.text = dynamicPrices[4].getPrice(plants[4].sellPrice).toFixed(2) + '$';
        });
        /* Aktionsbuttons definieren */
        var marginAndPlantingBeds = EIA2.Helper.margin + 8 * (EIA2.Helper.plantingBedWidth() + EIA2.Helper.plantingBedFieldPadding) + EIA2.Helper.plantingBedMargin;
        var actionButtonGroup = [];
        var plantButton = new EIA2.ImageButton('assets/plant.png');
        plantButton.position = new EIA2.Vector2D(marginAndPlantingBeds, EIA2.Helper.margin + EIA2.Helper.textLineFontSize + EIA2.Helper.plantingBedMargin);
        actionButtonGroup.push(plantButton);
        plantButton.onClick = (_o, _p) => {
            for (var i = 0; i < actionButtonGroup.length; i++) {
                var button = actionButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedAction = 0;
        };
        plantButton.attach();
        var waterButton = new EIA2.ImageButton('assets/water.png');
        waterButton.position = new EIA2.Vector2D(marginAndPlantingBeds, EIA2.Helper.margin + EIA2.Helper.textLineFontSize + EIA2.Helper.plantingBedMargin + (EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin));
        actionButtonGroup.push(waterButton);
        waterButton.onClick = (_o, _p) => {
            for (var i = 0; i < actionButtonGroup.length; i++) {
                var button = actionButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedAction = 1;
        };
        waterButton.attach();
        var fertilizeButton = new EIA2.ImageButton('assets/fertilize.png');
        fertilizeButton.position = new EIA2.Vector2D(marginAndPlantingBeds, EIA2.Helper.margin + EIA2.Helper.textLineFontSize + EIA2.Helper.plantingBedMargin + 2 * (EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin));
        actionButtonGroup.push(fertilizeButton);
        fertilizeButton.onClick = (_o, _p) => {
            for (var i = 0; i < actionButtonGroup.length; i++) {
                var button = actionButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedAction = 2;
        };
        fertilizeButton.attach();
        var pestControlButton = new EIA2.ImageButton('assets/pestcontrol.png');
        pestControlButton.position = new EIA2.Vector2D(marginAndPlantingBeds, EIA2.Helper.margin + EIA2.Helper.textLineFontSize + EIA2.Helper.plantingBedMargin + 3 * (EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin));
        actionButtonGroup.push(pestControlButton);
        pestControlButton.onClick = (_o, _p) => {
            for (var i = 0; i < actionButtonGroup.length; i++) {
                var button = actionButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedAction = 3;
        };
        pestControlButton.attach();
        var harvestButton = new EIA2.ImageButton('assets/harvest.png');
        harvestButton.position = new EIA2.Vector2D(marginAndPlantingBeds, EIA2.Helper.margin + EIA2.Helper.textLineFontSize + EIA2.Helper.plantingBedMargin + 4 * (EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin));
        actionButtonGroup.push(harvestButton);
        harvestButton.onClick = (_o, _p) => {
            for (var i = 0; i < actionButtonGroup.length; i++) {
                var button = actionButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedAction = 4;
        };
        harvestButton.attach();
        /* Pflanzbuttons definieren */
        var marginAndPlantingBeds = EIA2.Helper.margin + 5 * (EIA2.Helper.plantingBedHeight() + EIA2.Helper.plantingBedFieldPadding) + EIA2.Helper.plantingBedMargin + EIA2.Helper.textLineFontSize + EIA2.Helper.buttonMargin;
        var plantButtonGroup = [];
        var plant0Button = new EIA2.ImageButton('assets/artichoke.png');
        plant0Button.position = new EIA2.Vector2D(EIA2.Helper.margin, marginAndPlantingBeds);
        plantButtonGroup.push(plant0Button);
        plant0Button.onClick = (_o, _p) => {
            for (var i = 0; i < plantButtonGroup.length; i++) {
                var button = plantButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedPlant = 0;
        };
        plant0Button.attach();
        var plant1Button = new EIA2.ImageButton('assets/beet.png');
        plant1Button.position = new EIA2.Vector2D(EIA2.Helper.margin + EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin, marginAndPlantingBeds);
        plantButtonGroup.push(plant1Button);
        plant1Button.onClick = (_o, _p) => {
            for (var i = 0; i < plantButtonGroup.length; i++) {
                var button = plantButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedPlant = 1;
        };
        plant1Button.attach();
        var plant2Button = new EIA2.ImageButton('assets/sunflower.png');
        plant2Button.position = new EIA2.Vector2D(EIA2.Helper.margin + 2 * (EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin), marginAndPlantingBeds);
        plantButtonGroup.push(plant2Button);
        plant2Button.onClick = (_o, _p) => {
            for (var i = 0; i < plantButtonGroup.length; i++) {
                var button = plantButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedPlant = 2;
        };
        plant2Button.attach();
        var plant3Button = new EIA2.ImageButton('assets/cabbage.png');
        plant3Button.position = new EIA2.Vector2D(EIA2.Helper.margin + 3 * (EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin), marginAndPlantingBeds);
        plantButtonGroup.push(plant3Button);
        plant3Button.onClick = (_o, _p) => {
            for (var i = 0; i < plantButtonGroup.length; i++) {
                var button = plantButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedPlant = 3;
        };
        plant3Button.attach();
        var plant4Button = new EIA2.ImageButton('assets/pea.png');
        plant4Button.position = new EIA2.Vector2D(EIA2.Helper.margin + 4 * (EIA2.Helper.buttonSize + EIA2.Helper.buttonMargin), marginAndPlantingBeds);
        plantButtonGroup.push(plant4Button);
        plant4Button.onClick = (_o, _p) => {
            for (var i = 0; i < plantButtonGroup.length; i++) {
                var button = plantButtonGroup[i];
                button.selected = false;
            }
            _o.selected = true;
            selectedPlant = 4;
        };
        plant4Button.attach();
        loop();
    }
    function loop() {
        setTimeout(loopLogic, EIA2.Helper.msBetweenFrames);
    }
    function loopLogic() {
        crc2.clearRect(0, 0, EIA2.Helper.canvasWidth(), EIA2.Helper.canvasHeight());
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            object.move(EIA2.Helper.msBetweenFrames);
        }
        for (var i = 0; i < dynamicPrices.length; i++) {
            var dynamicPrice = dynamicPrices[i];
            dynamicPrice.update(EIA2.Helper.msBetweenFrames);
        }
        var customEvent = new CustomEvent("updatePriceLabels");
        window.dispatchEvent(customEvent);
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            object.draw(crc2);
        }
        loop();
    }
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Game.js.map