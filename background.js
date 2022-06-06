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

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.todo === 'clearCookies') {
        const site = await getCurrentTab()
        chrome.cookies.getAll({domain: site}, function(cookies) {
            for(var i=0; i<cookies.length;i++) {
              console.log(cookies[i]);
            
              chrome.cookies.remove({url: "https://" + cookies[i].domain  + cookies[i].path, name: cookies[i].name});
            }
        });
    }
})

async function getCurrentTab() {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            resolve(tabs[0].url.split("/")[2].replace('www.', ''))
        });
    })
}