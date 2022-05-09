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

    // Gestione pagine settings dei singoli moduli
    const zalandoSettings = document.querySelector('#zalando > #settings > .button > button > #button');
    zalandoSettings.addEventListener('click', () => {
        show('.dashboard#zalando', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'zalando'
        });
    })

    const luisaviaromaSettings = document.querySelector('#luisaviaroma > #settings > .button > button > #button');
    luisaviaromaSettings.addEventListener('click', () => {
        show('.dashboard#luisaviaroma', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'luisaviaroma'
        });
    })

    const cisalfaSettings = document.querySelector('#cisalfa > #settings > .button > button > #button');
    cisalfaSettings.addEventListener('click', () => {
        show('.dashboard#cisalfa', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'cisalfa'
        });
    })

    const snipesSettings = document.querySelector('#snipes > #settings > .button > button > #button');
    snipesSettings.addEventListener('click', () => {
        show('.dashboard#snipes', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'snipes'
        });
    })

    const soleboxSettings = document.querySelector('#solebox > #settings > .button > button > #button');
    soleboxSettings.addEventListener('click', () => {
        show('.dashboard#solebox', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'solebox'
        });
    })

    const awlabHereSettings = document.querySelector('#awlab-here > #settings > .button > button > #button');
    awlabHereSettings.addEventListener('click', () => {
        show('.dashboard#awlab-here', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'awlab-here'
        });
    })

    const supremeSettings = document.querySelector('#supreme > #settings > .button > button > #button');
    supremeSettings.addEventListener('click', () => {
        show('.dashboard#supreme', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'supreme'
        });
    })

    const snsNakedSettings = document.querySelector('#sns-naked > #settings > .button > button > #button');
    snsNakedSettings.addEventListener('click', () => {
        show('.dashboard#sns-naked', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'sns-naked'
        });
    })

    const kith = document.querySelector('#kith > #settings > .button > button > #button');
    kith.addEventListener('click', () => {
        show('.dashboard#kith', '.container')
        chrome.storage.sync.set({
            'lastVisited': 'kith'
        });
    })

    // Gestione delle varie pagine
    const dash = document.querySelector('.sidebar ul li a#dashboard');
    const profiles = document.querySelector('.sidebar ul li a#profiles');
    const proxy = document.querySelector('.sidebar ul li a#proxy');
    const analytics = document.querySelector('.sidebar ul li a#analytics');
    const settings = document.querySelector('.sidebar ul li a#settings');

    const lastVisited = await extractLastVisited();
    if (lastVisited === 'profiles') {
        show('.profiles', '.container')
        profiles.style.color = "var(--blue-color)";
        profiles.style.backgroundColor = "var(--white-color)"
    }
    else if (lastVisited === 'proxy') {
        show('.proxy', '.container')
        proxy.style.color = "var(--blue-color)";
        proxy.style.backgroundColor = "var(--white-color)"
    }
    else if (lastVisited === 'analytics') {
        show('.analytics', '.container')
        analytics.style.color = "var(--blue-color)";
        analytics.style.backgroundColor = "var(--white-color)"
    }
    else if (lastVisited === 'settings') {
        show('.settings', '.container')
        settings.style.color = "var(--blue-color)";
        settings.style.backgroundColor = "var(--white-color)"
    }
    else {
        dash.style.color = "var(--blue-color)";
        dash.style.backgroundColor = "var(--white-color)"
        if (lastVisited === 'zalando') {
            show('.dashboard#zalando', '.container')
        }
        else if (lastVisited === 'luisaviaroma') {
            show('.dashboard#luisaviaroma', '.container')
        }
        else if (lastVisited === 'cisalfa') {
            show('.dashboard#cisalfa', '.container')
        }
        else if (lastVisited === 'snipes') {
            show('.dashboard#snipes', '.container')
        }
        else if (lastVisited === 'solebox') {
            show('.dashboard#solebox', '.container')
        }
        else if (lastVisited === 'awlab-here') {
            show('.dashboard#awlab-here', '.container')
        }
        else if (lastVisited === 'supreme') {
            show('.dashboard#supreme', '.container')
        }
        else if (lastVisited === 'sns-naked') {
            show('.dashboard#sns-naked', '.container')
        }
        else if (lastVisited === 'kith') {
            show('.dashboard#kith', '.container')
        }
    }

    dash.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'dash'
        });
        
        if (getStyle('.dashboard#zalando', 'display') === 'grid') {
            show('.container', '.dashboard#zalando')
        }
        if (getStyle('.dashboard#luisaviaroma', 'display') === 'grid') {
            show('.container', '.dashboard#luisaviaroma')
        }
        if (getStyle('.dashboard#cisalfa', 'display') === 'grid') {
            show('.container', '.dashboard#cisalfa')
        }
        if (getStyle('.dashboard#snipes', 'display') === 'grid') {
            show('.container', '.dashboard#snipes')
        }
        if (getStyle('.dashboard#solebox', 'display') === 'grid') {
            show('.container', '.dashboard#solebox')
        }
        if (getStyle('.dashboard#awlab-here', 'display') === 'grid') {
            show('.container', '.dashboard#awlab-here')
        }
        if (getStyle('.dashboard#supreme', 'display') === 'grid') {
            show('.container', '.dashboard#supreme')
        }
        if (getStyle('.dashboard#sns-naked', 'display') === 'grid') {
            show('.container', '.dashboard#sns-naked')
        }
        if (getStyle('.dashboard#kith', 'display') === 'grid') {
            show('.container', '.dashboard#kith')
        }

        if (getStyle('.profiles', 'display') === 'grid') {
            show('.container', '.profiles')
            profiles.style.color = "var(--white-color)";
            profiles.style.backgroundColor = "var(--blue-color)"
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.container', '.proxy')
            proxy.style.color = "var(--white-color)";
            proxy.style.backgroundColor = "var(--blue-color)"
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.container', '.analytics')
            analytics.style.color = "var(--white-color)";
            analytics.style.backgroundColor = "var(--blue-color)"
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.container', '.settings')
            settings.style.color = "var(--white-color)";
            settings.style.backgroundColor = "var(--blue-color)"
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
    })

    profiles.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'profiles'
        });

        if (getStyle('.container', 'display') === 'grid') {
            show('.profiles', '.container')
            dash.style.color = "var(--white-color)";
            dash.style.backgroundColor = "var(--blue-color)"
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.profiles', '.proxy')
            proxy.style.color = "var(--white-color)";
            proxy.style.backgroundColor = "var(--blue-color)"
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.profiles', '.analytics')
            analytics.style.color = "var(--white-color)";
            analytics.style.backgroundColor = "var(--blue-color)"
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.profiles', '.settings')
            settings.style.color = "var(--white-color)";
            settings.style.backgroundColor = "var(--blue-color)"
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
    })
    
    proxy.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'proxy'
        });

        if (getStyle('.container', 'display') === 'grid') {
            show('.proxy', '.container')
            dash.style.color = "var(--white-color)";
            dash.style.backgroundColor = "var(--blue-color)"
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.profiles', 'display') === 'grid') {
            show('.proxy', '.profiles')
            profiles.style.color = "var(--white-color)";
            profiles.style.backgroundColor = "var(--blue-color)"
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.proxy', '.analytics')
            analytics.style.color = "var(--white-color)";
            analytics.style.backgroundColor = "var(--blue-color)"
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.proxy', '.settings')
            settings.style.color = "var(--white-color)";
            settings.style.backgroundColor = "var(--blue-color)"
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
    })
    
    analytics.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'analytics'
        });

        if (getStyle('.container', 'display') === 'grid') {
            show('.analytics', '.container')
            dash.style.color = "var(--white-color)";
            dash.style.backgroundColor = "var(--blue-color)"
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.profiles', 'display') === 'grid') {
            show('.analytics', '.profiles')
            profiles.style.color = "var(--white-color)";
            profiles.style.backgroundColor = "var(--blue-color)"
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.analytics', '.proxy')
            proxy.style.color = "var(--white-color)";
            proxy.style.backgroundColor = "var(--blue-color)"
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.analytics', '.settings')
            settings.style.color = "var(--white-color)";
            settings.style.backgroundColor = "var(--blue-color)"
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
    })

    settings.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'settings'
        });

        if (getStyle('.container', 'display') === 'grid') {
            show('.settings', '.container')
            dash.style.color = "var(--white-color)";
            dash.style.backgroundColor = "var(--blue-color)"
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.profiles', 'display') === 'grid') {
            show('.settings', '.profiles')
            profiles.style.color = "var(--white-color)";
            profiles.style.backgroundColor = "var(--blue-color)"
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.settings', '.proxy')
            proxy.style.color = "var(--white-color)";
            proxy.style.backgroundColor = "var(--blue-color)"
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.settings', '.analytics')
            analytics.style.color = "var(--white-color)";
            analytics.style.backgroundColor = "var(--blue-color)"
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
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
    document.querySelector(shown).style.display='grid';
    document.querySelector(hidden).style.display='none';
    return false;
}

const getStyle = (selector, name) => {
    var element = document.querySelector(selector);
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}

const extractLastVisited = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.lastVisited)
        })
    })
}