var uno;
(function (uno) {
    var farben = ["blue", "red", "yellow", "green"]; //alle Farben die wir haben, werden festgelegt
    var aktionsKarten = ["+2", "<>", "A"]; // 8 stk / 2 pro Farbe
    var jokerKarten = ["FW", "+4"]; // 4 pro Joker
    var zahlenKarten = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    //die restlichen Spielkarten
    var kartendeck;
    //meine eigenen Karten auf der Hand
    var meineKarten;
    //eine Klasse, damit werden die Karten beschrieben, Farbe und Zahl oder Zeichen
    var Karte = (function () {
        function Karte(_farbe, _art) {
            this.farbe = _farbe; //this= der Zugriff auf die Farbe und Art bzw Zeichen
            this.art = _art;
        }
        return Karte;
    }());
    // Spiel wird initialisiert
    function start() {
        var str = prompt("Bitte die Spielkartenanzahl auswählen: ", "5");
        var anzahl = Number(str);
        erzeugeAlleKarten(); //Funktionsaufruf
        meineKarten = [];
        for (var i = 0; i < anzahl; i++) {
            zufallskarteZiehen(); //Funktionsaufruf
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
                    kartendeck.push(karte); //Karte wird auf den Stapel gelegt
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
        // Zufälliger Index wird erzeugt, welche Karte aus dem Deck gezogen wird
        var index = Math.floor(Math.random() * anzahlVerbleibenderKartenImStapel);
        // Karte aus dem Deck holen
        var karte = kartendeck[index];
        // Die Karte wird aus dem Deck entfernt, damit die nicht doppelt gezogen wird.
        kartendeck.splice(index, 1);
        meineKarten.push(karte); // Die Karte wird auf meinen Stapel gelegt
    }
    function meineKartenZeichnen() {
        for (var i = 0; i < meineKarten.length; i++) {
            var karte = meineKarten[i];
            //<div class="card">  und die Erzeugung von einem HTML Tags, damit die Karten angezeigt werden
            var card = document.createElement("div");
            card.className = "card";
            // <div class="bg green"></div> 
            var bg = document.createElement("div");
            bg.className = "bg " + karte.farbe;
            card.appendChild(bg); // der Hintergrund dieser Karte wird hinzugefügt
            // <div class="circle"></div> und Ellipse wird ebenfalls hinzugefügt
            var kreis = document.createElement("div");
            kreis.className = "circle";
            card.appendChild(kreis); // Hinzufügen der Ellipse für die Optik
            //  <div class="top-left">9</div> 
            var obenLinks = document.createElement("div");
            obenLinks.className = "top-left";
            obenLinks.innerHTML = karte.art; // Das Motiv der Karte, Zahl oder Zeichen
            card.appendChild(obenLinks); // Die Zahl wird oben links zur Karte hinzugefügt
            //  <div class="center">9</div> 
            var zentrum = document.createElement("div");
            zentrum.className = "center";
            zentrum.innerHTML = karte.art; // Das Hinzufügen der Zahl zentriert auf die Karte
            card.appendChild(zentrum); // Die Zahl wird zentriert und hinzugefügt
            // <div class="bottom-right">9</div> 
            var untenRechts = document.createElement("div");
            untenRechts.className = "bottom-right";
            untenRechts.innerHTML = karte.art;
            card.appendChild(untenRechts);
            var style = card.style;
            style.left = 10 + i * 100 + "px";
            style.bottom = "10px";
            document.body.appendChild(card); // Karte wird im HTML-Body hinzugefügt
        }
    }
    document.addEventListener("DOMContentLoaded", start);
})(uno || (uno = {}));
//# sourceMappingURL=aufgabe2.js.map