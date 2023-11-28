let currentTabId;

/*
browser.runtime.onMessage.addListener((message) => {
    switch (message.command) {
        case "action1":
            console.info("action1");
            break;
        case "action2":
            console.info("action2");
            break;
        default:
            console.info("Unknown command:", message.command);
    }
});
*/

/*
// Funzione per ottenere l'ID della scheda corrente
async function getCurrentTabId() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await browser.tabs.query(queryOptions);
    return tab.id;
}
*/

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
/*
browser.runtime.onMessage.addListener((message) => {
    if (message.command === "saveFile") {
        browser.downloads.download({
            url: URL.createObjectURL(new Blob(["Contenuto del file"], {type: 'text/plain'})),
            filename: "nomefile.txt",
            saveAs: true // Chiede all'utente di scegliere dove salvare il file
        });
    }
});
*/
