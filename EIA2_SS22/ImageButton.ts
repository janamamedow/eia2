namespace EIA2 {
    export class ImageButton extends BaseObject {
        selected: boolean;
        image: HTMLImageElement;
        constructor(_url: string) {
            super();

            this.image = new Image();
            this.image.src = _url;
            this.size = new Vector2D(Helper.buttonSize, Helper.buttonSize);
        }

        public draw(_crc2: CanvasRenderingContext2D): void {
            _crc2.fillStyle = "#fff";
            _crc2.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            _crc2.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
            if (this.selected) {
                _crc2.strokeStyle = "#ff05e7";
                _crc2.lineWidth = 5;
                _crc2.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
            }
        }
    }
}