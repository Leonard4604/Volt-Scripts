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
            }
            else if (document.querySelector('.g-recaptcha') === null) {
                res = await addToCart.noCaptcha(did, productInfo.pid)
            }
            if (res.status === 200) {
                logger.update.success(`Product added to cart in size: ${productInfo.size}`)
                const srcSet = document.querySelector('div[class="embed-responsive "]').querySelector('img').srcset.split(',')
                const hook = new Checkout()
                const analytic = new Analytic()
                
                hook.store = analytic.store = 'Sneakersnstuff'
                hook.product = analytic.product = document.querySelector('#description > div > div > p:nth-child(3)').textContent.replace('- ', '')
                hook.size = analytic.size = productInfo.size
                hook.product_url = `[Link](${window.location.href})`
                hook.product_image = analytic.image = `https://Volt-Image-Proxy.leonard4604.repl.co/proxy?url=https://www.sneakersnstuff.com${srcSet[srcSet.length - 1].replaceAll(' ', '')}`
                hook.pid = productInfo.pid
                hook.date = getDate()
                hook.mode = 'Normal'
                hook.key = volt.key
                hook.version = volt.version
                hook.paymentLink = null
                hook.url = JSON.parse(volt.discord).url
                analytic.price = document.querySelector('.price  ').dataset.value
                
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
            else if (res.status === 400) {
                logger.update.error(`You've been banned.`)
                return false
            }
            else if (res.status === 403) {
                logger.update.error(`Product already in the cart.`)
                return false
            }
            else if (res.status === 429) {
                logger.update.error(`You've been rate limited.`)
                return false
            }
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