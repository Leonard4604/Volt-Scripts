async function checkout(listResponse) {
    logger.wait('Retrieving shipping information...')
    const address = await getAddress().then(res => res.json());
    console.log(address);
    logger.update.success(`Shipping information has been retrieved`)
    logger.wait('Placing order...')
    logger.update.success(`Product checked out`)
}

async function process(key, size, min, max) {
    logger.wait('Adding to cart...')
    const product = await getProductInfo(size, min, max)
    console.log(product)
    if (product) {
        const body = {
            SeasonId: product.seasonId,
            CollectionId: product.collectionId,
            ItemId: product.itemId,
            VendorColorId: product.vendorColorId,
            SizeTypeId: product.sizeTypeId,
            SizeId: product.sizeId,
            Quantity: 12,
            IsMobile: false
        }
        const result = await addToCart(JSON.stringify(body), window.location.href)
            .then(res => 
                res.json()
            )
        console.log(result)
        if (result.ListResponse) {
            logger.update.success(`Product added to cart`)
            await checkout(result.ListResponse)
            return true
        }
        else if (!result.ListResponse) {
            logger.update.error(`Error: ${result.ErrorDescription}`)
            return false
        }
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