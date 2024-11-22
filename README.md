Ondřej Rajnet - Osobní web
Tento projekt je oficiálním webem Ondřeje Rajneta. Web poskytuje informace o konzultacích a službách v oblasti financí, investic a mindsetu. Web je postaven pomocí Astro a TailwindCSS.

Náhled
Web je dostupný na:
https://www.ondrejrajnet.cz

Instalace
Pokud chcete tento projekt spustit lokálně, postupujte podle následujících kroků:

1. Klonování repozitáře
Klonujte tento repozitář do vašeho lokálního zařízení:

bash
Zkopírovat kód
git clone https://github.com/OnRajnet/personal.git
cd personal
2. Instalace závislostí
Nainstalujte všechny potřebné závislosti pomocí jednoho z následujících příkazů:

bash
Zkopírovat kód
npm install
# nebo
yarn install
# nebo
pnpm install
3. Spuštění vývojového serveru
Spusťte vývojový server:

bash
Zkopírovat kód
npm run dev
# nebo
yarn dev
# nebo
pnpm dev
Výchozí server poběží na http://localhost:3000.

Struktura projektu
Tento projekt je strukturován následujícím způsobem:

css
Zkopírovat kód
/
├── public/
│   └── Obrázky, favicon a statické soubory
├── src/
│   ├── components/
│   │   └── Reusable komponenty (např. Navbar, Footer)
│   ├── layouts/
│   │   └── Šablony pro stránky
│   └── pages/
│       └── Jednotlivé stránky webu
└── package.json
public/: Statické soubory (např. obrázky, favicon).
src/pages/: Obsahuje jednotlivé stránky jako index.astro, contact.astro, apod.
src/components/: Opakovaně použitelné komponenty.
src/layouts/: Layouty používané na stránkách.
Technologie
Astro: Framework pro budování moderních webů.
TailwindCSS: Utilitní CSS framework pro rychlé stylování.
Vercel: Nasazení a hosting.
Nasazení
Web byl nasazen na Vercel. Pokud chcete nasadit kopii tohoto projektu, můžete postupovat následovně:

Vytvořte si účet na Vercel.
Připojte tento repozitář.
Postupujte podle kroků na Vercelu k nasazení projektu.
Kredity
Tento projekt byl původně vytvořen pomocí šablony Astroship, která byla následně upravena a přizpůsobena pro osobní potřeby. Velké poděkování autorům původní šablony a komunitě Astro.