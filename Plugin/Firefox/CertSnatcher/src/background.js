let currentTabId;

browser.runtime.onMessage.addListener((message) => {
    switch (message.command) {
        case "action1":
            console.info("action1");
            break;
        case "action2":
            console.info("action2");
            break;
        case "action3":
            console.info("action3");
            break;
        default:
            console.info("Unknown command:", message.command);
    }
});

async function captureCertificate() {
    try {
        let currentTabId = await getCurrentTabId();
        // ... il resto del codice per catturare il certificato
    } catch (error) {
        console.error("Errore nella cattura del certificato:", error);
    }
}

// Funzione per ottenere l'ID della scheda corrente
async function getCurrentTabId() {

    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await browser.tabs.query(queryOptions);
    return tab.id;

}

/* Funzione per catturare il certificato */
async function captureCertificate() {
    try {
        currentTabId = await getCurrentTabId();

        // Qui, inserisci la logica per catturare il certificato

        // Nota: Non esiste un'API diretta in Firefox per ottenere il certificato di una scheda
        console.log("ID Scheda corrente:", currentTabId);

        // ... il resto del tuo codice per lavorare con il certificato

    } catch (error) {
        console.error("Errore nella cattura del certificato:", error);
    }
}

// Chiama la funzione per catturare il certificato
captureCertificate();


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "getDomain") {
        browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            let url = new URL(tabs[0].url);

            // La Risposta sarà inviata in modo asincrono
            sendResponse({domain: url.hostname});
        });

        return true;
    }
});

/**
 * CERTIFICATO
 *
 */
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "getCertificate") {
        // La logica per ottenere il certificato va qui.
        // Questo è un esempio ipotetico, potresti aver bisogno di un approccio diverso.
        getCertificateFromActiveTab().then(certificate => {
            sendResponse({certificate: certificate});
        }).catch(error => {
            console.error("Errore nell'ottenere il certificato:", error);
            sendResponse({certificate: "Errore nell'ottenere il certificato"});
        });
        // Indica che la risposta sarà inviata in modo asincrono
        return true;
    }
});
