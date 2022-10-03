async function process(solebox, volt) {
    await sleep(solebox.stepsDelay)
    logger.wait('Generating CSRF token...')
    const csrfToken = await generateCSRFToken()
        .then(res => res.json())
        .then(object => {
            return object.csrf.token
        })
        .catch(error => {

        })
    logger.update.success('Token generated')

    logger.wait('Validating address...')
    const checkoutInfo = JSON.parse(document.querySelector('#checkout-mgr').dataset.profileCheckoutInfo)
    const ratesBody = {
        id: checkoutInfo.profileShippingStepData.preferredAddress.ID,
        selected: true,
        addressType: 'home-delivery',
        snipesStore: '',
        hermesName: '',
        hermesId: '',
        postOfficeNumber: '',
        packstationNumber: '',
        postNumber: '',
        postalCode: checkoutInfo.profileShippingStepData.preferredAddress.postalCode,
        countryCode: checkoutInfo.profileShippingStepData.preferredAddress.countryCode.value,
        carrierName: '',
        suite: checkoutInfo.profileShippingStepData.preferredAddress.suite,
        street: checkoutInfo.profileShippingStepData.preferredAddress.street,
        city: checkoutInfo.profileShippingStepData.preferredAddress.city,
        address2: '',
        lastName: checkoutInfo.profileShippingStepData.preferredAddress.lastName,
        firstName: checkoutInfo.profileShippingStepData.preferredAddress.firstName,
        title: checkoutInfo.profileShippingStepData.preferredAddress.title,
        language: 'en',
        csrf_token: csrfToken
    }
    const ratesResponse = await shippingRates(encode(ratesBody)).then(res => res.json())
    console.log(ratesResponse)
    if (ratesResponse.success) {
        logger.update.success('Submitted shipping rates')

        logger.wait('Submitting shipping...')
        const id = document.querySelector('#shipping > div.js-checkout-step-content.b-checkout-step-content.h-hide > div > div > div > div.b-shipping-content > span').dataset.id
        const value = document.querySelector('#shipping > div.js-checkout-step-content.b-checkout-step-content.h-hide > div > div > div > div.b-shipping-content > span').dataset.value
        
        let shippingBody = {}

        shippingBody[id] = value
        shippingBody['originalShipmentUUID'] = document.querySelector('input[name="originalShipmentUUID"]').value
        shippingBody['shipmentUUID'] = document.querySelector('input[name="shipmentUUID"]').value
        shippingBody['dwfrm_shipping_shippingAddress_shippingMethodID'] = 'home-delivery_europe'
        shippingBody['address-selector'] = document.querySelector('input[name="address-selector"]').value
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_title'] = checkoutInfo.profileShippingStepData.preferredAddress.title
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_firstName'] = checkoutInfo.profileShippingStepData.preferredAddress.firstName
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_lastName'] = checkoutInfo.profileShippingStepData.preferredAddress.lastName
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_postalCode'] = checkoutInfo.profileShippingStepData.preferredAddress.postalCode
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_city'] = checkoutInfo.profileShippingStepData.preferredAddress.city
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_street'] = checkoutInfo.profileShippingStepData.preferredAddress.street
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_suite'] = checkoutInfo.profileShippingStepData.preferredAddress.suite
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_address1'] = checkoutInfo.profileShippingStepData.preferredAddress.address1
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_address2'] = checkoutInfo.profileShippingStepData.preferredAddress.address2
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_phone'] = ''
        shippingBody['dwfrm_shipping_shippingAddress_addressFields_countryCode'] = checkoutInfo.profileShippingStepData.preferredAddress.countryCode.value
        shippingBody['serviceShippingMethod'] = 'ups-standard'
        shippingBody['dwfrm_shipping_shippingAddress_shippingAddressUseAsBillingAddress'] = true
        shippingBody['dwfrm_billing_billingAddress_addressFields_title'] = checkoutInfo.profileShippingStepData.preferredAddress.title
        shippingBody['dwfrm_billing_billingAddress_addressFields_firstName'] = checkoutInfo.profileShippingStepData.preferredAddress.firstName
        shippingBody['dwfrm_billing_billingAddress_addressFields_lastName'] = checkoutInfo.profileShippingStepData.preferredAddress.lastName
        shippingBody['dwfrm_billing_billingAddress_addressFields_postalCode'] = checkoutInfo.profileShippingStepData.preferredAddress.postalCode
        shippingBody['dwfrm_billing_billingAddress_addressFields_city'] = checkoutInfo.profileShippingStepData.preferredAddress.city
        shippingBody['dwfrm_billing_billingAddress_addressFields_street'] = checkoutInfo.profileShippingStepData.preferredAddress.street
        shippingBody['dwfrm_billing_billingAddress_addressFields_suite'] = checkoutInfo.profileShippingStepData.preferredAddress.suite
        shippingBody['dwfrm_billing_billingAddress_addressFields_address1'] = checkoutInfo.profileShippingStepData.preferredAddress.address1
        shippingBody['dwfrm_billing_billingAddress_addressFields_address2'] = checkoutInfo.profileShippingStepData.preferredAddress.address2
        shippingBody['dwfrm_billing_billingAddress_addressFields_countryCode'] = checkoutInfo.profileShippingStepData.preferredAddress.countryCode.value
        shippingBody['dwfrm_billing_billingAddress_addressFields_phone'] = ''
        shippingBody['dwfrm_contact_email'] = checkoutInfo.profileShippingStepData.email
        shippingBody['dwfrm_contact_phone'] = ''
        shippingBody['csrf_token'] = document.querySelector('div[data-csrf-name="csrf_token"]').getAttribute('data-csrf-token')

        const shippingResponse = await submitShipping(checkoutInfo.profileShippingStepData.preferredAddress.ID, encode(shippingBody)).then(res => res.json())
        console.log(shippingResponse)
        logger.update.success('Shipping submitted')

        logger.wait('Submitting payment...')
        const paymentBody = {
            dwfrm_billing_paymentMethod: 'Paypal',
            csrf_token: document.querySelector('div[data-csrf-name="csrf_token"]').getAttribute('data-csrf-token')
        }

        const paymentResponse = await submitPayment(encode(paymentBody)).then(res => res.json())
        if (!paymentResponse.error) {
            logger.update.success('Payment submitted')

            logger.wait('Placing order...')
            const orderResponse = await placeOrder().then(res => res.json())
            console.log(orderResponse)
            if (orderResponse.error) {
                logger.update.error(paymentLink.errorMessage)

                return false
            }
            if (orderResponse.action === "PX-ABR") {
                logger.update.error(`PX-ABR shown, reload the page and solve captcha!`)

                return false
            }
            if (!orderResponse.error) {
                logger.update.success('Order placed')
                const paymentLink = orderResponse.continueUrl

                const hook = new Checkout()
                const analytic = new Analytic()
                hook.store = analytic.store = 'Solebox'
                hook.product = analytic.product = shippingResponse.order.items.items[0].gtm.name
                hook.size = analytic.size = shippingResponse.order.items.items[0].gtm.variant
                hook.product_url = `[IT](${shippingResponse.order.items.items[0].urls.pdp})`
                hook.product_image = analytic.image = shippingResponse.order.items.items[0].images[0].pdp.srcTRetina
                hook.pid = shippingResponse.order.items.items[0].id
                hook.date = getDate()
                hook.mode = 'Normal'
                hook.key = volt.key
                hook.version = volt.version
                hook.paymentLink = paymentLink
                hook.url = JSON.parse(volt.discord).url
                analytic.price = shippingResponse.order.items.items[0].gtm.price
                hook.private()
                hook.public()

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
                return true
            }
        }
    }
}

async function executeScript() {
    const [solebox, volt] = await extractStorage()
    if (volt.active && solebox.status === true) {
        logger.display()
        checkDevtools(volt.key, volt.version)
        await process(solebox, volt)
    }
}

executeScript()