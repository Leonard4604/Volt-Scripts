document.addEventListener('DOMContentLoaded', async () => {
    let webhookURL = document.querySelector("#url")
    chrome.storage.sync.get(null, function (store) {
        let discord = ''
        if (store.discord) {
            discord = JSON.parse(store.discord)
        }
        if (discord) {
            webhookURL.value = discord.url
        }
    })

    const saveBtn = document.querySelector('.settings #save');
    const testBtn = document.querySelector('.settings #test');
    saveBtn.addEventListener('click', async () => {
        const discordWebhook = {
            url: webhookURL.value.replace(' ', '')
        }
        chrome.storage.sync.set({
            'discord': JSON.stringify(discordWebhook, null, 3)
        });
    })

    testBtn.addEventListener('click', async () => {
        await webhook.object(webhookURL.value.replace(' ', ''))
    })
})

function hexToDecimal(hex) {
    return parseInt(hex.replace("#",""), 16)
}

function getDate() {
    return new Date().toISOString()
}

const webhook = {
    send: function (url, embed) {
        return fetch(url, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "content": '',
                "embeds": [embed]
            })
        })
    },
    object: function (url) {
        const date = getDate()
        const version = document.querySelector('.version').textContent
        const embed = {
            color: hexToDecimal("#c9cc74"),
            "thumbnail": {
                "url": 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
            },
            author: {
                name: 'Volt Scripts',
                icon_url: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
            },
              title: 'Webhook set successfully',
              timestamp: date,
              fields: [
                {
                  name: 'Version',
                  value: version
                }
            ],
            footer: {
                text: `Volt Scripts - ${version}`,
                icon_url: 'https://i.postimg.cc/vB3MDK2s/t-pfp.png'
            }
        }
        return this.send(url, embed)
    }
}