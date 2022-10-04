async function flow(lvr, volt, listResponse) {
    if (!lvr.address) {
        logger.wait('Initializing shipping information...')
        lvr.address = await getAddress().then(res => res.json());
        chrome.storage.sync.set({
            'luisaviaroma': JSON.stringify(lvr)
        });
        logger.update.success(`Shipping information initialized successfully`)
    }

    logger.wait('Placing order...')
    const orderInfo = {
        "IsMobile":false,
        "ConfirmUser":{
            "Account":{
                "Email":listResponse.UserInfo.Id,
                "FirstName":listResponse.UserInfo.FirstName,
                "LastName":listResponse.UserInfo.LastName,
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
            "PaymentCode":"PPA",
            "ShippingTypeService":listResponse.SelectedShippingAgent.TypeService,
            "InvoiceRequested":false
        },
        "CreateOrder":{
            "type":"loggeduser",
            "Account":{
                "Email":listResponse.UserInfo.Id,
                "FirstName":listResponse.UserInfo.FirstName,
                "LastName":listResponse.UserInfo.LastName,
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
            "ShippingTypeService":listResponse.SelectedShippingAgent.TypeService,
            "PaymentCode":"PPA",
            "AcceptPayPalBillingAgreement":false,
            "CreditCard":null,
            "PromoPaymentCode":listResponse.OrderInfo.PromoPaymentCode,
            "Promos": listResponse.OrderInfo.Promos,
            "Rows":listResponse.OrderInfo.Rows,
            "IsGuest":listResponse.UserInfo.IsGuest,
            "CartId":listResponse.OrderInfo.CartId,
            "FattCurrencyId":listResponse.CountryInfo.CurrencyFatt,
            "ViewCurrencyId":listResponse.CountryInfo.CurrencyView,
            "Language":listResponse.CountryInfo.Id,
            "Mobile":false,
            "ShippingCost":listResponse.OrderInfo.ShippingCost,
            "ShippingAgent":"",
            "InvoiceRequested":false,
            "SalesTaxes":listResponse.OrderInfo.SalesTaxes
        }
    }
    const promos = lvr.discounts
        .split('\n')
        .map((item) => {
            return item.replaceAll(' ', '')
        })
    promos.forEach((item, index) => {
        orderInfo.CreateOrder.Promos.push(
            {
                Type: 0, 
                Code: item
            }
        )
    })
    const orderResponse = await placeOrder(JSON.stringify(orderInfo)).then(res => res.json())
    if (orderResponse.CreateOrderResponse.Action) {
        const paymentLink = orderResponse.CreateOrderResponse.Action.Url
        logger.update.success(`Product checked out`)
        const hook = new Checkout()
        const analytic = new Analytic()

        hook.store = analytic.store = 'Luisaviaroma'
        hook.product = analytic.product = `${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].DesignerDescription} - ${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Description}`
        hook.size = analytic.size = `${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Size} x ${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Quantity}`
        hook.product_url = `[Link](https://www.luisaviaroma.com/${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Code})`
        hook.product_image = analytic.image = `https://Volt-Image-Proxy.leonard4604.repl.co/proxy?url=https:${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Photo}`
        hook.pid = orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Code
        hook.date = getDate()
        hook.mode = 'Normal'
        hook.key = volt.key
        hook.version = volt.version
        hook.paymentLink = paymentLink
        hook.url = JSON.parse(volt.discord).url
        analytic.price = orderResponse.ConfirmUserResponse.ListResponse.Rows[0].TotalViewValue
        
        await hook.private()
        await hook.public()

        if (!volt.orders) {
            volt.orders = []
        }
        else {
            volt.orders = JSON.parse(volt.orders)
        }
        volt.orders.push(analytic)
        chrome.storage.sync.set({
            'orders': JSON.stringify(volt.orders)
        });

        window.open(paymentLink,'_blank');
    }
    if (!orderResponse.CreateOrderResponse) {
        logger.update.error("Error while creating order")
    }
    else if (!orderResponse.ConfirmUserResponse.ListResponse) {
        logger.update.error("Error while creating order")
    }
    else if (!orderResponse.CreateOrderResponse.Action) {
        logger.update.error("Error while creating order")
    }
    if (orderResponse.ErrorDescription) {
        logger.update.error(orderResponse.ErrorDescription)

        return false
    }
    return true
}

async function process(lvr, volt) {
    logger.wait('Adding to cart...')
    let product = await getProductInfo(lvr.size, lvr.min, lvr.max)
    if (!product || product === 'error') {
        logger.update.error('Product not available')
        logger.wait('Monitoring product...')
        product = await restock(lvr.size, lvr.min, lvr.max, lvr.delay)
    }
    if (product && product !== 'error') {
        const body = {
            SeasonId: product.seasonId,
            CollectionId: product.collectionId,
            ItemId: product.itemId,
            VendorColorId: product.vendorColorId,
            SizeTypeId: product.sizeTypeId,
            SizeId: product.sizeId,
            Quantity: lvr.items,
            IsMobile: false
        }
        const result = await addToCart(JSON.stringify(body))
            .then(res => 
                res.json()
            )
            .catch(err => {
                logger.update.error(`Hit by Akamai. Please clear your cookies and try again.`)
                return false
            })
        if (result) {
            if (result.ListResponse) {
                logger.update.success(`Product added to cart`)
                if (!lvr.account) {
                    lvr.account = result.ListResponse.UserInfo
                    chrome.storage.sync.set({
                        'luisaviaroma': JSON.stringify(lvr)
                    });
                }
                await flow(lvr, volt, result.ListResponse)
                return true
            }
            else if (!result.ListResponse) {
                logger.update.error(result.ErrorDescription)
                return false
            }
        }
        return false
    }
    return false
}


async function executeScript() {
    const [lvr, volt] = await extractStorage()
    if (volt.active && lvr.status === true) {
        logger.display()
        checkDevtools(volt.key, volt.version)
        clearCartButton()
        await process(lvr, volt)
    }
}

function clearCartButton() {
    const clearBtn = document.querySelector('#clear-cart-volt-logger')
    clearBtn.addEventListener('click', async () => {
        await clearCart()
    })
}

executeScript()