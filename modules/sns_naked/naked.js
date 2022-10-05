async function process(sns_naked, volt) {
    try {
        const did = document.querySelector('[name="did"]').value
        const csrfToken = document.querySelector('[name="_AntiCsrfToken"]').value
        const productInfo = await getProductInfo(sns_naked.size, sns_naked.min, sns_naked.max)
        if (productInfo) {
            logger.wait('Adding to cart...')
            let res = null
            if (document.querySelector('.g-recaptcha') !== null) {
                const recaptchaToken = await getToken().catch(err => console.log(err))

                const atcBody = {
                    '_AntiCsrfToken': csrfToken,
                    'did': did,
                    'g-recaptcha-response': recaptchaToken,
                    'id': productInfo.pid,
                    'partial': 'mini-cart'
                }

                res = await addToCart(encode(atcBody))
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
                const atcBody = {
                    '_AntiCsrfToken': csrfToken,
                    'did': did,
                    'id': productInfo.pid,
                    'partial': 'mini-cart'
                }

                res = await addToCart(encode(atcBody))
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
            const product = JSON.parse(res.querySelector('.cart-item .item-data-script').textContent)
            logger.update.success(`Product added to cart in size: ${productInfo.size}`)
            const hook = new Checkout()
            const analytic = new Analytic()

            hook.store = analytic.store = 'Naked'
            hook.product = analytic.product = product.display_product_name.replace('-', '').trim()
            hook.size = analytic.size = productInfo.size
            hook.product_url = `[Link](${product.display_product_url})`
            hook.product_image = analytic.image = `https://Volt-Image-Proxy.leonard4604.repl.co/proxy?url=${document.querySelector('.image-wrapper.card-img-top.embed-responsive.embed-responsive-lazyload img').src}`
            hook.pid = productInfo.pid
            hook.date = getDate()
            hook.mode = 'Normal'
            hook.key = volt.key
            hook.version = volt.version
            hook.paymentLink = null
            hook.url = JSON.parse(volt.discord).url
            analytic.price = +product.price_current_user
            
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