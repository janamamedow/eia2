namespace EIA2 {
    export class DynamicPrice {

        elapsed: number;

        public constructor() {
            this.elapsed = Math.random() * 1000000;
        }

        /* Berechnet einen schwankenden Preis. Ausgehend ist der Original Verkauspreis. 
        Dort wird ein Wert zwischen +1/4 bis - 1/4 des Verkauspreises drauf gerechnet.
        Als Funktion wird der Sinus verwendet. Dann schwankt der Verkauspreis zwischen 
        Originalpreis - 1/4 des Originalpreises und Originalpreis + 1/4 des Originalpreises. */
        public getPrice(_originalPrice: number): number {
            var x: number = this.elapsed / 30000;
            var y: number = Math.sin(x);
            var range: number = _originalPrice / 4;
            var delta: number = range * y;
            return _originalPrice + delta;
        }

        public update(_dt: number): void {
            this.elapsed += _dt;
        }
    }
}