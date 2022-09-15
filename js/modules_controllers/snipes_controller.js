document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('.item#snipes #snipesStatus')
    const mode = document.querySelector('.dashboard#snipes #mode_selection')
    const delay = document.querySelector('.dashboard#snipes #delay')
    const size = document.querySelector('.dashboard#snipes #sizing_selection')
    const min = document.querySelector('.dashboard#snipes #min_selection')
    const max = document.querySelector('.dashboard#snipes #max_selection')

    const dashMode = document.querySelector('.item#snipes .mode')
    const dashDelay = document.querySelector('.item#snipes .delay')

    let snipesSettings = new Snipes()

    chrome.storage.sync.get(null, function (store) {
        console.log(store.snipes)
        if (store.snipes) {
            const settings = JSON.parse(store.snipes)
            status.checked = snipesSettings.status = settings.status || false
            mode.value = snipesSettings.mode = settings.mode || ''
            delay.value = snipesSettings.delay = settings.delay || ''
            size.value = snipesSettings.size = settings.size || ''
            min.value = snipesSettings.min = settings.min || ''
            max.value = snipesSettings.max = settings.max || ''

            dashMode.textContent = `Mode: ${settings.mode.toString().charAt(0).toUpperCase()}${settings.mode.toString().slice(1)}`
            dashDelay.textContent = `Delay: ${settings.delay.toString().charAt(0).toUpperCase()}${settings.delay.toString().slice(1)}`
        }
        else {
            status.checked = snipesSettings.status || false
            mode.value = snipesSettings.mode = ''
            delay.value = snipesSettings.delay = ''
            size.value = snipesSettings.size = ''
            min.value = snipesSettings.min = ''
            max.value = snipesSettings.max = ''

            dashMode.textContent = `Mode: Default`
            dashDelay.textContent = `Delay: Default`
        }
    })

    status.addEventListener('click', () => {
        snipesSettings.status = status.checked
        chrome.storage.sync.set({
            'snipes': JSON.stringify(snipesSettings)
        });
    })

    mode.addEventListener('change', () => {
        snipesSettings.mode = mode.value
        chrome.storage.sync.set({
            'snipes': JSON.stringify(snipesSettings)
        });
        dashMode.textContent = `Mode: ${mode.value.charAt(0).toUpperCase()}${mode.value.slice(1)}`
    })

    delay.addEventListener('change', () => {
        snipesSettings.delay = +delay.value
        chrome.storage.sync.set({
            'snipes': JSON.stringify(snipesSettings)
        });
        dashDelay.textContent = `Delay: ${delay.value.charAt(0).toUpperCase()}${delay.value.slice(1)}`
    })

    size.addEventListener('change', () => {
        if (size.value === 'random') {
            snipesSettings.size = size.value
        }
        else {
            snipesSettings.size = +size.value
        }
        chrome.storage.sync.set({
            'snipes': JSON.stringify(snipesSettings)
        });
    })

    min.addEventListener('change', () => {
        snipesSettings.min = +min.value
        chrome.storage.sync.set({
            'snipes': JSON.stringify(snipesSettings)
        });
    })

    max.addEventListener('change', () => {
        snipesSettings.max = +max.value
        chrome.storage.sync.set({
            'snipes': JSON.stringify(snipesSettings)
        });
    })
})

class Snipes {
    status
    mode
    delay
    size
    min
    max
}