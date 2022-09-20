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
    const home = document.querySelector('.sidebar ul li a#home');
    const dash = document.querySelector('.sidebar ul li a#dashboard');
    const profiles = document.querySelector('.sidebar ul li a#profiles');
    const analytics = document.querySelector('.sidebar ul li a#analytics');
    const settings = document.querySelector('.sidebar ul li a#settings');

    const lastVisited = await extractLastVisited();
    if (lastVisited === 'home') {
        show('.home', '.container')
        home.style.color = "var(--blue-color)";
        home.style.backgroundColor = "var(--white-color)"
    }
    else if (lastVisited === 'profiles') {
        show('.profiles', '.container')
        profiles.style.color = "var(--blue-color)";
        profiles.style.backgroundColor = "var(--white-color)"
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

    home.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'home'
        });

        if (getStyle('.dashboard#zalando', 'display') === 'grid') {
            show('.home', '.dashboard#zalando')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#luisaviaroma', 'display') === 'grid') {
            show('.home', '.dashboard#luisaviaroma')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#cisalfa', 'display') === 'grid') {
            show('.home', '.dashboard#cisalfa')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#snipes', 'display') === 'grid') {
            show('.home', '.dashboard#snipes')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#solebox', 'display') === 'grid') {
            show('.home', '.dashboard#solebox')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#awlab-here', 'display') === 'grid') {
            show('.home', '.dashboard#awlab-here')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#supreme', 'display') === 'grid') {
            show('.home', '.dashboard#supreme')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#sns-naked', 'display') === 'grid') {
            show('.home', '.dashboard#sns-naked')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#kith', 'display') === 'grid') {
            show('.home', '.dashboard#kith')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.container', 'display') === 'grid') {
            show('.home', '.container')
            dash.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.profiles', 'display') === 'grid') {
            show('.home', '.profiles')
            profiles.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.home', '.analytics')
            analytics.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.home', '.settings')
            settings.removeAttribute('style');
            home.style.color = "var(--blue-color)";
            home.style.backgroundColor = "var(--white-color)"
        }
    })

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

        if (getStyle('.home', 'display') === 'grid') {
            show('.container', '.home')
            home.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.profiles', 'display') === 'grid') {
            show('.container', '.profiles')
            profiles.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.analytics', 'display') === 'grid') {
            show('.container', '.analytics')
            analytics.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.settings', 'display') === 'grid') {
            show('.container', '.settings')
            settings.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
    })

    profiles.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'profiles'
        });

        if (getStyle('.dashboard#zalando', 'display') === 'grid') {
            show('.profiles', '.dashboard#zalando')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#luisaviaroma', 'display') === 'grid') {
            show('.profiles', '.dashboard#luisaviaroma')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#cisalfa', 'display') === 'grid') {
            show('.profiles', '.dashboard#cisalfa')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#snipes', 'display') === 'grid') {
            show('.profiles', '.dashboard#snipes')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#solebox', 'display') === 'grid') {
            show('.profiles', '.dashboard#solebox')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#awlab-here', 'display') === 'grid') {
            show('.profiles', '.dashboard#awlab-here')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#supreme', 'display') === 'grid') {
            show('.profiles', '.dashboard#supreme')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#sns-naked', 'display') === 'grid') {
            show('.profiles', '.dashboard#sns-naked')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#kith', 'display') === 'grid') {
            show('.profiles', '.dashboard#kith')
            dash.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.home', 'display') === 'grid') {
            show('.profiles', '.home')
            home.removeAttribute('style');
            profiles.style.color = "var(--blue-color)";
            profiles.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.container', 'display') === 'grid') {
            show('.profiles', '.container')
            dash.removeAttribute('style');
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
    
    analytics.addEventListener('click', () => {
        chrome.storage.sync.set({
            'lastVisited': 'analytics'
        });

        if (getStyle('.dashboard#zalando', 'display') === 'grid') {
            show('.analytics', '.dashboard#zalando')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#luisaviaroma', 'display') === 'grid') {
            show('.analytics', '.dashboard#luisaviaroma')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#cisalfa', 'display') === 'grid') {
            show('.analytics', '.dashboard#cisalfa')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#snipes', 'display') === 'grid') {
            show('.analytics', '.dashboard#snipes')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#solebox', 'display') === 'grid') {
            show('.analytics', '.dashboard#solebox')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#awlab-here', 'display') === 'grid') {
            show('.analytics', '.dashboard#awlab-here')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#supreme', 'display') === 'grid') {
            show('.analytics', '.dashboard#supreme')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#sns-naked', 'display') === 'grid') {
            show('.analytics', '.dashboard#sns-naked')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#kith', 'display') === 'grid') {
            show('.analytics', '.dashboard#kith')
            dash.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.home', 'display') === 'grid') {
            show('.analytics', '.home')
            home.removeAttribute('style');
            analytics.style.color = "var(--blue-color)";
            analytics.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.container', 'display') === 'grid') {
            show('.analytics', '.container')
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

        if (getStyle('.dashboard#zalando', 'display') === 'grid') {
            show('.settings', '.dashboard#zalando')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#luisaviaroma', 'display') === 'grid') {
            show('.settings', '.dashboard#luisaviaroma')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#cisalfa', 'display') === 'grid') {
            show('.settings', '.dashboard#cisalfa')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#snipes', 'display') === 'grid') {
            show('.settings', '.dashboard#snipes')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#solebox', 'display') === 'grid') {
            show('.settings', '.dashboard#solebox')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#awlab-here', 'display') === 'grid') {
            show('.settings', '.dashboard#awlab-here')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#supreme', 'display') === 'grid') {
            show('.settings', '.dashboard#supreme')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#sns-naked', 'display') === 'grid') {
            show('.settings', '.dashboard#sns-naked')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#kith', 'display') === 'grid') {
            show('.settings', '.dashboard#kith')
            dash.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.home', 'display') === 'grid') {
            show('.settings', '.home')
            home.removeAttribute('style');
            settings.style.color = "var(--blue-color)";
            settings.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.container', 'display') === 'grid') {
            show('.settings', '.container')
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
            if (licenseInfo.user.discord) {
                const avatar = licenseInfo.user.avatar;
                const username = licenseInfo.user.discord.username;
                const discriminator = licenseInfo.user.discord.discriminator;
                const plan = licenseInfo.plan.name;
                const type = licenseInfo.plan.type;
                const joined = licenseInfo.plan.created;
                const key = licenseInfo.key
                setInfo(avatar, username, discriminator, plan, type, joined, key)
            }
            if (!licenseInfo.user.discord) {
                const avatar = false;
                const username = licenseInfo.email;
                const discriminator = false;
                const plan = licenseInfo.plan.name;
                const type = licenseInfo.plan.type;
                const joined = licenseInfo.plan.created;
                const key = licenseInfo.key
                setInfo(avatar, username, discriminator, plan, type, joined, key)
            }
            if (licenseInfo.metadata.backup && licenseInfo.metadata.backup !== "[]") {
                document.querySelector('.settings .backup .status').textContent = 'Backup found.'
            }
            return true;
        }
        if (licenseInfo.metadata.hwid) {
            if ((licenseInfo.metadata.hwid === currHwid) || (licenseInfo.metadata.hwid === lastHwid)) {
                chrome.storage.sync.set({ 'active': true });
                if (licenseInfo.user.discord) {
                    const avatar = licenseInfo.user.avatar;
                    const username = licenseInfo.user.discord.username;
                    const discriminator = licenseInfo.user.discord.discriminator;
                    const plan = licenseInfo.plan.name;
                    const type = licenseInfo.plan.type;
                    const joined = licenseInfo.plan.created;
                    const key = licenseInfo.key
                    setInfo(avatar, username, discriminator, plan, type, joined, key)
                }
                if (!licenseInfo.user.discord) {
                    const avatar = false;
                    const username = licenseInfo.email;
                    const discriminator = false;
                    const plan = licenseInfo.plan.name;
                    const type = licenseInfo.plan.type;
                    const joined = licenseInfo.plan.created;
                    const key = licenseInfo.key
                    setInfo(avatar, username, discriminator, plan, type, joined, key)
                }
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
            chrome.storage.sync.set({ 'version': request.version });
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

function setInfo(avatar, username, discriminator, plan, type, joined, key) {
    document.querySelector('div.content > div > div > img').src = avatar
    document.querySelector('div.content > div > div > div > div.name').textContent = `${username}#${discriminator}`
    document.querySelector('.home #username h3').textContent = `Welcome back, ${username}.`
    document.querySelector('.home #plan p').textContent = `Plan: ${plan}`
    document.querySelector('.home #type p').textContent = `Plan Type: ${type}`
    document.querySelector('.home #joined p').textContent = `Join Date: ${convertDate(joined)}`
    document.querySelector('.home #avatar img').src = avatar
    document.querySelector('.home #license #key').textContent = key
}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}