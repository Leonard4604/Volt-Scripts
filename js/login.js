document.addEventListener('DOMContentLoaded', () => {
    let key = document.querySelector('#key')
    chrome.storage.sync.get(null, function (store) {
        key.value = store.key || ''
    })

    document.querySelector('#bind').addEventListener('click', async () => {
        const key = document.querySelector('#key').value
        if (key) {
            await validate(key)
        }
        else {
            alert('Please enter a key!')
            return false
        }
    })

    document.querySelector('#reset').addEventListener('click', async () => {
        const key = document.querySelector('#key').value
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
        alert(`Welcome back, ${licenseInfo.user.username}!`)
        return true;
    }
    else {
        if ((licenseInfo.metadata.hwid === currHwid) || (licenseInfo.metadata.hwid === lastHwid)) {
            alert(`Welcome back, ${licenseInfo.user.username}!`)
            return true;
        }
        else {
            alert('This license is in use on another computer!')
            return false;
        }
    }
}