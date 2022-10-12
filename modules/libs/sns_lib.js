async function extractStorage() {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(null, function(store) {
            const sns_naked = JSON.parse(store.sns_naked)
            resolve([sns_naked, store])
        })
    })
}

async function getProductInfo(size, min, max) {
    const product = document.querySelectorAll('#product-size option')
    if (size !== 'random' &&  size) {
        let toReturn = false
        product.forEach(function(item, index) {
            if (item.value) {
                if (size === convert(item.textContent)) {
                    toReturn = {
                        pid: item.value,
                        size: item.textContent
                    }
                }
            }
        })
        return toReturn
    }
    if (size === 'random' && min && max) {
        let toReturn = []
        product.forEach((item, index) => {
            if (item.value) {
                if (convert(item.textContent) >= min && convert(item.textContent) <= max) {
                    toReturn.push({
                        pid: item.value,
                        size: item.textContent
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
        product.forEach((item, index) => {
            if (item.value) {
                toReturn.push({
                    pid: item.value,
                    size: item.textContent
                }) 
            }
        })
        if (toReturn) {
            return toReturn[Math.floor(Math.random() * toReturn.length)]
        }
    }
    if (size !== 'random' && (!min || !max)) {
        logger.update.error('Error in size selection')
        return false
    }
    if (size !== 'random' && (min || max)) {
        logger.update.error('Error in size selection')
        return false
    }
    return false
}

const addToCart = {
    captcha: function(did, token, pid) {
        return fetch("https://www.sneakersnstuff.com/en/cart/add", {
            "headers": {
                "accept": "*/*",
                "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryzQNlhVOpYHGGBSBN",
                "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-kl-ajax-request": "Ajax_Request",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": window.location.href,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `------WebKitFormBoundaryzQNlhVOpYHGGBSBN\r\nContent-Disposition: form-data; name=\"did\"\r\n\r\n${did}\r\n------WebKitFormBoundaryzQNlhVOpYHGGBSBN\r\nContent-Disposition: form-data; name=\"g-recaptcha-response\"\r\n\r\n${token}\r\n------WebKitFormBoundaryzQNlhVOpYHGGBSBN\r\nContent-Disposition: form-data; name=\"id\"\r\n\r\n${pid}\r\n------WebKitFormBoundaryzQNlhVOpYHGGBSBN\r\nContent-Disposition: form-data; name=\"partial\"\r\n\r\nmini-cart\r\n------WebKitFormBoundaryzQNlhVOpYHGGBSBN--\r\n`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
    },
    noCaptcha: function(did, pid) {
        return fetch("https://www.sneakersnstuff.com/en/cart/add", {
            "headers": {
              "accept": "*/*",
              "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
              "content-type": "multipart/form-data; boundary=----WebKitFormBoundary0n4Br44MMoaa5gSY",
              "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-kl-ajax-request": "Ajax_Request",
              "x-requested-with": "XMLHttpRequest"
            },
            "referrer": window.location.href,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `------WebKitFormBoundary0n4Br44MMoaa5gSY\r\nContent-Disposition: form-data; name=\"did\"\r\n\r\n${did}\r\n------WebKitFormBoundary0n4Br44MMoaa5gSY\r\nContent-Disposition: form-data; name=\"id\"\r\n\r\n${pid}\r\n------WebKitFormBoundary0n4Br44MMoaa5gSY\r\nContent-Disposition: form-data; name=\"partial\"\r\n\r\nmini-cart\r\n------WebKitFormBoundary0n4Br44MMoaa5gSY--\r\n`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
    }
}