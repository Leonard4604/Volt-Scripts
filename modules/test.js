const webhook = {
    url: 'https://discord.com/api/webhooks/967882945547370558/bDqgwt5DWgg25H4cgu_JB57O1P0AOdLjV2FUtLhuti41j00gUgcfKgwl7w6RKrdLJvip',
    send: (myEmbed) => {
        return fetch(webhook.url, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "content": '',
                "embeds": [myEmbed]
            })
        })
    },
    embed: (user) => {
        myEmbed = {
            color: hexToDecimal("#f8ff58"),
            author: {
                name: 'Volt Scripts',
                icon_url: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
            },
            title: 'User opened Devtools',
            fields: [
                {
                    name: 'User',
                    value: user,
                }
            ],
        }
        webhook.send(myEmbed)
    }

}

function hexToDecimal(hex) {
    return parseInt(hex.replace("#",""), 16)
}

console.log(Object.defineProperties(new Error, {
    message: {get() {
        webhook.embed('Leonard#4604')
    }},
    toString: {value() {

    }}
}));