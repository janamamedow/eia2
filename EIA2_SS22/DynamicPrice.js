var EIA2;
(function (EIA2) {
    class DynamicPrice {
        constructor() {
            this.elapsed = Math.random() * 1000000;
        }
        /* Berechnet einen schwankenden Preis. Ausgehend ist der Original Verkauspreis.
        Dort wird ein Wert zwischen +1/4 bis - 1/4 des Verkauspreises drauf gerechnet.
        Als Funktion wird der Sinus verwendet. Dann schwankt der Verkauspreis zwischen
        Originalpreis - 1/4 des Originalpreises und Originalpreis + 1/4 des Originalpreises. */
        getPrice(_originalPrice) {
            var x = this.elapsed / 30000;
            var y = Math.sin(x);
            var range = _originalPrice / 4;
            var delta = range * y;
            return _originalPrice + delta;
        }
        update(_dt) {
            this.elapsed += _dt;
        }
    }
    EIA2.DynamicPrice = DynamicPrice;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=DynamicPrice.js.map