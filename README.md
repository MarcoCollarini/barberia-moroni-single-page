# Barberia Moroni — sito statico premium

Progetto HTML/CSS/JavaScript senza framework, CDN o backend.

## Avvio
Aprire `index.html` direttamente oppure eseguire un server locale, ad esempio `python3 -m http.server 8080`.

## Configurazione
Modificare `js/config.js` per telefono, indirizzo, link Bookizon, Instagram, servizi e orari. Gli orari inseriti sono **indicativi e da verificare prima della pubblicazione**. Anche `seo.canonical` e le coordinate sono da completare.

## Immagini
Le immagini si trovano in `assets/images/` in WebP e JPG. Sostituire mantenendo gli stessi nomi oppure aggiornare `gallery` in `config.js`. Le immagini fornite sono visual di progetto e devono essere approvate dal cliente prima dell'uso commerciale.

## Logo
`assets/logo/monogramma-mj.svg` è un monogramma provvisorio, non il logo ufficiale. Sostituirlo con il file autorizzato.

## SEO
Aggiornare canonical in `index.html`, `js/config.js` e `sitemap.xml`. Completare le coordinate solo con dati verificati. Verificare JSON-LD con Schema Markup Validator.

## Privacy
Il sito non include tracker o cookie di profilazione. `privacy.html` e `cookie.html` sono predisposizioni, non consulenza legale. Se si aggiunge Analytics, Pixel, video incorporati o mappe embed, implementare una piattaforma di consenso e aggiornare le informative.

## Pubblicazione
Caricare l'intera cartella sul document root di Apache/Nginx, oppure trascinarla su Netlify/Cloudflare Pages. Non è richiesta build.

## Verifiche prima del go-live
- orari e giorni di chiusura;
- logo ufficiale e autorizzazione immagini;
- dominio e canonical;
- coordinate;
- contenuti delle informative;
- telefono, indirizzo, Instagram e Bookizon;
- compressione finale delle immagini in base all'hosting.
