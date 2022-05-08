document.addEventListener('DOMContentLoaded', async () => {
    const key = await extractKey();

    const isValid = await validate(key).then((isValid) => {
        document.querySelector(".loader").remove()
        document.querySelector(".glass").classList.add("hide");
        return isValid;
    })

    // Rimuove il glass effect quando finisce la transizione
    const glass = document.querySelector('.glass');

    glass.addEventListener('transitionend', () => {
        glass.remove();
    });
    
    if (!isValid) {
        window.location.href = '../html/login.html';
        return false;
    }

    const btn = document.querySelector("#btn");
    const sidebar = document.querySelector(".sidebar");

    btn.onclick = function(){
        sidebar.classList.toggle("active");
    }

    const dash = document.querySelector('.sidebar ul li a#dashboard');
    dash.style.color = "var(--blue-color)";
    dash.style.backgroundColor = "var(--white-color)"

    // Modules settings
    const zalandoSettings = document.querySelector('#zalando > #settings > .button > button > #button');
    zalandoSettings.addEventListener('click', () => {
        show('.zalando', '.container')
    })

    const luisaviaromaSettings = document.querySelector('#luisaviaroma > #settings > .button > button > #button');
    luisaviaromaSettings.addEventListener('click', () => {
        show('.luisaviaroma', '.container')
    })

    const cisalfaSettings = document.querySelector('#cisalfa > #settings > .button > button > #button');
    cisalfaSettings.addEventListener('click', () => {
        show('.cisalfa', '.container')
    })

    const snipesSettings = document.querySelector('#snipes > #settings > .button > button > #button');
    snipesSettings.addEventListener('click', () => {
        show('.snipes', '.container')
    })

    const soleboxSettings = document.querySelector('#solebox > #settings > .button > button > #button');
    soleboxSettings.addEventListener('click', () => {
        show('.solebox', '.container')
    })

    const awlabHereSettings = document.querySelector('#awlab-here > #settings > .button > button > #button');
    awlabHereSettings.addEventListener('click', () => {
        show('.awlab-here', '.container')
    })

    const supremeSettings = document.querySelector('#supreme > #settings > .button > button > #button');
    supremeSettings.addEventListener('click', () => {
        show('.supreme', '.container')
    })

    const snsNakedSettings = document.querySelector('#sns-naked > #settings > .button > button > #button');
    snsNakedSettings.addEventListener('click', () => {
        show('.sns-naked', '.container')
    })

    const kith = document.querySelector('#kith > #settings > .button > button > #button');
    kith.addEventListener('click', () => {
        show('.kith', '.container')
    })
    
    // Ritorno dalla pagina del singolo modulo alla dashboard
    dash.addEventListener('click', () => {
        if (document.querySelector('.zalando').style.display === 'block') {
            showGrid('.container', '.zalando')
        }
        if (document.querySelector('.luisaviaroma').style.display === 'block') {
            showGrid('.container', '.luisaviaroma')
        }
        if (document.querySelector('.cisalfa').style.display === 'block') {
            showGrid('.container', '.cisalfa')
        }
        if (document.querySelector('.snipes').style.display === 'block') {
            showGrid('.container', '.snipes')
        }
        if (document.querySelector('.solebox').style.display === 'block') {
            showGrid('.container', '.solebox')
        }
        if (document.querySelector('.awlab-here').style.display === 'block') {
            showGrid('.container', '.awlab-here')
        }
        if (document.querySelector('.supreme').style.display === 'block') {
            showGrid('.container', '.supreme')
        }
        if (document.querySelector('.sns-naked').style.display === 'block') {
            showGrid('.container', '.sns-naked')
        }
        if (document.querySelector('.kith').style.display === 'block') {
            showGrid('.container', '.kith')
        }
    })

    const logout = document.querySelector('#logout');
    logout.addEventListener('click', () => {
        license.reset(key)
        chrome.storage.sync.set({ 
            'active': false,
            'key': null 
        });
        window.location.href = '../html/login.html'
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

    // Prendo l'ultimo hwid nello storage
    const lastHwid = await extractHwid();
    console.log(licenseInfo)
    if ((!licenseInfo) || (licenseInfo.status === "canceled")) {
        return false
    }
    if (licenseInfo) {
        if (!licenseInfo.metadata.hwid) {
            const res = await license.bind(key, currHwid);
            chrome.storage.sync.set({ 'hwid': currHwid });
            
            return true;
        }
        if (licenseInfo.metadata.hwid) {
            if ((licenseInfo.metadata.hwid === currHwid) || (licenseInfo.metadata.hwid === lastHwid)) {
                chrome.storage.sync.set({ 'active': true });
                return true;
            }
            else {
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

const show = (shown, hidden) => {
    document.querySelector(shown).style.display='block';
    document.querySelector(hidden).style.display='none';
    return false;
}

const showGrid = (shown, hidden) => {
    document.querySelector(shown).style.display='grid';
    document.querySelector(hidden).style.display='none';
    return false;
}