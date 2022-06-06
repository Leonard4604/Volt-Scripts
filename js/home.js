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
    
    // Se la licenza non è valida riporta al login
    if (!isValid) {
        window.location.href = '../html/login.html';
        return false;
    }

    // Aggiorna la versione nella dashboard
    version()

    // Gestione sidebar
    const btn = document.querySelector("#btn");
    const sidebar = document.querySelector(".sidebar");

    btn.onclick = function(){
        sidebar.classList.toggle("active");
    }

    // !NAVIGAZIONE!
    // Gestione pagine settings dei singoli moduli
    const zalandoSettings = document.querySelector('#zalando > #settings > .button > button > #button');
    zalandoSettings.addEventListener('click', () => {
        show('.modules #zalando', '.dashboard')
        chrome.storage.sync.set({
            'lastVisited': 'zalando'
        });
    })

    const luisaviaromaSettings = document.querySelector('#luisaviaroma > #settings > .button > button > #button');
    luisaviaromaSettings.addEventListener('click', () => {
        show('.modules #luisaviaroma', '.dashboard')
        chrome.storage.sync.set({
            'lastVisited': 'luisaviaroma'
        });
    })

    const cisalfaSettings = document.querySelector('#cisalfa > #settings > .button > button > #button');
    cisalfaSettings.addEventListener('click', () => {
        show('.modules #cisalfa', '.dashboard')
        chrome.storage.sync.set({
            'lastVisited': 'cisalfa'
        });
    })

    const snipesSettings = document.querySelector('#snipes > #settings > .button > button > #button');
    snipesSettings.addEventListener('click', () => {
        show('.modules #snipes', '.dashboard')
        chrome.storage.sync.set({
            'lastVisited': 'snipes'
        });
    })

    const soleboxSettings = document.querySelector('#solebox > #settings > .button > button > #button');
    soleboxSettings.addEventListener('click', () => {
        show('.modules #solebox', '.dashboard')
        chrome.storage.sync.set({
            'lastVisited': 'solebox'
        });
    })

    const awlabHereSettings = document.querySelector('#awlab-here > #settings > .button > button > #button');
    awlabHereSettings.addEventListener('click', () => {
        show('.modules #awlab-here', '.dashboard')
        chrome.storage.sync.set({
            'lastVisited': 'awlab-here'
        });
    })

    const supremeSettings = document.querySelector('#supreme > #settings > .button > button > #button');
    supremeSettings.addEventListener('click', () => {
        show('.modules #supreme', '.dashboard')
        chrome.storage.sync.set({
            'lastVisited': 'supreme'
        });
    })

    const snsNakedSettings = document.querySelector('#sns-naked > #settings > .button > button > #button');
    snsNakedSettings.addEventListener('click', () => {
        show('.modules #sns-naked', '.dashboard')
        chrome.storage.sync.set({
            'lastVisited': 'sns-naked'
        });
    })

    const kith = document.querySelector('#kith > #settings > .button > button > #button');
    kith.addEventListener('click', () => {
        show('.modules #kith', '.dashboard')
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
        show('.profiles', '.dashboard')
        profiles.style.color = "var(--blue-color)";
        profiles.style.backgroundColor = "var(--white-color)"
    }
    else if (lastVisited === 'proxy') {
        show('.proxy', '.dashboard')
        proxy.style.color = "var(--blue-color)";
        proxy.style.backgroundColor = "var(--white-color)"
    }
    else if (lastVisited === 'analytics') {
        show('.analytics', '.dashboard')
        analytics.style.color = "var(--blue-color)";
        analytics.style.backgroundColor = "var(--white-color)"
    }
    else if (lastVisited === 'settings') {
        show('.settings', '.dashboard')
        settings.style.color = "var(--blue-color)";
        settings.style.backgroundColor = "var(--white-color)"
    }
    else {
        dash.style.color = "var(--blue-color)";
        dash.style.backgroundColor = "var(--white-color)"
        if (lastVisited === 'zalando') {
            show('.modules #zalando', '.dashboard')
        }
        else if (lastVisited === 'luisaviaroma') {
            show('.modules #luisaviaroma', '.dashboard')
        }
        else if (lastVisited === 'cisalfa') {
            show('.modules #cisalfa', '.dashboard')
        }
        else if (lastVisited === 'snipes') {
            show('.modules #snipes', '.dashboard')
        }
        else if (lastVisited === 'solebox') {
            show('.modules #solebox', '.dashboard')
        }
        else if (lastVisited === 'awlab-here') {
            show('.modules #awlab-here', '.dashboard')
        }
        else if (lastVisited === 'supreme') {
            show('.modules #supreme', '.dashboard')
        }
        else if (lastVisited === 'sns-naked') {
            show('.modules #sns-naked', '.dashboard')
        }
        else if (lastVisited === 'kith') {
            show('.modules #kith', '.dashboard')
        }
    }

    dash.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'dash'
        });
        
        if (getStyle('.modules #zalando', 'display') === 'grid') {
            show('.dashboard', '.modules #zalando')
        }
        if (getStyle('.modules #luisaviaroma', 'display') === 'grid') {
            show('.dashboard', '.modules #luisaviaroma')
        }
        if (getStyle('.modules #cisalfa', 'display') === 'grid') {
            show('.dashboard', '.modules #cisalfa')
        }
        if (getStyle('.modules #snipes', 'display') === 'grid') {
            show('.dashboard', '.modules #snipes')
        }
        if (getStyle('.modules #solebox', 'display') === 'grid') {
            show('.dashboard', '.modules #solebox')
        }
        if (getStyle('.modules #awlab-here', 'display') === 'grid') {
            show('.dashboard', '.modules #awlab-here')
        }
        if (getStyle('.modules #supreme', 'display') === 'grid') {
            show('.dashboard', '.modules #supreme')
        }
        if (getStyle('.modules #sns-naked', 'display') === 'grid') {
            show('.dashboard', '.modules #sns-naked')
        }
        if (getStyle('.modules #kith', 'display') === 'grid') {
            show('.dashboard', '.modules #kith')
        }

        if (getStyle('.profiles', 'display') === 'grid') {
            show('.dashboard', '.profiles')
            profiles.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.dashboard', '.proxy')
            proxy.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.dashboard', '.analytics')
            analytics.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.dashboard', '.settings')
            settings.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
    })

    profiles.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'profiles'
        });

        if (getStyle('.modules #zalando', 'display') === 'grid') {
            show('.profiles', '.modules #zalando')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #luisaviaroma', 'display') === 'grid') {
            show('.profiles', '.modules #luisaviaroma')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #cisalfa', 'display') === 'grid') {
            show('.profiles', '.modules #cisalfa')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #snipes', 'display') === 'grid') {
            show('.profiles', '.modules #snipes')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #solebox', 'display') === 'grid') {
            show('.profiles', '.modules #solebox')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #awlab-here', 'display') === 'grid') {
            show('.profiles', '.modules #awlab-here')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #supreme', 'display') === 'grid') {
            show('.profiles', '.modules #supreme')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #sns-naked', 'display') === 'grid') {
            show('.profiles', '.modules #sns-naked')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #kith', 'display') === 'grid') {
            show('.profiles', '.modules #kith')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.dashboard', 'display') === 'grid') {
            show('.profiles', '.dashboard')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.profiles', '.proxy')
            proxy.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.profiles', '.analytics')
            analytics.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.profiles', '.settings')
            settings.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
    })
    
    proxy.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'proxy'
        });

        if (getStyle('.modules #zalando', 'display') === 'grid') {
            show('.proxy', '.modules #zalando')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #luisaviaroma', 'display') === 'grid') {
            show('.proxy', '.modules #luisaviaroma')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #cisalfa', 'display') === 'grid') {
            show('.proxy', '.modules #cisalfa')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #snipes', 'display') === 'grid') {
            show('.proxy', '.modules #snipes')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #solebox', 'display') === 'grid') {
            show('.proxy', '.modules #solebox')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #awlab-here', 'display') === 'grid') {
            show('.proxy', '.modules #awlab-here')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #supreme', 'display') === 'grid') {
            show('.proxy', '.modules #supreme')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #sns-naked', 'display') === 'grid') {
            show('.proxy', '.modules #sns-naked')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #kith', 'display') === 'grid') {
            show('.proxy', '.modules #kith')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.dashboard', 'display') === 'grid') {
            show('.proxy', '.dashboard')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.profiles', 'display') === 'grid') {
            show('.proxy', '.profiles')
            profiles.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.proxy', '.analytics')
            analytics.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.proxy', '.settings')
            settings.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
    })
    
    analytics.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'analytics'
        });

        if (getStyle('.modules #zalando', 'display') === 'grid') {
            show('.analytics', '.modules #zalando')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #luisaviaroma', 'display') === 'grid') {
            show('.analytics', '.modules #luisaviaroma')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #cisalfa', 'display') === 'grid') {
            show('.analytics', '.modules #cisalfa')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #snipes', 'display') === 'grid') {
            show('.analytics', '.modules #snipes')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #solebox', 'display') === 'grid') {
            show('.analytics', '.modules #solebox')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #awlab-here', 'display') === 'grid') {
            show('.analytics', '.modules #awlab-here')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #supreme', 'display') === 'grid') {
            show('.analytics', '.modules #supreme')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #sns-naked', 'display') === 'grid') {
            show('.analytics', '.modules #sns-naked')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #kith', 'display') === 'grid') {
            show('.analytics', '.modules #kith')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.dashboard', 'display') === 'grid') {
            show('.analytics', '.dashboard')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.profiles', 'display') === 'grid') {
            show('.analytics', '.profiles')
            profiles.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.analytics', '.proxy')
            proxy.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.analytics', '.settings')
            settings.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
    })

    settings.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'settings'
        });

        if (getStyle('.modules #zalando', 'display') === 'grid') {
            show('.settings', '.modules #zalando')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #luisaviaroma', 'display') === 'grid') {
            show('.settings', '.modules #luisaviaroma')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #cisalfa', 'display') === 'grid') {
            show('.settings', '.modules #cisalfa')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #snipes', 'display') === 'grid') {
            show('.settings', '.modules #snipes')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #solebox', 'display') === 'grid') {
            show('.settings', '.modules #solebox')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #awlab-here', 'display') === 'grid') {
            show('.settings', '.modules #awlab-here')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #supreme', 'display') === 'grid') {
            show('.settings', '.modules #supreme')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #sns-naked', 'display') === 'grid') {
            show('.settings', '.modules #sns-naked')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.modules #kith', 'display') === 'grid') {
            show('.settings', '.modules #kith')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.dashboard', 'display') === 'grid') {
            show('.settings', '.dashboard')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.profiles', 'display') === 'grid') {
            show('.settings', '.profiles')
            profiles.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.settings', '.proxy')
            proxy.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.settings', '.analytics')
            analytics.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
    })
    // !FINE NAVIGAZIONE!

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

