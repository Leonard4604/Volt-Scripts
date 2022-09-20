async function process(size, min, max) {
    logger.wait('Adding to cart...')
    const product = await getProductInfo(size, min, max)
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
    const [, volt, status, size, min, max] = await extractStorage()
    if (volt && status === true) {
        logger.display()
        await process(size, min, max)
    }
}

executeScript()