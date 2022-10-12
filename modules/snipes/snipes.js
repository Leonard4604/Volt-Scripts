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
        const result = await checkATC(encode(body), snipes.delay)
        if (!result) {
            logger.update.error('Too much requests')
            
            return false
        }
        if (result) {
            if (!result.error) {
                logger.update.success(`Product added to cart in size: ${result.gtm.variant}`)
            }
            else if (result.error) {
                logger.update.error(result.message)
                
                return false
            }
            window.open('https://www.snipes.it/checkout?stage=placeOrder#placeOrder','_blank');
            return true
        }
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
        checkDevtools(volt.key, volt.version)
        await process(snipes)
    }
}

executeScript()