chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    request.snipes = JSON.parse(request.snipes)
    if (request.snipes.todo === "startPid") {
        logger.display()
        process(request.snipes.pid)
        sendResponse({farewell: "goodbye"});
        return true;
    }
});

async function process(pid) {
    const body = {
        pid: pid,
        quantity: 1
    }
    const result = await addToCart(encode(body), window.location.href)
        .then(res => 
            res.json()
        )
    if (!result.error) {
        logger.update.success(`Product added to cart in size: ${result.gtm.variant}`)
    }
    window.open('https://www.snipes.it/checkout?stage=placeOrder#placeOrder','_blank');
    return true
}

async function executeScript() {
    const [snipes, volt] = await extractStorage()
    if (volt.active && snipes.status === true) {
        checkDevtools(volt.key, volt.version)
    }
}

executeScript()