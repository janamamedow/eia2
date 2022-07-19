var EIA2;
(function (EIA2) {
    class ImageButton extends EIA2.BaseObject {
        constructor(_url) {
            super();
            this.image = new Image();
            this.image.src = _url;
            this.size = new EIA2.Vector2D(EIA2.Helper.buttonSize, EIA2.Helper.buttonSize);
        }
        draw(_crc2) {
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
    EIA2.ImageButton = ImageButton;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=ImageButton.js.map