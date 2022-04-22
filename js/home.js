document.addEventListener('DOMContentLoaded', async () => {
    const key = await extractKey()

    await validate(key).then(() => {
        document.querySelector(".loader").style.visibility = "hidden";
        document.querySelector(".glass").classList.add("hide");
    })
})

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
            alert('License not found')
            return false;
        }
    },
    bind: async (key, hwid) => {
        return fetch(`https://api.hyper.co/v6/licenses/${key}/metadata`, {
            method: 'PATCH',
            headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                metadata: { hwid }
            })
        })
    },
    reset: async (key) => {
        return fetch(`https://api.hyper.co/v6/licenses/${key}/metadata`, {
            method: 'PATCH',
            headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            metadata: { hwid: null }
            })
        })
    }
}

const extractHwid = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.hwid)
        })
    })
}

const extractKey = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.key)
        })
    })
}

const validate = async (key) => {
    // Prendo l'hwid corrente
    let currHwid = ''
    // Invia un messaggio al background per prendere l'hwid
    chrome.runtime.sendMessage({ todo: "extractHwid" })
    // Al ricevimento dell'hwid lo setta alla variabile
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.hwid) {
            currHwid = request.hwid;
        }
        else {
            return false;
        }
        sendResponse({status: 'received'})
        return true;
    })

    const licenseInfo = await license.retrieve(key);
    console.log(licenseInfo)

    // Prendo l'ultimo hwid nello storage
    const lastHwid = await extractHwid();

    console.log(currHwid)
    console.log(lastHwid)

    if (!licenseInfo.metadata.hwid) {
        const res = await license.bind(key, currHwid);
        console.log(res)
        chrome.storage.sync.set({ 'hwid': currHwid });
        
        return true;
    }
    else {
        if ((licenseInfo.metadata.hwid === currHwid) || (licenseInfo.metadata.hwid === lastHwid)) {
            chrome.storage.sync.set({ 'active': true });
            return true;
        }
        else {
            chrome.storage.sync.set({ 'active': false });
            return false;
        }
    }
}

const version = () => {
    chrome.runtime.sendMessage({ todo: "getVersion" })

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.version) {
            console.log(request.version)
        }
        else {
            return false;
        }
        sendResponse({status: 'received'})
        return true;
    })
}