# Website Studio Anja

De website van Studio Anja, praktijk voor voetreflextherapie en holistische total body massage in Uden.
Gewone HTML, CSS en een beetje JavaScript. Geen framework en geen build tools: wat hier staat, is precies wat online komt.

## Mappenstructuur

```
studio-anja/
├── index.html                       De homepage
├── behandelingen/index.html         Behandelingen en tarieven
├── over-mij/index.html              Over Anja
├── veelgestelde-vragen/index.html   Veelgestelde vragen
├── algemene-voorwaarden/index.html  Algemene voorwaarden
├── assets/
│   ├── css/style.css                Alle opmaak. Kleuren en lettertypes staan bovenaan als variabelen.
│   ├── js/main.js                   Mobiel menu, header bij scrollen, rustig infaden
│   └── img/                         Foto's (WebP), logo en favicons
├── robots.txt                       Vertelt zoekmachines wat ze mogen bekijken
├── sitemap.xml                      Lijst met alle pagina's voor Google
└── README.md                        Dit bestand
```

### Waarom elke pagina een eigen map heeft

Elke pagina is een `index.html` in een eigen map. Daardoor is het adres netjes `studio-anja.nl/behandelingen/`,
precies zoals op de oude WordPress-site. Google kent die adressen al, dus de vindbaarheid blijft behouden.

### Relatieve paden

Links en afbeeldingen gebruiken relatieve paden. Vanuit de homepage is dat `assets/...`,
vanuit een submap `../assets/...` (`..` betekent: één map omhoog).
Zo werkt de site zowel op het tijdelijke GitHub Pages adres als later op het echte domein.

### Header en footer staan op elke pagina

Zonder build tools kun je de header en footer niet in één apart bestand zetten.
Pas je iets aan in het menu, de contactgegevens of de openingstijden? Doe dat dan op **alle vijf** de pagina's.
Tip: zoek in je editor op de tekst die je wilt veranderen in de hele map ("zoeken in bestanden").

## Kleuren

| Variabele        | Kleur     | Gebruik                                    |
|------------------|-----------|--------------------------------------------|
| `--mauve`        | `#b2879f` | Vlakken, accenten, voetreflex              |
| `--oudroze`      | `#cca29f` | Accent                                     |
| `--salie`        | `#b1c09e` | Vlakken voor holistische massage           |
| `--nachtblauw`   | `#192a3d` | Lopende tekst                              |
| `--bg`           | `#f9f6f8` | Achtergrond                                |
| `--bg-roze`      | `#f8f1f5` | Achtergrond, iets rozer                    |
| `--mauve-donker` | `#8a5f78` | Mauve **tekst** en knoppen (beter leesbaar) |
| `--salie-donker` | `#5f7050` | Groene **tekst** (beter leesbaar)          |

De lichte huisstijlkleuren zijn prachtig als vlak, maar te licht om als tekst goed leesbaar te zijn.
Daarom zijn er donkere varianten voor tekst.

## Lettertypes

- **Playfair Display** voor koppen
- **Montserrat** voor de lopende tekst

Beide worden geladen via Google Fonts (zie de `<head>` van elke pagina).

## Salonized

De boekingswidget van Salonized staat onderaan elke pagina, vlak voor `</body>`.
Die code niet aanpassen. Let op: lokaal (op `localhost`) laadt Salonized een testversie, dus de widget
kun je pas echt testen op het GitHub Pages adres.

## Foto's toevoegen

1. Zet de foto om naar WebP, in twee formaten: 800 en 1600 pixels aan de langste kant.
2. Geef hem een beschrijvende naam met kleine letters en streepjes, zoals `voetreflex-behandeling-uden-800.webp`.
3. Schrijf een `alt` tekst in het Nederlands die beschrijft wat er op de foto staat.

## Lokaal bekijken

Open de map in VS Code en gebruik de extensie **Live Server** (rechtsklik op `index.html` > "Open with Live Server").
Dubbelklikken op `index.html` werkt ook, maar dan openen de links naar andere pagina's een map in plaats van de pagina.
