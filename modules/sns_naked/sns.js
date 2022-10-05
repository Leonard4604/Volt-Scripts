async function process(sns_naked, volt) {
    try {
        const did = document.querySelector('[name="did"]').value
        const productInfo = await getProductInfo(sns_naked.size, sns_naked.min, sns_naked.max)
        if (productInfo) {
            logger.wait('Adding to cart...')
            let res = null
            if (document.querySelector('.g-recaptcha') !== null) {
                const token = await getToken().catch(err => console.log(err))
                res = await addToCart.captcha(did, token, productInfo.pid)
                .then(res => res.text())
                .then(text => {
                    try {
                        return JSON.parse(text)
                    }
                    catch {
                        return parseHTML(text)
                    }
                })
            }
            else if (document.querySelector('.g-recaptcha') === null) {
                res = await addToCart.noCaptcha(did, productInfo.pid)
                .then(res => res.text())
                .then(text => {
                    try {
                        return JSON.parse(text)
                    }
                    catch {
                        return parseHTML(text)
                    }
                })
            }
            if (res.Response === null) {
                logger.update.error(`${res.StatusCode}: ${res.Status}`)

                return false
            }
            if (res.querySelector('.container')) {
                logger.update.error(res.querySelector('.container h1').textContent)

                return false
            }
            const product = JSON.parse(res.querySelector('.cart-items .cart-item').dataset.tracking)
            logger.update.success(`Product added to cart in size: ${productInfo.size}`)
            const hook = new Checkout()
            const analytic = new Analytic()
            
            hook.store = analytic.store = 'Sneakersnstuff'
            hook.product = analytic.product = `${product.brand} - ${product.name}`
            hook.size = analytic.size = productInfo.size
            hook.product_url = `[Link](${product.url})`
            hook.product_image = analytic.image = `https://Volt-Image-Proxy.leonard4604.repl.co/proxy?url=${product.imageUrl}`
            hook.pid = product.id
            hook.date = getDate()
            hook.mode = 'Normal'
            hook.key = volt.key
            hook.version = volt.version
            hook.paymentLink = null
            hook.url = JSON.parse(volt.discord).url
            analytic.price = product.priceOriginalCurrency
            
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

            return true
        }
    }
    catch (err) {
        logger.update.error(err)
    }
}

async function executeScript() {
    const [sns_naked, volt] = await extractStorage()
    if (volt.active && sns_naked.status === true) {
        logger.display()
        checkDevtools(volt.key, volt.version)
        await process(sns_naked, volt)
    }
}

executeScript()