const license = {
    API_KEY: 'pk_RBvQYAkZymGXCnOIXFF6rQFbpY9Y9i9u',
    retrieve: async function(key) {
        try {
            const license = await fetch(`https://api.hyper.co/v6/licenses/${key}`, {
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`
                }
            }).then(res => res.json());
            return license;
        } catch {
            return false;
        }
    },
    bind: async function(key, hwid) {
        return fetch(`https://api.hyper.co/v6/licenses/${key}/metadata`, {
            method: 'PATCH',
            headers: {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                metadata: { hwid }
            })
        })
    },
    reset: async function(key) {
        return fetch(`https://api.hyper.co/v6/licenses/${key}/metadata`, {
            method: 'PATCH',
            headers: {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            metadata: { hwid: null }
            })
        })
    },
    backup: {
        export: async function(key, backup) {
            return fetch(`https://api.hyper.co/v6/licenses/${key}/metadata`, {
                method: 'PATCH',
                headers: {
                'Authorization': `Bearer ${license.API_KEY}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    metadata: { backup }
                })
            })
        },
        reset: async function(key) {
            return fetch(`https://api.hyper.co/v6/licenses/${key}/metadata`, {
                method: 'PATCH',
                headers: {
                'Authorization': `Bearer ${license.API_KEY}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    metadata: { backup: null }
                })
            })
        }
    },
}

async function extractHwid() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.hwid)
        })
    })
}

async function extractKey() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.key)
        })
    })
}

async function validate(key) {
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
            document.querySelector('div.content > div > div > img').src = licenseInfo.user.avatar;
            document.querySelector('div.content > div > div > div > div.name').textContent = `${licenseInfo.user.discord.username}#${licenseInfo.user.discord.discriminator}`;
            if (licenseInfo.metadata.backup && licenseInfo.metadata.backup !== "[]") {
                document.querySelector('.settings .backup .status').textContent = 'Backup found.'
            }
            return true;
        }
        if (licenseInfo.metadata.hwid) {
            if ((licenseInfo.metadata.hwid === currHwid) || (licenseInfo.metadata.hwid === lastHwid)) {
                chrome.storage.sync.set({ 'active': true });
                document.querySelector('div.content > div > div > img').src = licenseInfo.user.avatar;
                document.querySelector('div.content > div > div > div > div.name').textContent = `${licenseInfo.user.discord.username}#${licenseInfo.user.discord.discriminator}`;
                if (licenseInfo.metadata.backup && licenseInfo.metadata.backup !== "[]") {
                    document.querySelector('.settings .backup .status').textContent = 'Backup found.'
                }
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

function version() {
    chrome.runtime.sendMessage({ todo: "getVersion" })

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.version) {
            document.querySelector('div.content > div > div > div > div.version').textContent = request.version;
        }
        else {
            return false;
        }
        sendResponse({status: 'received'})
        return true;
    })
}

function show(shown, hidden) {
    document.querySelector(shown).style.display='grid';
    document.querySelector(hidden).style.display='none';
    return false;
}

function getStyle(selector, name) {
    var element = document.querySelector(selector);
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}

async function extractLastVisited() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(null, function(store) {
            resolve(store.lastVisited)
        })
    })
}

function makeSpendingChart() {
    const dates = ['09/05/2022', '10/05/2022', '11/05/2022']
    const totals = [100, 200, 300]
    const ctx = document.getElementById('spendingChart');
    const data = {
        labels: dates,
        datasets: [{
            label: 'Spent',
            lineTension: 0.3,
            data: totals,
            fill: true,
            borderColor: '#000957',
            backgroundColor: 'rgba(0, 9, 87, 0.8)',
            borderWidth: 2,
        }]
      };
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {

                },
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    grace: '10%'
                }
            }
        }
    });
}