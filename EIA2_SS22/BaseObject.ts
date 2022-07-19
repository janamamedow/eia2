namespace EIA2 {

    /* Funktion als Datentyp deklarieren */
    type ClickFunction = {
        (_obj: BaseObject, _position: Vector2D): void;
    };

    export abstract class BaseObject {

        speed: number;
        velocity: Vector2D;
        position: Vector2D;
        size: Vector2D;
        onClick: ClickFunction;

        constructor() {
            this.velocity = Vector2D.zero();
            this.position = Vector2D.zero();
            this.size = Vector2D.zero();
        }

        public attach(): void {
            var customEvent: CustomEvent = new CustomEvent("attachObject", { detail: this })
            window.dispatchEvent(customEvent);
        }

        public destory(): void {
            var customEvent: CustomEvent = new CustomEvent("destroyObject", { detail: this })
            window.dispatchEvent(customEvent);
        }

        public move(_dt: number): void {
            if (this.velocity.x != 0) {
                this.position.x = this.position.x + (this.velocity.x * this.speed * _dt / 10);
            }

            if (this.velocity.y != 0) {
                this.position.y = this.position.y + (this.velocity.y * this.speed * _dt / 10);
            }
        }

        public checkClick(_e: Vector2D): boolean {
            return _e.x >= this.position.x
                && _e.x <= this.position.x + this.size.x
                && _e.y >= this.position.y
                && _e.y <= this.position.y + this.size.y;
        }

        public abstract draw(_crc2: CanvasRenderingContext2D): void;
    }
}