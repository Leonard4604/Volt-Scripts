document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('.item#zalando #zalandoStatus')
    const mode = document.querySelector('.dashboard#zalando #mode_selection')
    const delay = document.querySelector('.dashboard#zalando #delay')
    const size = document.querySelector('.dashboard#zalando #sizing_selection')
    const min = document.querySelector('.dashboard#zalando #min_selection')
    const max = document.querySelector('.dashboard#zalando #max_selection')
    const coupons = document.querySelector('.dashboard#zalando #coupons')
    const dummy = document.querySelector('.dashboard#zalando #dummy')
    const method = document.querySelector('.dashboard#zalando #method_selection')
    const email = document.querySelector('.dashboard#zalando #email')

    const dashMode = document.querySelector('.item#zalando .mode')
    const dashDelay = document.querySelector('.item#zalando .delay')

    let zalandoSettings = new Zalando()

    chrome.storage.sync.get(null, function (store) {
        if (store.zalando) {
            const settings = JSON.parse(store.zalando)
            status.checked = settings.status || false
            mode.value = zalandoSettings.mode = settings.mode || ''
            delay.value = zalandoSettings.delay = settings.delay || ''
            size.value = zalandoSettings.size = settings.size || ''
            min.value = zalandoSettings.min = settings.min || ''
            max.value = zalandoSettings.max = settings.max || ''
            coupons.value = zalandoSettings.coupons = settings.coupons || ''
            dummy.value = zalandoSettings.dummy = settings.dummy || ''
            method.value = zalandoSettings.method = settings.method || ''
            email.value = zalandoSettings.email = settings.email || ''

            dashMode.textContent = `Mode: ${settings.mode.charAt(0).toUpperCase()}${settings.mode.slice(1)}`
            dashDelay.textContent = `Delay: ${settings.delay.charAt(0).toUpperCase()}${settings.delay.slice(1)}`
        }
        else {
            status.checked = zalandoSettings.status || false
            mode.value = zalandoSettings.mode = ''
            delay.value = zalandoSettings.delay = ''
            size.value = zalandoSettings.size = ''
            min.value = zalandoSettings.min = ''
            max.value = zalandoSettings.max = ''
            coupons.value = zalandoSettings.coupons = ''
            dummy.value = zalandoSettings.dummy = ''
            method.value = zalandoSettings.method = ''
            email.value = zalandoSettings.email = ''

            dashMode.textContent = `Mode: Default`
            dashDelay.textContent = `Delay: Default`
        }
    })

    status.addEventListener('click', () => {
        zalandoSettings.status = status.checked
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    mode.addEventListener('change', () => {
        zalandoSettings.mode = mode.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    delay.addEventListener('change', () => {
        zalandoSettings.delay = delay.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    size.addEventListener('change', () => {
        zalandoSettings.size = size.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    min.addEventListener('change', () => {
        zalandoSettings.min = min.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    max.addEventListener('change', () => {
        zalandoSettings.max = max.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    coupons.addEventListener('change', () => {
        zalandoSettings.coupons = coupons.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    dummy.addEventListener('change', () => {
        zalandoSettings.dummy = dummy.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    method.addEventListener('change', () => {
        zalandoSettings.method = method.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })

    email.addEventListener('change', () => {
        zalandoSettings.email = email.value
        chrome.storage.sync.set({
            'zalando': JSON.stringify(zalandoSettings)
        });
    })
})

class Zalando {
    status
    mode
    delay
    size
    min
    max
    coupons
    dummy
    method
    email
}