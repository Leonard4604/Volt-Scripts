async function extractStorage() {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(null, function(store) {
            const lvr = JSON.parse(store.luisaviaroma)
            resolve([lvr, store])
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
    })
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
        let toReturn = []
        product.Availability.forEach((item, index) => {
            if (+item.SizeValue >= min && +item.SizeValue <= max) {
                toReturn.push({
                    seasonId: product.ItemParameters.SeasonId,
                    collectionId: product.ItemParameters.CollectionId,
                    itemId: +product.ItemParameters.ItemId,
                    vendorColorId: product.ItemParameters.VendorColorId,
                    sizeTypeId: item.SizeTypeId,
                    sizeId: item.SizeId.toString()
                })
            }
        })
        if (toReturn) {
            return toReturn[Math.floor(Math.random() * toReturn.length)]
        }
    }
    if (size === 'random' && (!min || !max)) {
        let toReturn = []
        product.Availability.forEach((item, index) => {
            toReturn.push({
                seasonId: product.ItemParameters.SeasonId,
                collectionId: product.ItemParameters.CollectionId,
                itemId: +product.ItemParameters.ItemId,
                vendorColorId: product.ItemParameters.VendorColorId,
                sizeTypeId: item.SizeTypeId,
                sizeId: item.SizeId.toString()
            }) 
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

async function restock(size, min, max, delay) {
    const origin = window.location.origin
    const path = window.location.pathname
    await antiCache(path)

    return new Promise(resolve => {
        let delayInterval = setInterval(async function() {
            await antiCache(path)

            let pageData = await fetch(`${origin}${path}`)
            .then(response => response.text())

            const parser = new DOMParser();
            const doc = parser.parseFromString(pageData, "text/html");

            const product = JSON.parse(doc.querySelector('#allContainer > div.site-main-container.container-full > script').textContent.split('window.__BODY_MODEL__ = ')[1].split(';window.hydratecounter')[0])

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
                clearInterval(delayInterval)
                resolve(toReturn)
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
                clearInterval(delayInterval)
                resolve(toReturn)
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
                if (availableProducts.length !== 0) {
                    clearInterval(delayInterval)
                    resolve(availableProducts[Math.floor(Math.random() * availableProducts.length)])
                }
            }
            if (size !== 'random' && (!min || !max)) {
                clearInterval(delayInterval)
                resolve(false)
            }
        }, delay)
    }); 
}

async function addToCart(body) {
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
    "referrer": window.location.href,
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

async function changeLanguage(body) {
    return fetch("https://www.luisaviaroma.com/myarea/usersession/changelanguage", {
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
        "referrer": window.location.href,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function antiCache(currentUrl) {
    const languages = [
        "EN",
        "IT",
        "DE",
        "ZH",
        "RU",
        "ES",
        "FR",
        "KO",
        "JA",
        "TR"
    ]

    const language = {
        "Language":languages[Math.floor(Math.random() * languages.length)],
        "ClearCountryRelatedFilters":true,
        "CurrentUrl":currentUrl
    }
    
    await changeLanguage(JSON.stringify(language))
}

async function getCart(body) {
    return fetch("https://www.luisaviaroma.com/myarea/bag/confirmloggeduser", {
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
        "x-lvr-requested-with": "checkout/confirmLoggedUser",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.luisaviaroma.com/myarea/myCart.aspx",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": body,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
    });
}

async function removeItem(body) {
    return fetch("https://www.luisaviaroma.com/myarea/bag/remove", {
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
            "x-lvr-requested-with": "bag/remove",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.luisaviaroma.com/myarea/myCart.aspx",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

async function clearCart() {
    logger.wait('Cleaning cart...')
    let [lvr] = await extractStorage()
    if (!lvr.address) {
        logger.wait('Initializing shipping information...')
        lvr.address = await getAddress().then(res => res.json());
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(lvr)
        });
        logger.update.success(`Shipping information initialized successfully`)
    }

    const cartInfo = {
        "IsMobile":false,
        "Account":{
            "Email":lvr.account.Id,
            "FirstName":lvr.account.FirstName,
            "LastName":lvr.account.LastName,
            "SubscribeNewsLetter":false,
            "SubscribeLoyalty":false,
            "Password":""
        },
        "ShipAddress":{
            "AddressID":lvr.address.Addresses[0].AddressID,
            "FirstName":lvr.address.Addresses[0].FirstName,
            "LastName":lvr.address.Addresses[0].LastName,
            "Phone":lvr.address.Addresses[0].Phone,
            "CountryId":lvr.address.Addresses[0].CountryID,
            "Address":lvr.address.Addresses[0].Address,
            "ZipCode":lvr.address.Addresses[0].ZipCode,
            "City":lvr.address.Addresses[0].City,
            "StateId":lvr.address.Addresses[0].ProvID,
            "CodFisc":lvr.address.Addresses[0].CodFisc,
            "PecDestinatario":lvr.address.Addresses[0].PecDestinatario,
            "CodDestinatario":lvr.address.Addresses[0].CodDestinatario
        },
        "BillAddress":{
            "AddressID":lvr.address.Addresses[0].AddressID,
            "FirstName":lvr.address.Addresses[0].FirstName,
            "LastName":lvr.address.Addresses[0].LastName,
            "Phone":lvr.address.Addresses[0].Phone,
            "CountryId":lvr.address.Addresses[0].CountryID,
            "Address":lvr.address.Addresses[0].Address,
            "ZipCode":lvr.address.Addresses[0].ZipCode,
            "City":lvr.address.Addresses[0].City,
            "StateId":lvr.address.Addresses[0].ProvID,
            "CodFisc":lvr.address.Addresses[0].CodFisc,
            "PecDestinatario":lvr.address.Addresses[0].PecDestinatario,
            "CodDestinatario":lvr.address.Addresses[0].CodDestinatario
        },
        "PaymentCode":"",
        "ShippingTypeService":"E",
        "InvoiceRequested":false
    }
    const cart = await getCart(JSON.stringify(cartInfo)).then(res => res.json())
    
    cart.ListResponse.Rows.forEach(async (item, index) => {
        const clear = {
            "ItemCode":item.Data.ItemCode,
            "ItemCodeMaster":item.Data.ItemCodeMaster,
            "SeasonId":item.Data.SeasonId,
            "CollectionId":item.Data.CollectionId,
            "ItemId":item.Data.ItemId,
            "SizeTypeId":item.Data.SizeTypeId,
            "SizeId":item.Data.SizeId,
            "VendorColorId":item.Data.VendorColorId,
            "ComColorId":item.Data.ComColorId,
            "CustomizedAttributes":item.Data.CustomizedAttributes,
            "PopulateExtraInfo":false,
            "PopulateTrackingInfo":true,
            "Quantity":item.Quantity,
            "CategoryEnglishDescription":item.CategoryEnglishDescription,
            "EncodedVendorColorId":item.EncodedVendorColorId,
            "GenderMemoCode":item.GenderMemoCode,
            "SublineEnglishDescription":item.SublineEnglishDescription,
            "TotalFattValue":item.TotalFattValue,
            "DesignerDescription":item.DesignerDescription,
            "IsMobile":false
        }
        const remove = await removeItem(JSON.stringify(clear)).then(res => res.json());
        if (!remove.ErrorDescription) {
            logger.update.success(`Successfully removed ${remove.ListResponse.Rows[0].DesignerDescription} - ${remove.ListResponse.Rows[0].Description} in size: ${remove.ListResponse.Rows[0].Size} of quantity: ${remove.ListResponse.Rows[0].Quantity}`)
        }
    })
}