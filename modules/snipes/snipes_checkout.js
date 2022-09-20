async function process(key, orders, discord, version) {
    logger.wait('Generating CSRF token...')
    const csrfToken = await generateCSRFToken()
        .then(res => res.json())
        .then(object => {
            return object.csrf.token
        })
        .catch(error => {
            console.log(error)
        })
    logger.update.success('Token generated')

    logger.wait('Validating address...')
    const checkoutInfo = JSON.parse(document.querySelector('div[data-checkout-stage="placeOrder"]').getAttribute('data-profile-checkout-info'))
    const validateBody = {
        street: checkoutInfo.profileShippingStepData.preferredAddress.street,
        houseNo: checkoutInfo.profileShippingStepData.preferredAddress.suite,
        postalCode: checkoutInfo.profileShippingStepData.preferredAddress.postalCode,
        city: checkoutInfo.profileShippingStepData.preferredAddress.city,
        country: checkoutInfo.profileShippingStepData.preferredAddress.countryCode.value,
        csrf_token: document.querySelector('div[data-csrf-name="csrf_token"]').getAttribute('data-csrf-token')
    }
    const addressResponse = await validateAddress(encode(validateBody)).then(res => res.json())
    logger.update.success('Address validated')

    const hmacBody = {
        email: checkoutInfo.profileShippingStepData.email,
        csrf_token: csrfToken
    }
    const hmacToken = await getHMACToken(encode(hmacBody)).then(res => res.json())

    logger.wait('Submitting shipping...')
    const shippingBody = {
        originalShipmentUUID: document.querySelector('input[name="originalShipmentUUID"]').value,
        shipmentUUID: document.querySelector('input[name="shipmentUUID"]').value,
        dwfrm_shipping_shippingAddress_shippingMethodID: 'home-delivery_it',
        'address-selector': document.querySelector('input[name="address-selector"]').value,
        dwfrm_shipping_shippingAddress_addressFields_title: checkoutInfo.profileShippingStepData.preferredAddress.title,
        dwfrm_shipping_shippingAddress_addressFields_firstName: checkoutInfo.profileShippingStepData.preferredAddress.firstName,
        dwfrm_shipping_shippingAddress_addressFields_lastName: checkoutInfo.profileShippingStepData.preferredAddress.lastName,
        dwfrm_shipping_shippingAddress_addressFields_postalCode: checkoutInfo.profileShippingStepData.preferredAddress.postalCode,
        dwfrm_shipping_shippingAddress_addressFields_city: checkoutInfo.profileShippingStepData.preferredAddress.city,
        dwfrm_shipping_shippingAddress_addressFields_street: checkoutInfo.profileShippingStepData.preferredAddress.street,
        dwfrm_shipping_shippingAddress_addressFields_suite: checkoutInfo.profileShippingStepData.preferredAddress.suite,
        dwfrm_shipping_shippingAddress_addressFields_address1: checkoutInfo.profileShippingStepData.preferredAddress.address1,
        dwfrm_shipping_shippingAddress_addressFields_address2: checkoutInfo.profileShippingStepData.preferredAddress.address2,
        dwfrm_shipping_shippingAddress_addressFields_phone: checkoutInfo.profileShippingStepData.preferredAddress.phone,
        dwfrm_shipping_shippingAddress_addressFields_countryCode: checkoutInfo.profileShippingStepData.preferredAddress.countryCode.value,
        dwfrm_shipping_shippingAddress_shippingAddressUseAsBillingAddress: true,
        dwfrm_billing_billingAddress_addressFields_title: checkoutInfo.profileShippingStepData.preferredBillingAddress.title,
        dwfrm_billing_billingAddress_addressFields_firstName: checkoutInfo.profileShippingStepData.preferredBillingAddress.firstName,
        dwfrm_billing_billingAddress_addressFields_lastName: checkoutInfo.profileShippingStepData.preferredBillingAddress.lastName,
        dwfrm_billing_billingAddress_addressFields_postalCode: checkoutInfo.profileShippingStepData.preferredBillingAddress.postalCode,
        dwfrm_billing_billingAddress_addressFields_city: checkoutInfo.profileShippingStepData.preferredBillingAddress.city,
        dwfrm_billing_billingAddress_addressFields_street: checkoutInfo.profileShippingStepData.preferredBillingAddress.street,
        dwfrm_billing_billingAddress_addressFields_suite: checkoutInfo.profileShippingStepData.preferredBillingAddress.suite,
        dwfrm_billing_billingAddress_addressFields_address1: checkoutInfo.profileShippingStepData.preferredBillingAddress.address1,
        dwfrm_billing_billingAddress_addressFields_address2: checkoutInfo.profileShippingStepData.preferredBillingAddress.address2,
        dwfrm_billing_billingAddress_addressFields_countryCode: checkoutInfo.profileShippingStepData.preferredBillingAddress.countryCode.value,
        dwfrm_billing_billingAddress_addressFields_phone: checkoutInfo.profileShippingStepData.preferredAddress.phone,
        dwfrm_contact_email: checkoutInfo.profileShippingStepData.email,
        dwfrm_contact_phone: checkoutInfo.profileShippingStepData.preferredAddress.phone,
        csrf_token: document.querySelector('div[data-csrf-name="csrf_token"]').getAttribute('data-csrf-token')
    }
    const shippingResponse = await submitShipping(encode(shippingBody)).then(res => res.json())
    logger.update.success('Shipping submitted')

    logger.wait('Placing order...')
    const orderResponse = await placeOrder().then(res => res.json())
    if (!orderResponse.error) {
        logger.update.success('Order placed')
        const paymentLink = orderResponse.continueUrl

        const hook = new Checkout()
        const analytic = new Analytic()
        hook.user = 'Leonard#4604'
        hook.product = analytic.product = shippingResponse.order.items.items[0].gtm.name
        hook.site = analytic.site = 'Snipes IT'
        hook.size = analytic.size = shippingResponse.order.items.items[0].gtm.variant
        hook.product_url = `[IT](${shippingResponse.order.items.items[0].urls.pdp})`
        hook.product_image = analytic.image = shippingResponse.order.items.items[0].images[0].pdp.srcTRetina
        hook.pid = shippingResponse.order.items.items[0].id
        hook.date = getDate()
        hook.mode = 'Normal'
        hook.key = key
        hook.version = version
        hook.paymentType = 'PayPal'
        hook.paypalLink = paymentLink
        hook.url = discord 
        analytic.price = shippingResponse.order.items.items[0].gtm.price
        hook.private()
        hook.public()

        orders = JSON.parse(orders)
        orders.push(analytic)
        chrome.storage.sync.set({
            'orders': JSON.stringify(orders)
        });

        window.open(paymentLink,'_blank');
    }
}

async function executeScript() {
    const [key, volt, status, , , , orders, discord, version] = await extractStorage()
    if (volt && status === true) {
        logger.display()
        await process(key, orders, discord, version)
    }
}

executeScript()