/**
 * Poiché non possiamo ottenere direttamente il certificato SSL/TLS tramite l'API WebExtensions,
 * ho pensato di procedere nel seguente modo:
 * 1. Recuperare il nome di dominio della scheda corrente
 * 2. Inviare una richiesta POST al servizio `certsnatcher-ms` per ottenere il certificato PEM o JKS
 * 3. Salvare il certificato nel formato .pem e .jks
 */
document.getElementById("button1").addEventListener("click", function() {
    browser.runtime.sendMessage({command: "saveFilePEM"});

    try {
        browser.runtime.sendMessage({command: "getDomain"}).then(response => {
            const dominio = response.domain;
            document.getElementById("terminal").textContent = dominio;
            inviaRichiestaPerCertificatoPEM(dominio);
        }).catch(error => {
            console.error("Errore nel recupero del dominio:", error);
            nascondiElementi();
        });
    } catch (error) {
        console.error("Errore:", error);
        nascondiElementi();
    }

});

document.getElementById("button2").addEventListener("click", function() {
    browser.runtime.sendMessage({command: "saveFileJKS"});

    try {
        browser.runtime.sendMessage({command: "getDomain"}).then(response => {
            const dominio = response.domain;
            document.getElementById("terminal").textContent = dominio;
            inviaRichiestaPerCertificatoJKS(dominio);
        }).catch(error => {
            console.error("Errore nel recupero del dominio:", error);
            nascondiElementi();
        });
    } catch (error) {
        console.error("Errore:", error);
        nascondiElementi();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    try {
        browser.runtime.sendMessage({command: "getDomain"}).then(response => {
            const dominio = response.domain;
            document.getElementById("terminal").textContent = dominio;
            //inviaRichiestaPerCertificato(dominio);
        }).catch(error => {
            console.error("Errore nel recupero del dominio:", error);
            nascondiElementi();
        });
    } catch (error) {
        console.error("Errore:", error);
        nascondiElementi();
    }
});

function nascondiElementi() {
    document.querySelectorAll("button").forEach(button => {
        button.style.display = 'none';
    });
    document.querySelector("h4").style.display = 'none';
}

function inviaRichiestaPerCertificatoPEM(dominio) {
    fetch('http://localhost:8080/certsnatcher-ms/getCertificatoByDominio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dominio: dominio })
    })
        .then(response => response.json())
        .then(data => {
            salvaCertificato(data.certificato);
        })
        .catch(error => console.error('Errore durante il salvataggio del certificato:', error));
}

function salvaCertificato(certificato) {
    const link = document.createElement('a');
    link.href = 'data:application/x-pem-file;base64,' + certificato.byte;
    link.download = `${certificato.nome}.pem`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function inviaRichiestaPerCertificatoJKS(dominio) {
    fetch('http://localhost:8080/certsnatcher-ms/getCertificatoJks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dominio: dominio })
    })
        .then(response => response.json())
        .then(data => {
            salvaCertificatoJKS(data.certificato);
        })
        .catch(error => console.error('Errore durante il salvataggio del certificato:', error));
}

function salvaCertificatoJKS(certificato) {
    const link = document.createElement('a');
    link.href = 'data:application/octet-stream;base64,' + certificato.byte;
    link.download = `${certificato.nome}.jks`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
