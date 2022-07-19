var EIA2;
(function (EIA2) {
    class Helper {
        static plantingBedWidth() {
            return Helper.screenWidth() / 10;
        }
        static plantingBedHeight() {
            return Helper.screenHeight() / 10;
        }
        static screenWidth() {
            return document.body.clientWidth;
        }
        static screenHeight() {
            return document.body.clientHeight;
        }
        static canvas() {
            let canvas = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        }
        static canvasWidth() {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        }
        static canvasHeight() {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        }
        // https://stackoverflow.com/a/5624139/633945
        static hexToRgb(_hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        static hexToRgba(_hex, _alpha) {
            var parts = Helper.hexToRgb(_hex);
            if (parts == null) {
                return '#000000';
            }
            return 'rgba(' + parts.r + ',' + parts.g + ',' + parts.b + ',' + _alpha + ')';
        }
    }
    Helper.FPS = 30;
    Helper.msBetweenFrames = 1000 / Helper.FPS;
    Helper.margin = 20;
    Helper.textLineFontSize = 32;
    Helper.textLineTopMargin = 20;
    Helper.textLineTopHeight = 40;
    Helper.plantingBedMargin = 20;
    Helper.plantingBedFieldPadding = 2;
    Helper.plantingBedFreeColor = "#964600";
    Helper.plantingBedPlantedColor = "#68bd00";
    Helper.plantingBedHarvestColor = "#d9c214";
    Helper.plantingBedDeadColor = "#cf0808";
    Helper.buttonSize = 100;
    Helper.buttonMargin = 20;
    Helper.enemySpawnThreshold = 0.998;
    Helper.enemySize = 100;
    EIA2.Helper = Helper;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Helper.js.map