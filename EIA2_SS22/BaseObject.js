var EIA2;
(function (EIA2) {
    class BaseObject {
        constructor() {
            this.velocity = EIA2.Vector2D.zero();
            this.position = EIA2.Vector2D.zero();
            this.size = EIA2.Vector2D.zero();
        }
        attach() {
            var customEvent = new CustomEvent("attachObject", { detail: this });
            window.dispatchEvent(customEvent);
        }
        destory() {
            var customEvent = new CustomEvent("destroyObject", { detail: this });
            window.dispatchEvent(customEvent);
        }
        move(_dt) {
            if (this.velocity.x != 0) {
                this.position.x = this.position.x + (this.velocity.x * this.speed * _dt / 10);
            }
            if (this.velocity.y != 0) {
                this.position.y = this.position.y + (this.velocity.y * this.speed * _dt / 10);
            }
        }
        checkClick(_e) {
            return _e.x >= this.position.x
                && _e.x <= this.position.x + this.size.x
                && _e.y >= this.position.y
                && _e.y <= this.position.y + this.size.y;
        }
    }
    EIA2.BaseObject = BaseObject;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=BaseObject.js.map