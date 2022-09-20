async function extractStorage() {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(null, function(store) {
            const lvr = JSON.parse(store.luisaviaroma)
            const discord = JSON.parse(store.discord)
            resolve([
                lvr,
                store.key,
                store.active, 
                lvr.status,
                lvr.size,
                lvr.min,
                lvr.max,
                store.orders || [],
                discord.url,
                lvr.address,
                lvr.items,
                store.version
            ])
        })
    })
}

async function extractInfo() {
    return await new Promise(resolve => {
        try {
            const prodInfo = JSON.parse(document.querySelector('#allContainer > div.site-main-container.container-full > script').textContent.split('window.__BODY_MODEL__ = ')[1].split(';window.hydratecounter')[0])
            resolve(prodInfo)
        } catch {

        }
    }, 10)
}

async function getProductInfo(size, min, max) {
    const product = await extractInfo()
    if (size !== 'random' &&  size) {
            let toReturn = false
            product.Availability.forEach((item, index) => {
                if (+item.SizeValue === size) {
                    toReturn = {
                        seasonId: product.ItemParameters.SeasonId,
                        collectionId: product.ItemParameters.CollectionId,
                        itemId: +product.ItemParameters.ItemId,
                        vendorColorId: product.ItemParameters.VendorColorId,
                        sizeTypeId: item.SizeTypeId,
                        sizeId: item.SizeId.toString()
                    }
                }
            })
        return toReturn
    }
    if (size === 'random' && min && max) {
        let toReturn = false
        product.Availability.forEach((item, index) => {
            if (+item.SizeValue >= min && +item.SizeValue <= max) {
                toReturn = {
                    seasonId: product.ItemParameters.SeasonId,
                    collectionId: product.ItemParameters.CollectionId,
                    itemId: +product.ItemParameters.ItemId,
                    vendorColorId: product.ItemParameters.VendorColorId,
                    sizeTypeId: item.SizeTypeId,
                    sizeId: item.SizeId.toString()
                }
            }
        })
        return toReturn
    }
    if (size === 'random' && (!min || !max)) {
        let availableProducts = []
        product.Availability.forEach((item, index) => {
            availableProducts.push({
                seasonId: product.ItemParameters.SeasonId,
                collectionId: product.ItemParameters.CollectionId,
                itemId: +product.ItemParameters.ItemId,
                vendorColorId: product.ItemParameters.VendorColorId,
                sizeTypeId: item.SizeTypeId,
                sizeId: item.SizeId.toString()
            }) 
        })
        if (availableProducts) {
            return availableProducts[Math.floor(Math.random() * availableProducts.length)]
        }
    }
    return false
}

async function addToCart(body, referrer) {
    return fetch("https://www.luisaviaroma.com/myarea/bag/add", {
    "headers": {
        "accept": "*/*",
        "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/json",
        "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-kl-ajax-request": "Ajax_Request",
        "x-lvr-requested-with": "bag/add",
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

async function getAddress() {
    return fetch("https://www.luisaviaroma.com/myarea/usersession/getaddresses", {
    "headers": {
        "accept": "*/*",
        "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/json",
        "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-kl-ajax-request": "Ajax_Request",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.luisaviaroma.com/myarea/myCart.aspx?season=&gender=",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"RewardId\":1}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
    });
}

async function placeOrder(body) {
    return fetch("https://www.luisaviaroma.com/myarea/bag/confirmloggeduserandcreateorder", {
    "headers": {
        "accept": "*/*",
        "accept-language": "it-IT,it;q=0.9,en;q=0.8,en-US;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/json",
        "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-kl-ajax-request": "Ajax_Request",
        "x-lvr-requested-with": "checkout/confirmloggeduserandcreateorder",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.luisaviaroma.com/myarea/myCart.aspx?season=&gender=",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": body,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
    });
}