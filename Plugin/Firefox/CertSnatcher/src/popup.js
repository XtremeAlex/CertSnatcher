/**
 * Dato che non possiamo ottenere direttamente il certificato SSL/TLS tramite l'API WebExtensions
 * ho pensato che potremmo procedere come segue:
 */

document.getElementById("button1").addEventListener("click", async function () {

     // Invia un messaggio allo script di background per ottenere il certificato
     browser.runtime.sendMessage({command: "getCertificate"}).then(response => {
         console.log("Certificato:", response.certificate);
     }).catch(error => {
         console.error("Errore nel recupero del certificato:", error);
     });

    //const url = "https://example.com";

    // Richiedi il certificato del server
    const certificate = await browser.webNavigation.getCertificate(url, {
        server: true,
    });

    // Salva il certificato in un file
    fs.writeFileSync("certificate.pem", certificate);

});

document.getElementById("button2").addEventListener("click", function() {
    browser.runtime.sendMessage({command: "action2"});
});

document.getElementById("button3").addEventListener("click", function() {
    browser.runtime.sendMessage({command: "action3"});
});


document.getElementById("button4").addEventListener("click", function() {
    browser.runtime.sendMessage({command: "action4"});
});

function salvaCertificato(certificateData, nomeCertificato) {
    const blob = new Blob([certificateData], {type: 'application/x-pem-file'});
    const url = URL.createObjectURL(blob);

    browser.downloads.download({
        url: url,
        filename: `${nomeCertificato}.pem`,
        saveAs: true // Opzionale: chiede all'utente dove salvare il file
    }).then(id => {
        console.log("Download iniziato:", id);
    }).catch(error => {
        console.error("Errore nel download:", error);
    });
}


/*
document.addEventListener("DOMContentLoaded", function() {
    // Invia un messaggio allo script di background per richiedere il dominio
    browser.runtime.sendMessage({command: "getDomain"}).then(response => {
        // Imposta il testo del div #terminal con il dominio ricevuto
        document.getElementById("terminal").textContent = response.domain;
    });
});
*/

document.addEventListener("DOMContentLoaded", function() {
    try {
        browser.runtime.sendMessage({command: "getDomain"}).then(response => {
            document.getElementById("terminal").textContent = response.domain;
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

