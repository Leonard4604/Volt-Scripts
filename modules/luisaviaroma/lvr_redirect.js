async function redirect() {
    const product = await extractInfo()

    window.location.href = `https://www.luisaviaroma.com/${product.ItemCode}`
}

async function process() {
    const [lvr, volt] = await extractStorage()
    if (volt.active && lvr.status === true) {
        redirect()
    }
}

process()