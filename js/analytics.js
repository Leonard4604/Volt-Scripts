document.addEventListener('DOMContentLoaded', async () => {
    chrome.storage.sync.get(null, function (store) { 
        let orders = [            
            // {
            //     id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
            //     image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
            //     product: 'Dunk High aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
            //     site: 'Zalando IT',
            //     size: 42,
            //     price: '109.99€',
            //     date: '09/06/2022'
            // },
            // {
            //     id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
            //     image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
            //     product: 'Dunk High', 
            //     site: 'Zalando IT',
            //     size: 42.5,
            //     price: '109.99€',
            //     date: '10/06/2022'
            // },
            // {
            //     id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
            //     image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
            //     product: 'Dunk High', 
            //     site: 'Zalando IT',
            //     size: 42,
            //     price: '109.99€',
            //     date: '11/06/2022'
            // },
            // {
            //     id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
            //     image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
            //     product: 'Dunk High', 
            //     site: 'Zalando IT',
            //     size: 42,
            //     price: '109.99€',
            //     date: '11/06/2022'
            // },
            // {
            //     id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
            //     image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
            //     product: 'Dunk High', 
            //     site: 'Zalando IT',
            //     size: 42,
            //     price: '109.99€',
            //     date: '11/06/2022'
            // }
        ]   

        if (store.orders) {
            orders = JSON.parse(store.orders)
        }
        if (orders) {
            orders.forEach(res => {
                const html = `
                <div class="card" id="${res.id}">
                    <div id="image"><img src="${res.image}" alt=""></div>
                    <div id="info">
                        <div id="store">${res.store}</div>
                        <div id="product">${res.product}</div>
                    </div>
                    <div id="size">${res.size}</div>
                    <div id="price">${res.price} €</div>
                    <div id="delete" class="delete"><i class='bx bx-trash' id="delete"></i></div>
                </div>
                `
                document.querySelector('.analytics .orders').insertAdjacentHTML('beforeend', html)
            });
            const totalCheckouts = getTotal.checkouts(orders)
            const totalSpent = getTotal.spent(orders)
    
            document.querySelector('.analytics #checkouts h3').textContent = totalCheckouts
            document.querySelector('.analytics #spent h3').textContent = `${totalSpent} €`
        }
        if (orders.length === 0) {
            const html = `
                <h3>No checkout found.</h3>
            `
            document.querySelector('.analytics .orders').insertAdjacentHTML('beforeend', html)
        }
    })

    // Gestione del bottone per eliminare gli ordini
    if (document.body.addEventListener){
        document.body.addEventListener('click', deleteOrder, false);
    }
    else{
        document.body.attachEvent('onclick', deleteOrder);//for IE
    }

    
    const getTotal = {
        spent: function(object) {
            let total = 0;
            for (item of object) {
                if (typeof item.price === 'string') {
                    total += +item.price.replace(/\$|\€|\£/g, '')
                }
                else {
                    total += +item.price
                }
            }
            return (Math.floor(total * 100) / 100);
        },
        checkouts: function(object) {
            return object.length;
        }
    }
})

async function deleteOrder(e){
    e = e || window.event;
    const buttonClass = e.path[1].className;
    const cardId = e.path[2].id;

    if (buttonClass === 'delete')
    {
        const cards = document.querySelectorAll('.analytics .orders .card')
        let checkouts = await extractStorage()
        cards.forEach((object) => {
            if(+object.id === +cardId) {
                checkouts.forEach((item, index) => {
                    if (+object.id === item.id) {
                        checkouts.splice(index, 1);
                        chrome.storage.sync.set({
                            'orders': JSON.stringify(checkouts)
                        });
                    }
                })
                object.remove()
                window.location.reload();
            }
        })
    }
}

async function extractStorage() {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(null, function(store) {
            resolve(JSON.parse(store.orders || []))
        })
    })
}