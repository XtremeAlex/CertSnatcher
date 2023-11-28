/**
 * Poiché non possiamo ottenere direttamente il certificato SSL/TLS tramite l'API WebExtensions,
 * ho pensato di procedere nel seguente modo:
 * 1. Recuperare il nome di dominio della scheda corrente
 * 2. Inviare una richiesta POST al servizio `certsnatcher-ms` per ottenere il certificato PEM o JKS
 * 3. Salvare il certificato nel formato .pem e .jks
 */

// Funzione per gestire l'errore restituito da fetch()
function handleError(error) {
    console.error(error);
    document.getElementById("terminal").textContent = "Errore: " + error.message;
}

document.addEventListener("DOMContentLoaded", function() {
    try {
        browser.runtime.sendMessage({command: "getDomain"}).then(response => {
            const dominio = response.domain;
            document.getElementById("terminal").textContent = dominio;
        }).catch(error => {
            console.error("Errore nel recupero del dominio:", error);
            nascondiElementi();
        });
    } catch (error) {
        console.error("Errore:", error);
        nascondiElementi();
    }

    document.getElementById("button1").addEventListener("click", function() {
        inviaRichiestaPerCertificato("PEM", document.getElementById("terminal").textContent, handleError);
    });

    document.getElementById("button2").addEventListener("click", function() {
        inviaRichiestaPerCertificato("JKS", document.getElementById("terminal").textContent, handleError);
    });
});

function nascondiElementi() {
    document.querySelectorAll("button, h4").forEach(elem => {
        elem.style.display = 'none';
    });
}

// Variabile globale per memorizzare l'URL del servizio
const URL_SERVIZIO = "http://localhost:8080/certsnatcher-ms";

function inviaRichiestaPerCertificato(tipo, dominio, handleError) {
    const url = URL_SERVIZIO + "/get" + tipo + "ByDominio";

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dominio: dominio })
    })
        .then(response => response.json())
        .then(data => {
            salvaCertificato(data.certificato, tipo);
        })
        .catch(handleError);
}

function salvaCertificato(certificato, tipo) {
    const mimeType = tipo === "PEM" ? 'application/x-pem-file' : 'application/octet-stream';
    const link = document.createElement('a');

    link.href = `data:${mimeType};base64,${certificato.byte}`;
    link.download = `${certificato.nome}.${certificato.formato}`;

    document.body.appendChild(link);
    //Viene simulato un click
    link.click();
    document.body.removeChild(link);
}
