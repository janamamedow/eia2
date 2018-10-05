/* Aufgabe 0
Name: Jana Mamedow
Matrikel: 259112
Datum: 05.10.2018
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe.
Er wurde nicht kopiert und auch nicht diktiert. */

namespace aufgabe0 {
    var i : string ="";
    function main() {
        var i = prompt("Who this?"); // Anzeige der Promptbox + Text
        var node : any = document.getElementById("innerHtml"); // Schnittstelle HTML Dokument
        node.innerHTML += "Hello"; // angezeigter Text
        node.innerHTML += i;
        node.innerHTML += ", schön, dass du hier bist.";
        console.log("Hola ",i,", schön dich hier zu begrüßen!");
        }

    
document.addEventListener('DOMContentLoaded',main);
}