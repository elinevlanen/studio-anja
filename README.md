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
├── 404.html                         Pagina "niet gevonden" (eigen opmaak, werkt op elk adres)
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
| `--bg`           | `#f9f6f8` | Achtergrond                                |
| `--bg-roze`      | `#f8f1f5` | Achtergrond, iets rozer                    |
| `--tekst-zacht`  | `#7e656f` | Kleine bijteksten en labels                |
| `--tekst`        | `#6b5560` | Lopende tekst en menu                      |
| `--salie-diep`   | `#8a9c76` | Saliegroen vlak waar witte tekst op staat  |
| `--mauve-donker` | `#8a5f78` | Mauve koppen en knoppen op een lichte achtergrond |
| `--mauve-diep`   | `#94687f` | Mauve vlak waar witte tekst op staat       |

De lichte huisstijlkleuren zijn prachtig als vlak, maar te licht om als tekst goed leesbaar te zijn.
Daarom zijn er een paar tinten donkerdere varianten, binnen dezelfde kleurfamilie.
Voor leesbare tekst geldt de norm (WCAG): tekst moet minstens 4,5 keer zoveel contrast hebben als de achtergrond.
Alle tekstkleuren hierboven halen dat. `--nachtblauw` (`#192a3d`) staat nog in de stylesheet, maar wordt niet meer gebruikt.

## Lettertypes

- **Playfair Display** voor koppen
- **Montserrat** voor de lopende tekst

Beide worden geladen via Google Fonts (zie de `<head>` van elke pagina).

## Salonized

De boekingswidget van Salonized staat onderaan elke pagina, vlak voor `</body>`.
Die code niet aanpassen. Let op: lokaal (op `localhost`) laadt Salonized een testversie, dus de widget
kun je pas echt testen op het GitHub Pages adres.

## Het stappenpad (behandelpagina)

De stappenplannen voor voetreflex en massage staan in een `<div class="stappenpad">`.
Daarin staan twee golflijnen (SVG): een liggende voor brede schermen en een staande voor tablet en telefoon.

Hoe het werkt (blok 4 in `assets/js/main.js`):

1. `meetPad` meet waar de middens van de ronde foto's staan en zet die als `--x1 --y1 --x2 --y2` op het pad. De CSS legt de lijn daar precies tussen.
2. `tekenPad` rekent bij het scrollen uit hoe ver de lijn getekend moet zijn (`--voortgang`, van 0 tot 1).
   De lijn heeft `pathLength="1"`, dus `stroke-dashoffset: calc(1 - var(--voortgang))` tekent hem precies zo ver.
3. Komt de lijn bij een stap, dan krijgt die de class `is-actief`: de ring tekent zich om de foto, het nummer verschijnt
   en de zachte vorm achter de foto begint langzaam te "ademen" (`@keyframes ademen` in de stylesheet).

Wie op zijn apparaat "minder beweging" heeft ingesteld, ziet alles meteen compleet en stil.
Zonder JavaScript zijn de lijnen verborgen en staan alle stappen gewoon open.

## Foto's toevoegen

1. Zet de foto om naar WebP, in twee formaten: 800 en 1600 pixels aan de langste kant.
2. Geef hem een beschrijvende naam met kleine letters en streepjes, zoals `voetreflex-behandeling-uden-800.webp`.
3. Schrijf een `alt` tekst in het Nederlands die beschrijft wat er op de foto staat.

## Online: GitHub Pages

De site staat op GitHub (`elinevlanen/studio-anja`) en wordt gepubliceerd met GitHub Pages.
Elke `git push` naar de branch `main` zet de nieuwe versie binnen een minuut online.

**Nu: testversie op `test.studio-anja.nl`**

- Het bestand `CNAME` vertelt GitHub op welk adres de site staat.
- `robots.txt` houdt zoekmachines voorlopig weg.
- Bij de domeinbeheerder staat een CNAME-record: `test` wijst naar `elinevlanen.github.io`.

**Later: overstappen naar `studio-anja.nl`**

1. Zet in `CNAME` het adres `studio-anja.nl`.
2. Zet `robots.txt` terug naar "alles toestaan" (de tekst staat in het bestand zelf).
3. Pas bij de domeinbeheerder de DNS aan voor het hoofddomein (de A-records van GitHub Pages).
4. Zet in GitHub bij Settings > Pages het nieuwe adres en vink "Enforce HTTPS" aan.

## Lokaal bekijken

Open de map in VS Code en gebruik de extensie **Live Server** (rechtsklik op `index.html` > "Open with Live Server").
Dubbelklikken op `index.html` werkt ook, maar dan openen de links naar andere pagina's een map in plaats van de pagina.
