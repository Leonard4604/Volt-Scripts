async function extractStorage() {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(null, function(store) {
            const snipes = JSON.parse(store.snipes)
            resolve([snipes, store])
        })
    })
}

async function addToCart(body) {
    return fetch("https://www.snipes.it/add-product?format=ajax", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
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

async function getProductInfo(size, min, max) {
    const product = document.querySelectorAll('div[class="b-swatch-value-wrapper"]')
    const pids = JSON.parse(document.querySelector('.b-find-in-store.js-find-in-store').dataset.storeAvailabilityInfo)
        .filter((item) => {
            return item.isAvailableOnline
        })
    if (size !== 'random' &&  size) {
            let toReturn = false
            product.forEach((item, index) => {
                if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable') && 
                    convert(item.querySelector('a').dataset.value) === size) {
                    toReturn = {
                        pid: pids[index].ID,
                        size: item.querySelector('a').dataset.value
                    }
                }
            })
        return toReturn
    }
    if (size === 'random' && min && max) {
        let toReturn = []
        product.forEach((item, index) => {
            if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable') && 
                convert(item.querySelector('a').dataset.value) >= min &&
                convert(item.querySelector('a').dataset.value) <= max) {
                    toReturn.push({
                    pid: pids[index].ID,
                    size: item.querySelector('a').dataset.value
                })
            }
        })
        if (toReturn.length) {
            return toReturn[Math.floor(Math.random() * toReturn.length)]
        }
    }
    if (size === 'random' && (!min || !max)) {
        let toReturn = []
        product.forEach((item, index) => {
            if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable')) {
                toReturn.push({
                    pid: pids[index].ID,
                    size: item.querySelector('a').dataset.value
                }) 
            }
        })
        if (toReturn.length) {
            return toReturn[Math.floor(Math.random() * toReturn.length)]
        }
    }
    return false
}

async function generateCSRFToken() {
    return fetch("https://www.snipes.it/on/demandware.store/Sites-snse-SOUTH-Site/it_IT/CSRF-Generate?format=ajax", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.snipes.it/checkout?stage=shipping",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function validateAddress(body) {
    return fetch("https://www.snipes.it/on/demandware.store/Sites-snse-SOUTH-Site/it_IT/CheckoutAddressServices-Validate?format=ajax", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.snipes.it/checkout?stage=shipping",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function getHMACToken(body) {
    return fetch("https://www.snipes.it/on/demandware.store/Sites-snse-SOUTH-Site/it_IT/Page-GetHMACToken?format=ajax", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.snipes.it/checkout?stage=shipping",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function submitShipping(body) {
    return fetch("https://www.snipes.it/on/demandware.store/Sites-snse-SOUTH-Site/it_IT/CheckoutShippingServices-SubmitShipping?format=ajax", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-kl-ajax-request": "Ajax_Request",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.snipes.it/checkout?stage=shipping",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function placeOrder() {
    return fetch("https://www.snipes.it/on/demandware.store/Sites-snse-SOUTH-Site/it_IT/CheckoutServices-PlaceOrder?format=ajax", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.snipes.it/checkout?stage=placeOrder",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}