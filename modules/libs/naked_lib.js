async function extractStorage() {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(null, function(store) {
            const sns_naked = JSON.parse(store.sns_naked)
            resolve([sns_naked, store])
        })
    })
}

async function getProductInfo(size, min, max) {
    const product = document.querySelectorAll('.dropdown-menu.dropdown-select a')
    if (size !== 'random' &&  size) {
        let toReturn = false
        product.forEach(function(item, index) {
            if (item.dataset.target === '#product-form-select' && !item.className.includes('disabled')) {
                if (convert(item.textContent) === size) {
                    toReturn = {
                        pid: item.dataset.value,
                        size: '' + convert(item.textContent)
                    }
                }
            }
        })
        if (toReturn) {
            return toReturn
        }
    }
    if (size === 'random' && min && max) {
        let toReturn = []
        product.forEach(function(item, index) {
            if (item.dataset.target === '#product-form-select' && !item.className.includes('disabled')) {
                if (convert(item.textContent) >= min && convert(item.textContent) <= max) {
                    toReturn.push({
                        pid: item.dataset.value,
                        size: '' + convert(item.textContent)
                    })
                }
            }
        })
        if (toReturn) {
            return toReturn[Math.floor(Math.random() * toReturn.length)]
        }
    }
    if (size === 'random' && (!min || !max)) {
        let toReturn = []
        product.forEach(function(item, index) {
            if (item.dataset.target === '#product-form-select' && !item.className.includes('disabled')) {
                toReturn.push({
                    pid: item.dataset.value,
                    size: '' + convert(item.textContent)
                })
            }
        })
        if (toReturn) {
            return toReturn[Math.floor(Math.random() * toReturn.length)]
        }
    }
    if (size !== 'random' && (!min || !max)) {
        logger.update.error('Error in size selection')
        return 'error'
    }
    return false
}

async function addToCart(body, token) {
    return fetch("https://www.nakedcph.com/en/cart/add", {
        "headers": {
          "accept": "*/*",
          "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-anticsrftoken": token,
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": window.location.href,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}