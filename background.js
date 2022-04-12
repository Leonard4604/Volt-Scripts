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
    if (request.todo == 'extractHwid') {
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

chrome.system.cpu.getInfo((info) => {       
    console.log(info)
});

chrome.system.display.getInfo((info) => {       
    console.log(info)
});

chrome.instanceID.getID((info) => { 
    console.log(info)
})