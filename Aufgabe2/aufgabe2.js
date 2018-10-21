var uno;
(function (uno) {
    var farben = ["blue", "red", "yellow", "green"];
    var aktionsKarten = ["+2", "<>", "A"]; // 8 stk / 2 pro Farbe
    var jokerKarten = ["FW", "+4"]; // 4 pro Joker
    var zahlenKarten = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var kartendeck;
    var meineKarten;
    var Karte = (function () {
        function Karte(_farbe, _art) {
            this.farbe = _farbe;
            this.art = _art;
        }
        return Karte;
    }());
    function start() {
        var str = prompt("Bitte die Spielkartenanzahl auswählen: ", "5");
        var anzahl = Number(str);
        erzeugeAlleKarten();
        meineKarten = [];
        for (var i = 0; i < anzahl; i++) {
            zufallskarteZiehen();
        }
        meineKartenZeichnen();
    }
    function erzeugeAlleKarten() {
        kartendeck = [];
        for (var i = 0; i < farben.length; i++) {
            var farbe = farben[i];
            // Aktionskarten
            for (var j = 0; j < 2; j++) {
                for (var k = 0; k < aktionsKarten.length; k++) {
                    var art = aktionsKarten[k];
                    var karte = new Karte(farbe, art);
                    kartendeck.push(karte);
                }
            }
            // Zahlenkarten
            for (j = 0; j < 4; j++) {
                for (k = 0; k < zahlenKarten.length; k++) {
                    art = zahlenKarten[k];
                    karte = new Karte(farbe, art);
                    kartendeck.push(karte);
                }
            }
        }
        // Jokerkarten
        for (i = 0; i < 4; i++) {
            for (j = 0; j < jokerKarten.length; j++) {
                art = jokerKarten[j];
                karte = new Karte(farbe, art);
                kartendeck.push(karte);
            }
        }
    }
    function zufallskarteZiehen() {
        console.log("Hello");
        // Anzahl verbleibender Karten im Kartendeck
        var anzahlVerbleibenderKartenImStapel = kartendeck.length;
        // Zufälligen Index erzeugen, welche Karte wir aus dem kartendeck nehmen
        var index = Math.floor(Math.random() * anzahlVerbleibenderKartenImStapel);
        // Karte aus dem Kartendeck holen
        var karte = kartendeck[index];
        // Karte aus dem Deck entfernen, damit diese nicht doppelt gezogen werden kann
        kartendeck.splice(index, 1);
        meineKarten.push(karte);
    }
    function meineKartenZeichnen() {
        for (var i = 0; i < meineKarten.length; i++) {
            var karte = meineKarten[i];
            //<div class="card"> 
            var card = document.createElement("div");
            card.className = "card";
            // <div class="bg green"></div> 
            var bg = document.createElement("div");
            bg.className = "bg " + karte.farbe;
            card.appendChild(bg);
            // <div class="circle"></div> 
            var kreis = document.createElement("div");
            kreis.className = "circle";
            card.appendChild(kreis);
            //  <div class="top-left">9</div> 
            var obenLinks = document.createElement("div");
            obenLinks.className = "top-left";
            obenLinks.innerHTML = karte.art;
            card.appendChild(obenLinks);
            //  <div class="center">9</div> 
            var zentrum = document.createElement("div");
            zentrum.className = "center";
            zentrum.innerHTML = karte.art;
            card.appendChild(zentrum);
            // <div class="bottom-right">9</div> 
            var untenRechts = document.createElement("div");
            untenRechts.className = "bottom-right";
            untenRechts.innerHTML = karte.art;
            card.appendChild(untenRechts);
            var style = card.style;
            style.left = 10 + i * 100 + "px";
            style.bottom = "10px";
            document.body.appendChild(card);
        }
    }
    document.addEventListener("DOMContentLoaded", start);
})(uno || (uno = {}));
//# sourceMappingURL=aufgabe2.js.map