namespace EIA2 {
    export class Helper {

        public static FPS: number = 30;
        public static msBetweenFrames: number = 1000 / Helper.FPS;

        public static margin: number = 20;

        public static textLineFontSize: number = 32;
        public static textLineTopMargin: number = 20;
        public static textLineTopHeight: number = 40;

        public static plantingBedMargin: number = 20;
        public static plantingBedFieldPadding: number = 2;
        public static plantingBedFreeColor: string = "#964600";
        public static plantingBedPlantedColor: string = "#68bd00";
        public static plantingBedHarvestColor: string = "#d9c214";
        public static plantingBedDeadColor: string = "#cf0808";

        public static buttonSize: number = 100;
        public static buttonMargin: number = 20;

        public static enemySpawnThreshold: number = 0.998;
        public static enemySize: number = 100;

        public static plantingBedWidth(): number {
            return Helper.screenWidth() / 10;
        }

        public static plantingBedHeight(): number {
            return Helper.screenHeight() / 10;
        }

        public static screenWidth(): number {
            return document.body.clientWidth;
        }

        public static screenHeight(): number {
            return document.body.clientHeight;
        }

        public static canvas(): HTMLCanvasElement {
            let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        }

        public static canvasWidth(): number {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        }

        public static canvasHeight(): number {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        }

        // https://stackoverflow.com/a/5624139/633945
        public static hexToRgb(_hex: string): any {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        public static hexToRgba(_hex: string, _alpha: number): any {
            var parts = Helper.hexToRgb(_hex);
            if (parts == null) {
                return '#000000';
            }
            return 'rgba(' + parts.r + ',' + parts.g + ',' + parts.b + ',' + _alpha + ')';
        }
    }
}