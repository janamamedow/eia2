namespace EIA2 {
    export class TextLabel extends BaseObject {
        text: string;
        font: string;
        textColor: string;

        constructor(_text: string, _font: string, _textColor: string) {
            super();
            this.text = _text;
            this.font = _font;
            this.textColor = _textColor;
        }

        public draw(_crc2: CanvasRenderingContext2D): void {
            _crc2.fillStyle = this.textColor;
            _crc2.font = this.font;
            _crc2.fillText(this.text, this.position.x, this.position.y, Helper.screenWidth());
        }
    }
}