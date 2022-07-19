var EIA2;
(function (EIA2) {
    class TextLabel extends EIA2.BaseObject {
        constructor(_text, _font, _textColor) {
            super();
            this.text = _text;
            this.font = _font;
            this.textColor = _textColor;
        }
        draw(_crc2) {
            _crc2.fillStyle = this.textColor;
            _crc2.font = this.font;
            _crc2.fillText(this.text, this.position.x, this.position.y, EIA2.Helper.screenWidth());
        }
    }
    EIA2.TextLabel = TextLabel;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=TextLabel.js.map