chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.luisaviaroma === "cancelOrder") {
        document.querySelectorAll('.cancel-order-button').forEach((item, index) => {
            item.removeAttribute('style')
        })
        sendResponse({farewell: "goodbye"});
        return true;
    }
}); 

async function executeScript() {
    const [snipes, volt] = await extractStorage()
    if (volt.active && snipes.status === true) {
        checkDevtools(volt.key, volt.version)
    }
}

executeScript()