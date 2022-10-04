document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('.item#luisaviaroma #lvrStatus')
    const mode = document.querySelector('.dashboard#luisaviaroma #mode_selection')
    const delay = document.querySelector('.dashboard#luisaviaroma #delay')
    const size = document.querySelector('.dashboard#luisaviaroma #sizing_selection')
    const min = document.querySelector('.dashboard#luisaviaroma #min_selection')
    const max = document.querySelector('.dashboard#luisaviaroma #max_selection')
    const items = document.querySelector('.dashboard#luisaviaroma #items_selection')
    const discounts = document.querySelector('.dashboard#luisaviaroma #discounts')

    const dashMode = document.querySelector('.item#luisaviaroma .mode')
    const dashDelay = document.querySelector('.item#luisaviaroma .delay')

    let luisaviaromaSettings = new Luisaviaroma()

    chrome.storage.sync.get(null, function (store) {
        if (store.luisaviaroma) {
            const settings = JSON.parse(store.luisaviaroma)
            status.checked = luisaviaromaSettings.status = settings.status || false
            mode.value = luisaviaromaSettings.mode = settings.mode || ''
            delay.value = luisaviaromaSettings.delay = settings.delay || ''
            size.value = luisaviaromaSettings.size = settings.size || ''
            min.value = luisaviaromaSettings.min = settings.min || ''
            max.value = luisaviaromaSettings.max = settings.max || ''
            items.value = luisaviaromaSettings.items = settings.items || 1
            luisaviaromaSettings.address = settings.address || false
            discounts.value = luisaviaromaSettings.discounts = settings.discounts || ''

            dashMode.textContent = `Mode: ${settings.mode.toString().charAt(0).toUpperCase() || `Default`}${settings.mode.toString().slice(1)}`
            dashDelay.textContent = `Delay: ${settings.delay.toString().charAt(0).toUpperCase()}${settings.delay.toString().slice(1)}`
        }
        else {
            status.checked = luisaviaromaSettings.status || false
            mode.value = luisaviaromaSettings.mode = ''
            delay.value = luisaviaromaSettings.delay = ''
            size.value = luisaviaromaSettings.size = ''
            min.value = luisaviaromaSettings.min = ''
            max.value = luisaviaromaSettings.max = ''
            items.value = luisaviaromaSettings.items = 1
            luisaviaromaSettings.address = false
            discounts.value = luisaviaromaSettings.discounts = ''

            dashMode.textContent = `Mode: Default`
            dashDelay.textContent = `Delay: Default`
        }
    })

    status.addEventListener('click', () => {
        luisaviaromaSettings.status = status.checked
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
    })

    mode.addEventListener('change', () => {
        luisaviaromaSettings.mode = mode.value
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
        dashMode.textContent = `Mode: ${mode.value.charAt(0).toUpperCase() || `Default`}${mode.value.slice(1)}`
    })

    delay.addEventListener('change', () => {
        luisaviaromaSettings.delay = +delay.value
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
        dashDelay.textContent = `Delay: ${+delay.value.charAt(0).toUpperCase()}${delay.value.slice(1)}`
    })

    size.addEventListener('change', () => {
        if (size.value === 'random') {
            luisaviaromaSettings.size = size.value
        }
        else {
            luisaviaromaSettings.size = +size.value
        }
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
    })

    min.addEventListener('change', () => {
        luisaviaromaSettings.min = +min.value
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
    })

    max.addEventListener('change', () => {
        luisaviaromaSettings.max = +max.value
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
    })

    items.addEventListener('change', () => {
        luisaviaromaSettings.items = +items.value
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
    })

    const resetBtn = document.querySelector('.dashboard#luisaviaroma .reset')
    resetBtn.addEventListener('click', () => {
        luisaviaromaSettings.address = false
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
    })

    const cancelBtn = document.querySelector('.dashboard#luisaviaroma .cancel')
    cancelBtn.addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {luisaviaroma: 'cancelOrder'}, function(response) {
                console.log(response)
            });
        });
    })

    discounts.addEventListener('change', () => {
        luisaviaromaSettings.discounts = discounts.value
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(luisaviaromaSettings)
        });
    })
})

class Luisaviaroma {
    status
    mode
    delay
    size
    min
    max
}