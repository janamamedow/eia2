namespace uno {

    let farben: string[] = ["blue", "red", "yellow", "green"]; //alle Farben die wir haben, werden festgelegt
    let aktionsKarten: string[] = ["+2", "<>", "A"]; // 8 stk / 2 pro Farbe
    let jokerKarten: string[] = ["FW", "+4"]; // 4 pro Joker
    let zahlenKarten: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    //die restlichen Spielkarten
    var kartendeck: Karte[];
    //meine eigenen Karten auf der Hand
    var meineKarten: Karte[];

    //eine Klasse, damit werden die Karten beschrieben, Farbe und Zahl oder Zeichen
    class Karte {
        farbe: string;
        art: string;

        constructor( _farbe: string, _art: string ) {
            this.farbe = _farbe; //this= der Zugriff auf die Farbe und Art bzw Zeichen
            this.art = _art;
        }
    }
    // Spiel wird initialisiert
    function start(): void {
        var str: string = prompt( "Bitte die Spielkartenanzahl auswählen: ", "5" );
        var anzahl: number = Number( str );

        erzeugeAlleKarten(); //Funktionsaufruf
        meineKarten = [];

        for ( var i: number = 0; i < anzahl; i++ ) {
            zufallskarteZiehen(); //Funktionsaufruf
        }

        meineKartenZeichnen();
    }

    function erzeugeAlleKarten(): void { //ohne Rückgabewert
        kartendeck = [];
        for ( var i: number = 0; i < farben.length; i++ ) { //die äußere Schleife läuft 4 mal durch
            var farbe: string = farben[i];

            // Aktionskarten
            for ( var j: number = 0; j < 2; j++ ) { // nur zwei von jeder Farbe
                for ( var k: number = 0; k < aktionsKarten.length; k++ ) {
                    var art: string = aktionsKarten[k];
                    var karte: Karte = new Karte( farbe, art );
                    kartendeck.push( karte ); //Karte wird auf den Stapel gelegt
                }
            }

            // Zahlenkarten
            for ( j = 0; j < 4; j++ ) { // nur vier von jeder Farbe
                for ( k = 0; k < zahlenKarten.length; k++ ) {
                    art = zahlenKarten[k];
                    karte = new Karte( farbe, art );
                    kartendeck.push( karte );
                }
            }
        }

        // Jokerkarten
        for ( i = 0; i < 4; i++ ) {
            for ( j = 0; j < jokerKarten.length; j++ ) {
                art = jokerKarten[j];
                karte = new Karte( farbe, art );
                kartendeck.push( karte );
            }
        }
    }

    function zufallskarteZiehen(): void {   // Deklaration
        console.log( "Hello" );

        // Anzahl verbleibender Karten im Kartendeck
        var anzahlVerbleibenderKartenImStapel: number = kartendeck.length;

        // Zufälliger Index wird erzeugt, welche Karte aus dem Deck gezogen wird
        var index: number = Math.floor( Math.random() * anzahlVerbleibenderKartenImStapel );

        // Karte aus dem Deck holen
        var karte: Karte = kartendeck[index];

        // Die Karte wird aus dem Deck entfernt, damit die nicht doppelt gezogen wird.
        kartendeck.splice( index, 1 );

        meineKarten.push( karte );  // Die Karte wird auf meinen Stapel gelegt
    }

    function meineKartenZeichnen(): void { // Ohne Rückgaberecht

        for ( var i: number = 0; i < meineKarten.length; i++ ) {
            var karte: Karte = meineKarten[i];

            //<div class="card">  und die Erzeugung von einem HTML Tags, damit die Karten angezeigt werden
            let card: HTMLDivElement = document.createElement( "div" );
            card.className = "card";

            // <div class="bg green"></div> 
            let bg: HTMLDivElement = document.createElement( "div" );
            bg.className = "bg " + karte.farbe;
            card.appendChild( bg ); // der Hintergrund dieser Karte wird hinzugefügt

            // <div class="circle"></div> und Ellipse wird ebenfalls hinzugefügt
            let kreis: HTMLDivElement = document.createElement( "div" );
            kreis.className = "circle";
            card.appendChild( kreis ); // Hinzufügen der Ellipse für die Optik

            //  <div class="top-left">9</div> 
            let obenLinks: HTMLDivElement = document.createElement( "div" );
            obenLinks.className = "top-left";
            obenLinks.innerHTML = karte.art; // Das Motiv der Karte, Zahl oder Zeichen
            card.appendChild( obenLinks ); // Die Zahl wird oben links zur Karte hinzugefügt

            //  <div class="center">9</div> 
            let zentrum: HTMLDivElement = document.createElement( "div" );
            zentrum.className = "center";
            zentrum.innerHTML = karte.art; // Das Hinzufügen der Zahl zentriert auf die Karte
            card.appendChild( zentrum ); // Die Zahl wird zentriert und hinzugefügt

            // <div class="bottom-right">9</div> 
            let untenRechts: HTMLDivElement = document.createElement( "div" );
            untenRechts.className = "bottom-right";
            untenRechts.innerHTML = karte.art;
            card.appendChild( untenRechts );

            let style: CSSStyleDeclaration = card.style;
            style.left = 10 + i * 100 + "px";
            style.bottom = "10px";

            document.body.appendChild( card ); // Karte wird im HTML-Body hinzugefügt
        }
    }

    document.addEventListener( "DOMContentLoaded", start );
}