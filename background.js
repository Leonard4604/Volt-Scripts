async function extractHwid() {
    return new Promise((resolve) => {
        chrome.system.storage.getInfo((info) => {       
            resolve(info[0].id)
        });
    })
}

const getHwid = async (request, sender, sendResponse) => {
    const hwid = await extractHwid();
    chrome.runtime.sendMessage({ hwid: hwid })
    return hwid;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo === 'extractHwid') {
        try {
            getHwid(request, sender, sendResponse)
            sendResponse({status: 'received'})
            return true;
        }
        catch {
            sendResponse({status: 'not received'})
            return false;
        }
    }
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo === 'getVersion') {
        try {
            const manifestData = chrome.runtime.getManifest();
            chrome.runtime.sendMessage({ version: manifestData.version })
            sendResponse({status: 'received'})
            return true;
        }
        catch {
            sendResponse({status: 'not received'})
            return false;
        }
    }
})