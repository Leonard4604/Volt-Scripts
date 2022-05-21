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

    // Gestion sidebar
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
            profiles.removeAttribute('style');
            dash.style.color = "var(--blue-color)";
            dash.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.proxy', 'display') === 'grid') {
            show('.container', '.proxy')
            proxy.removeAttribute('style');
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

        if (getStyle('.container', 'display') === 'grid') {
            show('.profiles', '.container')
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

        if (getStyle('.dashboard#zalando', 'display') === 'grid') {
            show('.proxy', '.dashboard#zalando')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#luisaviaroma', 'display') === 'grid') {
            show('.proxy', '.dashboard#luisaviaroma')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#cisalfa', 'display') === 'grid') {
            show('.proxy', '.dashboard#cisalfa')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#snipes', 'display') === 'grid') {
            show('.proxy', '.dashboard#snipes')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#solebox', 'display') === 'grid') {
            show('.proxy', '.dashboard#solebox')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#awlab-here', 'display') === 'grid') {
            show('.proxy', '.dashboard#awlab-here')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#supreme', 'display') === 'grid') {
            show('.proxy', '.dashboard#supreme')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#sns-naked', 'display') === 'grid') {
            show('.proxy', '.dashboard#sns-naked')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }
        if (getStyle('.dashboard#kith', 'display') === 'grid') {
            show('.proxy', '.dashboard#kith')
            dash.removeAttribute('style');
            proxy.style.color = "var(--blue-color)";
            proxy.style.backgroundColor = "var(--white-color)"
        }

        if (getStyle('.container', 'display') === 'grid') {
            show('.proxy', '.container')
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
    }
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
            return true;
        }
        if (licenseInfo.metadata.hwid) {
            if ((licenseInfo.metadata.hwid === currHwid) || (licenseInfo.metadata.hwid === lastHwid)) {
                chrome.storage.sync.set({ 'active': true });
                document.querySelector('div.content > div > div > img').src = licenseInfo.user.avatar;
                document.querySelector('div.content > div > div > div > div.name').textContent = `${licenseInfo.user.discord.username}#${licenseInfo.user.discord.discriminator}`;
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