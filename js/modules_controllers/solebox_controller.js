document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('.item#solebox #soleboxStatus')
    const mode = document.querySelector('.dashboard#solebox #mode_selection')
    const delay = document.querySelector('.dashboard#solebox #delay')
    const size = document.querySelector('.dashboard#solebox #sizing_selection')
    const min = document.querySelector('.dashboard#solebox #min_selection')
    const max = document.querySelector('.dashboard#solebox #max_selection')

    const dashMode = document.querySelector('.item#solebox .mode')
    const dashDelay = document.querySelector('.item#solebox .delay')

    let soleboxSettings = new Solebox()

    chrome.storage.sync.get(null, function (store) {
        console.log(store.solebox)
        if (store.solebox) {
            const settings = JSON.parse(store.solebox)
            status.checked = soleboxSettings.status = settings.status || false
            mode.value = soleboxSettings.mode = settings.mode || ''
            delay.value = soleboxSettings.delay = settings.delay || ''
            size.value = soleboxSettings.size = settings.size || ''
            min.value = soleboxSettings.min = settings.min || ''
            max.value = soleboxSettings.max = settings.max || ''

            dashMode.textContent = `Mode: ${settings.mode.toString().charAt(0).toUpperCase() || `Default`}${settings.mode.toString().slice(1)}`
            dashDelay.textContent = `Delay: ${settings.delay.toString().charAt(0).toUpperCase()}${settings.delay.toString().slice(1)}`
        }
        else {
            status.checked = soleboxSettings.status || false
            mode.value = soleboxSettings.mode = ''
            delay.value = soleboxSettings.delay = ''
            size.value = soleboxSettings.size = ''
            min.value = soleboxSettings.min = ''
            max.value = soleboxSettings.max = ''

            dashMode.textContent = `Mode: Default`
            dashDelay.textContent = `Delay: Default`
        }
    })

    status.addEventListener('click', () => {
        soleboxSettings.status = status.checked
        chrome.storage.sync.set({
            'solebox': JSON.stringify(soleboxSettings)
        });
    })

    mode.addEventListener('change', () => {
        soleboxSettings.mode = mode.value
        chrome.storage.sync.set({
            'solebox': JSON.stringify(soleboxSettings)
        });
        dashMode.textContent = `Mode: ${mode.value.charAt(0).toUpperCase() || `Default`}${mode.value.slice(1)}`
    })

    delay.addEventListener('change', () => {
        soleboxSettings.delay = +delay.value
        chrome.storage.sync.set({
            'solebox': JSON.stringify(soleboxSettings)
        });
        dashDelay.textContent = `Delay: ${+delay.value.charAt(0).toUpperCase()}${delay.value.slice(1)}`
    })

    size.addEventListener('change', () => {
        if (size.value === 'random') {
            soleboxSettings.size = size.value
        }
        else {
            soleboxSettings.size = +size.value
        }
        chrome.storage.sync.set({
            'solebox': JSON.stringify(soleboxSettings)
        });
    })

    min.addEventListener('change', () => {
        soleboxSettings.min = +min.value
        chrome.storage.sync.set({
            'solebox': JSON.stringify(soleboxSettings)
        });
    })

    max.addEventListener('change', () => {
        soleboxSettings.max = +max.value
        chrome.storage.sync.set({
            'solebox': JSON.stringify(soleboxSettings)
        });
    })
})

class Solebox {
    status
    mode
    delay
    size
    min
    max
}