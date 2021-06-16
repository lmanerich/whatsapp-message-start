var WHATSAPP_URL = 'https://wa.me/';

startMessage.addEventListener('click', async () => {
    await sendMessage();
});

async function sendMessage() {
    var phoneNumber = document.getElementById('phoneNumber').value;
    if (phoneNumber.lenght < 10) {
        console.log('min phone');
        alert('Informe o DDD');
        return;
    }

    if (phoneNumber.indexOf("55") !== 0) {
        phoneNumber = "55" + phoneNumber;
    }

    phoneNumber = phoneNumber.replace(/\D/g,'');

    var tab = await openWhatsAppTab();
    console.log(tab);
    await chrome.tabs.update(tab.id, { url: WHATSAPP_URL + phoneNumber, active: true });
    window.close();
}

async function openWhatsAppTab() {
    return chrome.tabs
        .query({ url: '*://web.whatsapp.com/*' })
        .then((tabs) => {
            console.log('tab query');
            console.log(tabs);
            if (tabs.length === 1) {
                return tabs[0];
            }

            return chrome.tabs.create({});
        })
        .then((tab) => {
            console.log('tab created');
            console.log(tab);
            if (!tab) return;

            return tab;
        });
}
