# CertSnatcher

Ti serve il certificato TLS di un sito, magari in formato JKS da dare in pasto a
un'applicazione Java? CertSnatcher lo prende per te: apri il sito in Firefox,
clicchi l'icona dell'estensione e scarichi il certificato in PEM o in JKS.

Il progetto ha due parti che lavorano insieme: un'estensione per Firefox, che
legge il dominio della scheda attiva, e un piccolo backend Spring Boot in
Kotlin, che si collega al dominio, recupera il certificato e lo restituisce nel
formato richiesto.

> Stato: non più sviluppato attivamente. Le ultime modifiche al codice risalgono al 2023.

## Com'è fatto

- `Plugin/Firefox/CertSnatcher/`: l'estensione Firefox (manifest, popup,
  background). Il popup ha due pulsanti: **Certificato PEM** e **Certificato JKS**.
- `Java/CertSnatcher/`: il backend Spring Boot scritto in Kotlin (controller,
  servizio, DTO e mapper) che riceve il dominio ed elabora il certificato.
- `Bash/`: rimanda allo script shell equivalente, che vive nel repository
  [the-scriptorium](https://github.com/XtremeAlex/the-scriptorium/tree/develop/certsnatcher).

## Stack

- Estensione: JavaScript (WebExtension API, manifest v2)
- Backend: Kotlin, Spring Boot, Maven (Java 17)

## Avviare il backend

```bash
cd Java/CertSnatcher
./mvnw clean package
./mvnw spring-boot:run
```

Di default il servizio risponde su `http://localhost:8080/certsnatcher-ms`
(porta modificabile con la variabile `PORT`). Endpoint principali:

| Metodo | Percorso | Cosa fa |
|---|---|---|
| GET | `/isAlive` | controllo di vita del servizio |
| POST | `/getPEMByDominio` | restituisce il certificato PEM del dominio |
| POST | `/downloadPEMByDominio` | scarica il certificato PEM come file |
| POST | `/getJKSByDominio` | restituisce un keystore JKS con il certificato |
| POST | `/downloadJKSByDominio` | scarica il keystore JKS come file |

La documentazione OpenAPI è disponibile su `/swagger-ui.html`.

Nota: il backend non ha autenticazione. È pensato per girare sulla tua
macchina, accanto al browser; non esporlo in rete così com'è.

## Installare l'estensione Firefox

1. Apri `about:debugging#/setup` (poi **Questo Firefox**).
2. Scegli **Carica componente aggiuntivo temporaneo**.
3. Seleziona il `manifest.json` in `Plugin/Firefox/CertSnatcher/src/`.

L'estensione chiama il backend su `http://localhost:8080/certsnatcher-ms`, quindi
avvia prima il backend.

## Licenza
Distribuito sotto licenza Apache 2.0. Vedi [`LICENSE`](LICENSE).

## Contatti

Andrei Alexandru Dabija (XtremeAlex) · [alexdabi92@gmail.com](mailto:alexdabi92@gmail.com) · [2ad.bubume.it](https://2ad.bubume.it/) · [LinkedIn](https://www.linkedin.com/in/andrei-alexandru-dabija/) · [github.com/XtremeAlex](https://github.com/XtremeAlex)
