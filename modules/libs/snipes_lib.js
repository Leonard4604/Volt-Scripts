async function extractStorage() {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(null, function(store) {
            const snipes = JSON.parse(store.snipes)
            resolve([
                store.active, 
                snipes.status,
                snipes.size,
                snipes.min,
                snipes.max
            ])
        })
    })
}

async function addToCart(body, referrer) {
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
        "referrer": referrer,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

const pid = {
    getProductInfo: async function(pid) {
        return fetch(`https://www.snipes.it/p/${pid}.html?dwvar_${pid}_size=&format=ajax`, {
            "headers": {
              "accept": "application/json, text/javascript, */*; q=0.01",
              "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
              "content-type": "application/json",
              "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest"
            },
            "referrer": `https://www.snipes.it/p/${pid}.html`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
    }
}

async function getProductInfo(size, min, max) {
    const product = document.querySelectorAll('div[class="b-swatch-value-wrapper"]')
    if (size !== 'random' &&  size) {
            let toReturn = false
            product.forEach((item, index) => {
                if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable') && 
                    +item.querySelector('a').getAttribute('data-value') === size) {
                    toReturn = {
                        pid: item.querySelector('a').getAttribute('data-variant-id'),
                        size: +item.querySelector('a').getAttribute('data-value')
                    }
                }
            })
        return toReturn
    }
    if (size === 'random' && min && max) {
                let toReturn = false
                product.forEach((item, index) => {
                    if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable') && 
                        +item.querySelector('a').getAttribute('data-value') >= min &&
                        +item.querySelector('a').getAttribute('data-value') <= max) {
                        toReturn = {
                            pid: item.querySelector('a').getAttribute('data-variant-id'),
                            size: +item.querySelector('a').getAttribute('data-value')
                        }
                    }
                })
        return toReturn
    }
    if (size === 'random' && (!min || !max)) {
                let availableProducts = []
                product.forEach((item, index) => {
                    if (item.querySelector('a span').getAttribute('class').includes('b-swatch-value--orderable')) {
                        availableProducts.push({
                            pid: item.querySelector('a').getAttribute('data-variant-id'),
                            size: +item.querySelector('a').getAttribute('data-value')
                        }) 
                    }
                })
                if (availableProducts) {
                    return availableProducts[Math.floor(Math.random() * availableProducts.length)]
                }
    }
    return false
}

function encode(obj) {
    return Object.keys(obj).reduce(function(p, c) {
        if (typeof obj[c] === 'object' && obj[c] !== null) {
            obj[c] = JSON.stringify(obj[c])
        }
        return p.concat([encodeURIComponent(c) + "=" + encodeURIComponent(obj[c]).replace(/%20/g, "+")]);
    }, []).join('&');
}