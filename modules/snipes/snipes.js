async function process(key, size, min, max) {
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
            logger.update.success('Product added to cart')
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
    const [key, volt, status, size, min, max] = await extractStorage()
    if (volt && status === true) {
        logger.display()
        await process(key, size, min, max)
    }
}

executeScript()