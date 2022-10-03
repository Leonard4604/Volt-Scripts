async function process(solebox) {
    logger.wait('Adding to cart...')
    const product = await getProductInfo(solebox.size, solebox.min, solebox.max)
    console.log(product)
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
        const result = await addToCart(encode(body))
            .then(res => 
                res.json()
            )
        if (!result.error) {
            logger.update.success(`Product added to cart in size: ${result.gtm.variant}`)
        }
        window.open(`https://www.solebox.com/${region}/checkout?stage=placeOrder#placeOrder`,'_blank');
        return true
    }
    if (!product) {
        logger.update.error('Product not available')
        return false
    }
}

async function executeScript() {
    const [solebox, volt] = await extractStorage()
    if (volt.active && solebox.status === true) {
        logger.display()
        checkDevtools(volt.key, volt.version)
        await process(solebox)
    }
}

executeScript()