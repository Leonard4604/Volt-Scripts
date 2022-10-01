async function extractStorage() {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(null, function(store) {
            const solebox = JSON.parse(store.solebox)
            resolve([solebox, store])
        })
    })
}

async function getProductInfo(size, min, max) {
    const product = document.querySelectorAll('.b-pdp-size-wrapper .b-swatch-value-wrapper a')
    if (size !== 'random' &&  size) {
        let toReturn = false
        product.forEach((item, index) => {
            if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable') && 
                convert(item.dataset.value) === size) {
                toReturn = {
                    pid: item.dataset.variantId,
                    size: item.dataset.value
                }
            }
        })
        return toReturn
    }
    if (size === 'random' && min && max) {
        let toReturn = []
        product.forEach((item, index) => {
            if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable') && 
                convert(item.dataset.value) >= min &&
                convert(item.dataset.value) <= max) {
                    toReturn.push({
                        pid: item.dataset.variantId,
                        size: item.dataset.value
                })
            }
        })
        if (toReturn.length) {
            return toReturn[Math.floor(Math.random() * toReturn.length)]
        }
        return false
    }
    if (size === 'random' && (!min || !max)) {
        let toReturn = []
        product.forEach((item, index) => {
            if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable')) {
                toReturn.push({
                    pid: item.dataset.variantId,
                    size: item.dataset.value
                }) 
            }
        })
        if (toReturn.length) {
            return toReturn[Math.floor(Math.random() * toReturn.length)]
        }
    }
    return false
}

async function addToCart(body) {
    return fetch("https://www.solebox.com/en_IT/add-product?format=ajax", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
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

async function generateCSRFToken() {
    return fetch("https://www.solebox.com/on/demandware.store/Sites-solebox-Site/en_IT/CSRF-Generate?format=ajax", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-kl-ajax-request": "Ajax_Request",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.solebox.com/en_IT/checkout?stage=shipping",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function shippingRates(body) {
    return fetch("https://www.solebox.com/on/demandware.store/Sites-solebox-Site/en_IT/CheckoutShippingServices-ShippingRates?format=ajax", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.solebox.com/en_IT/checkout?stage=shipping",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function submitShipping(addressId, body) {
    return fetch(`https://www.solebox.com/on/demandware.store/Sites-solebox-Site/en_IT/CheckoutShippingServices-SubmitShipping?region=europe&country=undefined&addressId=${addressId}&format=ajax`, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.solebox.com/en_IT/checkout?stage=shipping",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function submitPayment(body) {
    return fetch("https://www.solebox.com/on/demandware.store/Sites-solebox-Site/en_IT/CheckoutServices-SubmitPayment?format=ajax", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-kl-ajax-request": "Ajax_Request",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.solebox.com/en_IT/checkout?stage=payment",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function placeOrder() {
    return fetch("https://www.solebox.com/on/demandware.store/Sites-solebox-Site/en_IT/CheckoutServices-PlaceOrder?format=ajax", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-kl-ajax-request": "Ajax_Request",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.solebox.com/en_IT/checkout?stage=placeOrder",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}