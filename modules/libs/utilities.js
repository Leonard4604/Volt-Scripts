class Webhook {
    hexToDecimal(hex) {
        return parseInt(hex.replace("#",""), 16)
    }
    discord = {
        send: function(url, embed) {
            if (!url) return
            return fetch(url, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    "content": '',
                    "embeds": [
                        embed
                    ]
                })
            })
        }
    }
    api = {
        send: function(url, embed) {
            return fetch(url, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(embed)
            })
        }
    }
}

class Devtools extends Webhook{
    url = 'https://discord.com/api/webhooks/842154044037660692/7VqnJJqd65Q0Exfz-TcjMbPgkxyAWFqJ9vqF7IT_V6dSAg7okh5L_vAOMNCSTif02qDb'
    key
    version
    create() {
        const embed = {
            key: this.key,
            version: this.version
        }
        const url= 'https://voltscripts.tk/api/discord/devtools' 
        this.api.send(url, embed)
    }
}

class Checkout extends Webhook{
    url
    store
    product
    size
    product_url
    product_image
    pid
    date
    mode
    key
    version
    paymentLink
    async public() {
        const embed = {
            product: this.product,
            store: this.store,
            size: this.size,
            product_url: this.product_url,
            product_image: this.product_image,
            pid: this.pid,
            date: this.date,
            mode: this.mode,
            key: this.key,
            version: this.version
        }
        const url = 'https://voltscripts.tk/api/discord/product' 
        this.api.send(url, embed)
        return true
    }
    async private() {
        const embed = {
            color: this.hexToDecimal("#f8ff58"),
            "thumbnail": {
                "url": `${this.product_image}`
            },
            title: 'A storm has come! Click here to pay! :cloud_lightning:',
            url: this.paymentLink,
            timestamp: this.date,
            fields: [
                {
                    name: 'Store',
                    value: `||${this.store}||`,
                    
                },
                {
                    name: 'Product',
                    value: `${this.product}`,
                    inline: true
                },
                {
                    name: 'Size',
                    value: `${this.size}`,
                    inline: true
                },
                {
                    name: 'PID',
                    value: `||${this.pid}||`,
                    inline: true
                },
                {
                    name: 'Mode',
                    value: `||${this.mode}||`,
                    inline: true
                },
                {
                    name: 'Useful Links',
                    value: this.product_url,
                    inline: true
                }
            ],
            footer: {
                text: `Volt Scripts - v. ${this.version}`,
                icon_url: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
            }
        }
        this.discord.send(this.url, embed)
        return true
    }
}

class Analytic {
    id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    image
    product
    store
    size
    price
}

function getDate() {
    return new Date().toISOString()
}

function encode(obj) {
    return Object.keys(obj).reduce(function(p, c) {
        if (typeof obj[c] === 'object' && obj[c] !== null) {
            obj[c] = JSON.stringify(obj[c])
        }
        return p.concat([encodeURIComponent(c) + "=" + encodeURIComponent(obj[c]).replace(/%20/g, "+")]);
    }, []).join('&');
}

function fractionToDecimal(f) {
    return f.split('/').reduce((n, d, i) => n / (i ? d : 1));
}

function convert(size) {
    if (size.includes(' ')) {
        const [int, frac] = size.split(' ')
        const dec = frac.split('/').reduce((n, d, i) => n / (i ? d : 1));
        return (+int + dec)
    }
    else if (size.includes('\r') || size.includes('\n')) {
        return +size.replaceAll('\r', '').replaceAll('\n', '').replaceAll(',', '.')
    }
    else {
        return +size
    }
}

function checkDevtools(key, version) {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            const devtools = new Devtools()
            devtools.key = key
            devtools.version = version
            console.log(Object.defineProperties(new Error, {
                message: {get() {
                    devtools.create();
                }},
                toString: {value() {
            
                }}
            }));
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function parseHTML(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}