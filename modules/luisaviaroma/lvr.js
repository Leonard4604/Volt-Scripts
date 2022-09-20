async function flow(lvr, key, listResponse, orders, discord, address, version) {
    if (!address) {
        logger.wait('Initializing shipping information...')
        address = await getAddress().then(res => res.json());
        console.log(address);
        lvr.address = address
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
                "AddressID":address.Addresses[0].AddressID,
                "FirstName":address.Addresses[0].FirstName,
                "LastName":address.Addresses[0].LastName,
                "Phone":address.Addresses[0].Phone,
                "CountryId":address.Addresses[0].CountryID,
                "Address":address.Addresses[0].Address,
                "ZipCode":address.Addresses[0].ZipCode,
                "City":address.Addresses[0].City,
                "StateId":address.Addresses[0].ProvID,
                "CodFisc":address.Addresses[0].CodFisc,
                "PecDestinatario":address.Addresses[0].PecDestinatario,
                "CodDestinatario":address.Addresses[0].CodDestinatario
            },
            "BillAddress":{
                "AddressID":address.Addresses[0].AddressID,
                "FirstName":address.Addresses[0].FirstName,
                "LastName":address.Addresses[0].LastName,
                "Phone":address.Addresses[0].Phone,
                "CountryId":address.Addresses[0].CountryID,
                "Address":address.Addresses[0].Address,
                "ZipCode":address.Addresses[0].ZipCode,
                "City":address.Addresses[0].City,
                "StateId":address.Addresses[0].ProvID,
                "CodFisc":address.Addresses[0].CodFisc,
                "PecDestinatario":address.Addresses[0].PecDestinatario,
                "CodDestinatario":address.Addresses[0].CodDestinatario
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
                "AddressID":address.Addresses[0].AddressID,
                "FirstName":address.Addresses[0].FirstName,
                "LastName":address.Addresses[0].LastName,
                "Phone":address.Addresses[0].Phone,
                "CountryId":address.Addresses[0].CountryID,
                "Address":address.Addresses[0].Address,
                "ZipCode":address.Addresses[0].ZipCode,
                "City":address.Addresses[0].City,
                "StateId":address.Addresses[0].ProvID,
                "CodFisc":address.Addresses[0].CodFisc,
                "PecDestinatario":address.Addresses[0].PecDestinatario,
                "CodDestinatario":address.Addresses[0].CodDestinatario
            },
            "BillAddress":{
                "AddressID":address.Addresses[0].AddressID,
                "FirstName":address.Addresses[0].FirstName,
                "LastName":address.Addresses[0].LastName,
                "Phone":address.Addresses[0].Phone,
                "CountryId":address.Addresses[0].CountryID,
                "Address":address.Addresses[0].Address,
                "ZipCode":address.Addresses[0].ZipCode,
                "City":address.Addresses[0].City,
                "StateId":address.Addresses[0].ProvID,
                "CodFisc":address.Addresses[0].CodFisc,
                "PecDestinatario":address.Addresses[0].PecDestinatario,
                "CodDestinatario":address.Addresses[0].CodDestinatario
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
    const orderResponse = await placeOrder(JSON.stringify(orderInfo)).then(res => res.json())
    if (!orderResponse.ErrorDescription) {
        const paymentLink = orderResponse.CreateOrderResponse.Action.Url
        logger.update.success(`Product checked out`)

        const hook = new Checkout()
        const analytic = new Analytic()
        hook.user = 'Leonard#4604'
        hook.product = analytic.product = orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Description
        hook.site = analytic.site = 'Luisaviaroma'
        hook.size = analytic.size = `${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Size} x ${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Quantity}`
        hook.product_url = `[Link](https://www.luisaviaroma.com/${orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Code})`
        hook.product_image = analytic.image = 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
        hook.pid = orderResponse.ConfirmUserResponse.ListResponse.Rows[0].Code
        hook.date = getDate()
        hook.mode = 'Normal'
        hook.key = key
        hook.version = version
        hook.paymentType = 'PayPal'
        hook.paypalLink = paymentLink
        hook.url = discord 
        analytic.price = orderResponse.ConfirmUserResponse.ListResponse.Rows[0].TotalViewValue
        hook.private()
        hook.public()

        orders = JSON.parse(orders)
        orders.push(analytic)
        chrome.storage.sync.set({
            'orders': JSON.stringify(orders)
        });

        window.open(paymentLink,'_blank');
    }
    else if (orderResponse.ErrorDescription) {
        logger.update.error(orderResponse.ErrorDescription)
    }
}

async function process(lvr, key, size, min, max, orders, discord, address, items, version) {
    logger.wait('Adding to cart...')
    const product = await getProductInfo(size, min, max)
    console.log(product)
    if (product) {
        const body = {
            SeasonId: product.seasonId,
            CollectionId: product.collectionId,
            ItemId: product.itemId,
            VendorColorId: product.vendorColorId,
            SizeTypeId: product.sizeTypeId,
            SizeId: product.sizeId,
            Quantity: items,
            IsMobile: false
        }
        const result = await addToCart(JSON.stringify(body), window.location.href)
            .then(res => 
                res.json()
            )
            .catch(err => {
                logger.update.error(`Hit by Akamai, Please clear your cookies and try again`)
                return false
            })
        console.log(result)
        if (result) {
            if (result.ListResponse) {
                logger.update.success(`Product added to cart`)
                await flow(lvr, key, result.ListResponse, orders, discord, address, version)
                return true
            }
            else if (!result.ListResponse) {
                logger.update.error(result.ErrorDescription)
                return false
            }
        }
        return false
    }
    if (!product) {
        logger.update.error('Product not available')
        return false
    }
}


async function executeScript() {
    const [lvr, key, volt, status, size, min, max, orders, discord, address, items, version] = await extractStorage()
    if (volt && status === true) {
        logger.display()
        await process(lvr, key, size, min, max, orders, discord, address, items, version)
    }
}

executeScript()