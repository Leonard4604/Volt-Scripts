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

const API_KEY = 'pk_RBvQYAkZymGXCnOIXFF6rQFbpY9Y9i9u'
const license = {
    retrieve: async (key) => {
        try {
            const license = await fetch(`https://api.hyper.co/v6/licenses/${key}`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            }).then(res => res.json());
            return license;
        } catch {
            return false;
        }
    }
}

const extractLicense = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.key || false)
        })
    })
}

const extractActiveStatus = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.active || false)
        })
    })
}

const validate = async (key) => {
    const licenseInfo = await license.retrieve(key);

    if ((!licenseInfo) || (licenseInfo.status === "canceled")) {
        chrome.storage.sync.set({ 'active': false });
        return false
    }
    return false
}

async function checkLicense() {
    const license = await extractLicense()
    if (!license) {
        chrome.storage.sync.set({ 'active': false });
        return false
    }
    if (license) {
        await validate(license)
    }
}

(async function() {
    const isActive = await extractActiveStatus()
    if (isActive) {
        await checkLicense();
        return true;
    }
})();