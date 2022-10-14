document.addEventListener('DOMContentLoaded', async () => {
    let key = document.querySelector('#key')
    chrome.storage.sync.get(null, function (store) {
        key.value = store.key || ''
    })

    const licenseKey = await extractLicense()
    if (licenseKey) {
        await validate(licenseKey)
    }

    document.querySelector('#bind').addEventListener('click', async () => {
        const key = document.querySelector('#key').value.replaceAll(' ', '')
        if (key) {
            const isValid = await validate(key).then((isValid) => {
                return isValid;
            })

            if (isValid) {
                window.location.href = '../html/home.html'
                return true
            }
            return false
        }
        else {
            alert('Please enter a key!')
            return false
        }

        version()
    })

    document.querySelector('#reset').addEventListener('click', async () => {
        const key = document.querySelector('#key').value.replaceAll(' ', '')
        if (key) {
            const res = await license.reset(key).then(res => res.json())
            if (!res.metadata.hwid) {
                alert('License unbound successfully!')
            }
            else {
                alert('Something went wrong with the reset!')
            }
        }
        else {
            alert('Please enter a key!')
            return false
        }
    })

    document.querySelector('#key').addEventListener('change', () => {
        chrome.storage.sync.set({
            'key': document.querySelector('#key').value.replaceAll(' ', '')
        });
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
    // Prendo l'ultimo hwid nello storage
    const lastHwid = await extractHwid();

    if ((!licenseInfo) || (licenseInfo.status === "canceled")) {
        alert('License not found')
        chrome.storage.sync.set({ 'active': false });
        return false
    }
    if (licenseInfo) {
        if (!licenseInfo.metadata.hwid) {
            const res = await license.bind(key, currHwid);
            chrome.storage.sync.set({ 'hwid': currHwid });
            chrome.storage.sync.set({ 'active': true });
            alert(`Welcome back, ${licenseInfo.user.username}!`)
            return true;
        }
        if (licenseInfo.metadata.hwid) {
            if ((licenseInfo.metadata.hwid === currHwid) || (licenseInfo.metadata.hwid === lastHwid)) {
                alert(`Welcome back, ${licenseInfo.user.username}!`)
                chrome.storage.sync.set({ 'active': true });
                return true;
            }
            else {
                alert('This license is in use on another computer!')
                chrome.storage.sync.set({ 'active': false });
                return false;
            }
        }
        return false
    }
    return false
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

const extractLicense = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.key || false)
        })
    })
}