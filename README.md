# Pilvipalvelut web-kehityksessä — Viikko 4

**Vite + React + TypeScript + Firebase Authentication + Local Storage**

Tässä harjoituksessa käyttäjä kirjautuu Firebase Authenticationin **Email/Password**-tunnuksella, ja sovellus hakee tai luo hänelle käyttäjäkohtaisen koodinimen selaimen Local Storagesta. Koodinimen avain sisältää Firebase UID:n (`codename:<uid>`). Kirjautuneen käyttäjän sähköposti, UID ja koodinimi näytetään näkymässä. Uloskirjautuminen toimii.

Perustuu kurssin [viikon 4 tehtävänantoon](https://github.com/Pilvipalvelut/web-kehityksessa/blob/main/tehtavat.md). Ei sisällä valmiita Firebase-tunnuksia tai testikäyttäjää.

## 1. Firebase Console (tehtävän pakollinen käyttöönotto)

1. Avaa https://console.firebase.google.com/ ja luo projekti `pilvipalvelut-viikko4`. Voit jättää Google Analyticsin pois.
2. Lisää **Web**-sovellus (</>). Anna nimeksi esimerkiksi `koodinimipalvelu`.
3. Avaa **Authentication → Get started → Sign-in method → Email/Password → Enable → Save**.
4. Avaa **Authentication → Users → Add user**. Tee **vain tätä kurssia varten erillinen testikäyttäjä** ja uusi satunnainen salasana. Älä käytä omaa salasanaasi. Testitunnukset luovutetaan opettajalle vain sovittua palautuskanavaa pitkin.
5. Avaa **Authentication → Settings → Authorized domains**. Lisää tarvittaessa `eemelisipila.github.io` ja `localhost` (ei `https://`-alkua eikä polkuja).
6. Kopioi Firebase-projektisi web-sovelluksen **firebaseConfig**-kenttien arvot (Project settings → Your apps).

HUOM: Opettajan tehtävänannossa lukee paikoin 'Google-kirjautuminen', mutta varsinainen ohje ja koodi ovat **sähköposti/salasana-kirjautumiselle**. Tässä toteutetaan ne.

## 2. Paikallinen käyttö Windowsissa

1. Pura ZIP-paketti. Avaa tämän projektin kansio VS Codessa.
2. Kopioi `.env.example` samaan kansioon nimellä `.env` ja täytä kaikki viisi arvoa Firebase Consolesta (älä lisää lainausmerkkejä):

   ```text
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_MESSAGING_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

3. Avaa terminaali projektikansiossa ja suorita **PowerShellissä**:

   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```

4. Avaa terminaalin ilmoittama localhost-osoite. Kirjaudu testikäyttäjällä. Testaa uloskirjautuminen, uudelleen kirjautuminen ja sama koodinimi sivun päivittämisen jälkeen.
5. Tarkista tuotantokäännös erillisessä terminaalissa:

   ```powershell
   npm.cmd run build
   ```

Vite käyttää `.env`-tiedoston arvoja **build-vaiheessa**. Jos muokkaat `.env`-tiedostoa, käynnistä dev-palvelin uudelleen.

## 3. GitHub Pages -julkaisu

1. Luo GitHubissa **uusi julkinen repositorio** nimeltä täsmälleen `pilvipalvelut-viikko4`. Suositus: älä lisää aluksi automaattista README:tä.
2. Avaa repositorion `uploading an existing file` -toiminto. Raahaa ZIPistä puretun projektin sisältö, mukaan lukien `.github/workflows/deploy.yml`. **Älä lataa** `.env`, `node_modules` tai `dist` -kansioita. `.gitignore` ja `.env.example` voidaan ladata.
3. Varmista, että GitHubissa näkyy `.github/workflows/deploy.yml` ja `src/App.tsx`.
4. Avaa repositoriossa **Settings → Secrets and variables → Actions → Variables → New repository variable**. Luo viisi muuttujaa **täsmälleen** näillä nimillä: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_MESSAGING_ID`, `VITE_FIREBASE_APP_ID`. Anna niille vastaavat `firebaseConfig`-arvot.
5. Avaa **Settings → Pages → Build and deployment → Source: GitHub Actions**.
6. Avaa **Actions → Julkaise GitHub Pagesiin → Run workflow**, jos ensimmäinen automaattinen ajo ehti epäonnistua ennen muuttujien lisäämistä.
7. Odota onnistunutta vihreää ajoa ja avaa GitHub Pages -osoite, joka on tämän repositorion nimellä:

   `https://eemelisipila.github.io/pilvipalvelut-viikko4/`

8. Lisää **Firebase Auth → Authorized domains** -listaan `eemelisipila.github.io`, jos puuttuu.
9. Testaa julkaistu sivu kirjautumalla erillisellä testitunnuksella selaimen yksityisessä ikkunassa.

**Huom:** Firebase-web-sovelluksen `apiKey`/`authDomain` ym. ovat julkisia asiakaskonfiguraation arvoja, **eivät salasanoja**. Vite upottaa `VITE_`-muuttujat selaimelle toimitettavaan JavaScriptiin. Älä koskaan laita Firebase Admin SDK:n palvelutilin yksityistä avainta, oman Google-tilisi kirjautumistietoja tai muita salaisuuksia näihin muuttujiin. Älä myöskään lähetä testitunnuksia GitHubiin.

## 4. Mitä Teamsiin palautetaan

Opettajan tehtävänannon mukaan lähetä viikon 4 **Tehtäväpalautukset**-keskusteluun GitHub-repositorion linkki **ja** GitHub Pages -sivuston linkki. Teamsin ohje pyytää myös testitunnuksia. Lähetä vain harjoitusta varten luotu käyttäjätunnus ja salasana opettajan ohjeistamalla tavalla; älä laita niitä julkiseen GitHub-repositorioon.

Varmista, että GitHub Pages toimii ennen palautusta. `npm run build` yksin ei vielä julkaise verkkosivua.

## Tiedostot

| Tiedosto | Tarkoitus |
|---|---|
| `firebaseConfig.ts` | Firebase-asetusten lukeminen Vite-ympäristömuuttujista |
| `src/authService.ts` | Firebase Auth -kirjautuminen ja uloskirjautuminen |
| `src/LoginForm.tsx` | Sähköposti/salasana-lomake ja virheilmoitukset |
| `src/codenameService.ts` | Koodinimen generointi ja UID-kohtainen Local Storage |
| `src/App.tsx` | Auth-tilan seuranta ja käyttöliittymä |
| `.github/workflows/deploy.yml` | GitHub Pages -automaattijulkaisu |

## Testauslista

- [ ] Kirjautuminen oikeilla tunnuksilla onnistuu
- [ ] Väärä salasana näyttää virheen
- [ ] Käyttäjän sähköposti ja UID näytetään
- [ ] Koodinimi generoituu ja tallentuu avaimelle `codename:<uid>`
- [ ] Sivun päivitys säilyttää käyttäjän koodinimen
- [ ] Uloskirjautuminen palauttaa kirjautumislomakkeen
- [ ] GitHub Pages toimii toisella selaimella

## Kehittäjälle

Vite `base`-asetus on määritetty GitHub Pages -alikansioksi `/pilvipalvelut-viikko4/`. Jos repositorion nimi vaihtuu, vaihda myös `vite.config.ts`-tiedoston `base`.
