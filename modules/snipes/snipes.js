async function process(snipes) {
    logger.wait('Adding to cart...')
    const product = await getProductInfo(snipes.size, snipes.min, snipes.max)
    if (product) {
        const body = {
            pid: product.pid,
            options: [
                {
                    "optionId":"size",
                    "selectedValueId":product.size.toString()
                }
            ],
            quantity: 1
        }
        const result = await addToCart(encode(body), window.location.href)
            .then(res => 
                res.json()
            )
        if (!result.error) {
            logger.update.success(`Product added to cart in size: ${result.gtm.variant}`)
        }
        window.open('https://www.snipes.it/checkout?stage=placeOrder#placeOrder','_blank');
        return true
    }
    if (!product) {
        logger.update.error('Product not available')
        return false
    }
}


async function executeScript() {
    const [snipes, volt] = await extractStorage()
    if (volt.active && snipes.status === true) {
        logger.display()
        await process(snipes)
    }
}

executeScript()