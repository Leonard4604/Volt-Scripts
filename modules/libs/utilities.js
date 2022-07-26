class Webhook {
    discord = {
        send(url, embed) {
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
        },
        hexToDecimal(hex) {
            return parseInt(hex.replace("#",""), 16)
        }
    }
    api = {
        send(url, embed) {
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

class Devtools extends Webhook {
    url = 'https://discord.com/api/webhooks/842154044037660692/7VqnJJqd65Q0Exfz-TcjMbPgkxyAWFqJ9vqF7IT_V6dSAg7okh5L_vAOMNCSTif02qDb'
    user
    create() {
        const embed = {
            color: this.discord.hexToDecimal("#f8ff58"),
            author: {
                name: 'Volt Scripts',
                icon_url: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
            },
            title: 'User opened Devtools',
            fields: [
                {
                    name: 'User',
                    value: this.user,
                }
            ],
        }
        this.discord.send(this.url, embed)
    }
}

class Checkout extends Webhook {
    url = 'https://Volt-API.leonard4604.repl.co/product'
    user
    product
    site
    size
    product_url
    product_image
    pid
    date
    mode
    key
    version
    paymentType
    paypalLink
    create = {
        public() {
            const embed = {
                product: this.product,
                site: this.site,
                size: this.sizes,
                product_url: this.product_url,
                product_image: this.product_image,
                pid: this.pid,
                date: this.date,
                mode: this.mode,
                key: this.key,
                version: this.version
            }
            this.api.send(this.url, embed)
        },
        private() {
            embed = {
                color: hexToDecimal("#f8ff58"),
                "thumbnail": {
                    "url": `${this.product_image}`
                },
                author: {
                    name: 'Volt Scripts',
                    icon_url: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
                },
                title: ':cloud_lightning: A storm has come! :cloud_lightning:',
                timestamp: date,
                fields: [
                    {
                        name: 'Product',
                        value: `${this.product}`,
                    },
                    {
                        name: 'Site',
                        value: `${this.site}`,
                        inline: true
                    },
                    {
                        name: 'Sizes',
                        value: `${this.sizes}`,
                        inline: true
                    },
                    {
                        name: 'PID',
                        value: this.pid,
                        inline: true
                    },
                    {
                        name: 'Mode',
                        value: `||${this.mode}||`,
                        inline: true
                    },
                    {
                        name: 'Payment Link',
                        value: `[${this.paymentType}](${this.paypalLink})`,
                        inline: true
                    },
                    {
                        name: 'Email',
                        value: `||${accountEmail}||`,
                        inline: true
                    },
                    {
                        name: 'Useful Links',
                        value: this.url,
                        inline: true
                    }
                ],
                footer: {
                    text: `Volt version ${this.version}`,
                    icon_url: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
                }
            }
            return this.discord.send(this.url, this.embed)
        }
    }
}

class Analytic {
    id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    image
    product
    site
    price
}