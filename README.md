# CertSnatcher

Strumento per catturare ed esportare i certificati TLS di un sito, composto da
un'estensione browser e un backend che ne gestisce l'elaborazione.

## Componenti

- `Plugin/Firefox/CertSnatcher/` — estensione Firefox (manifest, popup, background) che intercetta il certificato del sito visitato
- `Java/CertSnatcher/` — backend Spring Boot in Kotlin (API, DTO, mapper) per ricevere ed elaborare i certificati
- `Bash/` — script di supporto

## Stack

- Estensione: JavaScript (WebExtension API)
- Backend: Kotlin, Spring Boot, Maven

## Backend — build ed esecuzione

```bash
cd Java/CertSnatcher
./mvnw clean package
./mvnw spring-boot:run
```

## Estensione Firefox

Caricala come estensione temporanea da `about:debugging` puntando al
`manifest.json` in `Plugin/Firefox/CertSnatcher/src/`.

## License

Vedi `LICENSE`.

## Contatti

Andrei Alexandru Dabija — [github.com/XtremeAlex](https://github.com/XtremeAlex)
