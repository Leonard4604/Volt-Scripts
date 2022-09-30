document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('.item#sns_naked #sns_nakedStatus')
    const mode = document.querySelector('.dashboard#sns_naked #mode_selection')
    const delay = document.querySelector('.dashboard#sns_naked #delay')
    const size = document.querySelector('.dashboard#sns_naked #sizing_selection')
    const min = document.querySelector('.dashboard#sns_naked #min_selection')
    const max = document.querySelector('.dashboard#sns_naked #max_selection')

    const dashMode = document.querySelector('.item#sns_naked .mode')
    const dashDelay = document.querySelector('.item#sns_naked .delay')

    let sns_nakedSettings = new sns_naked()

    chrome.storage.sync.get(null, function (store) {
        if (store.sns_naked) {
            const settings = JSON.parse(store.sns_naked)
            status.checked = sns_nakedSettings.status = settings.status || false
            mode.value = sns_nakedSettings.mode = settings.mode || ''
            delay.value = sns_nakedSettings.delay = settings.delay || ''
            size.value = sns_nakedSettings.size = settings.size || ''
            min.value = sns_nakedSettings.min = settings.min || ''
            max.value = sns_nakedSettings.max = settings.max || ''

            dashMode.textContent = `Mode: ${settings.mode.toString().charAt(0).toUpperCase() || `Default`}${settings.mode.toString().slice(1)}`
            dashDelay.textContent = `Delay: ${settings.delay.toString().charAt(0).toUpperCase()}${settings.delay.toString().slice(1)}`
        }
        else {
            status.checked = sns_nakedSettings.status || false
            mode.value = sns_nakedSettings.mode = ''
            delay.value = sns_nakedSettings.delay = ''
            size.value = sns_nakedSettings.size = ''
            min.value = sns_nakedSettings.min = ''
            max.value = sns_nakedSettings.max = ''

            dashMode.textContent = `Mode: Default`
            dashDelay.textContent = `Delay: Default`
        }
    })

    status.addEventListener('click', () => {
        sns_nakedSettings.status = status.checked
        chrome.storage.sync.set({
            'sns_naked': JSON.stringify(sns_nakedSettings)
        });
    })

    mode.addEventListener('change', () => {
        sns_nakedSettings.mode = mode.value
        chrome.storage.sync.set({
            'sns_naked': JSON.stringify(sns_nakedSettings)
        });
        dashMode.textContent = `Mode: ${mode.value.charAt(0).toUpperCase() || `Default`}${mode.value.slice(1)}`
    })

    delay.addEventListener('change', () => {
        sns_nakedSettings.delay = +delay.value
        chrome.storage.sync.set({
            'sns_naked': JSON.stringify(sns_nakedSettings)
        });
        dashDelay.textContent = `Delay: ${+delay.value.charAt(0).toUpperCase()}${delay.value.slice(1)}`
    })

    size.addEventListener('change', () => {
        if (size.value === 'random') {
            sns_nakedSettings.size = size.value
        }
        else {
            sns_nakedSettings.size = +size.value
        }
        chrome.storage.sync.set({
            'sns_naked': JSON.stringify(sns_nakedSettings)
        });
    })

    min.addEventListener('change', () => {
        sns_nakedSettings.min = +min.value
        chrome.storage.sync.set({
            'sns_naked': JSON.stringify(sns_nakedSettings)
        });
    })

    max.addEventListener('change', () => {
        sns_nakedSettings.max = +max.value
        chrome.storage.sync.set({
            'sns_naked': JSON.stringify(sns_nakedSettings)
        });
    })
})

class sns_naked {
    status
    mode
    delay
    size
    min
    max
}