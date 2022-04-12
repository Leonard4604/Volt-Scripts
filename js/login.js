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
            alert('Please enter a key')
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
    reset: async () => {
        
    }
}

const validate = async (key) => {
    let hwid = ''
    // Invia un messaggio al background per prendere l'hwid
    chrome.runtime.sendMessage({ todo: "extractHwid" })
    // Al ricevimento dell'hwid lo setta alla variabile
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.hwid) {
            hwid = request.hwid;
        }
        else {
            return false;
        }
        sendResponse({status: 'received'})
        return true;
    })

    const licenseInfo = await license.retrieve(key);
    console.log(licenseInfo)
    console.log(hwid)
    if (!licenseInfo.metadata.hwid) {
        const res = await license.bind(key, hwid);
        console.log(res)
        alert(`Welcome back, ${licenseInfo.user.username}!`)
        return true;
    }
    else {
        if (licenseInfo.metadata.hwid === hwid) {
            alert(`Welcome back, ${licenseInfo.user.username}!`)
            return true;
        }
        else {
            alert('This license is in use on another computer!')
            return false;
        }
    }
}

// Example (using the function below).
getLocalIPs(function(ips) { // <!-- ips is an array of local IP addresses.
    console.log(ips.join('\n '))
});

function getLocalIPs(callback) {
    var ips = [];

    var RTCPeerConnection = window.RTCPeerConnection ||
        window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    var pc = new RTCPeerConnection({
        // Don't specify any stun/turn servers, otherwise you will
        // also find your public IP addresses.
        iceServers: []
    });
    // Add a media line, this is needed to activate candidate gathering.
    pc.createDataChannel('');
    
    // onicecandidate is triggered whenever a candidate has been found.
    pc.onicecandidate = function(e) {
        if (!e.candidate) { // Candidate gathering completed.
            pc.close();
            callback(ips);
            return;
        }
        var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
        if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
            ips.push(ip);
    };
    pc.createOffer(function(sdp) {
        pc.setLocalDescription(sdp);
    }, function onerror() {});
}