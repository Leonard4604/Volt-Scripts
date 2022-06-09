document.addEventListener('DOMContentLoaded', async () => {
    chrome.storage.sync.get(null, function (store) { 
        let orders = [
            {
                id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
                product: 'Dunk High', 
                site: 'Zalando IT',
                price: +'109.99€'.replace('€', ''),
                date: '09/06/2022'
            },
            {
                id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
                product: 'Dunk High', 
                site: 'Zalando IT',
                price: +'109.99€'.replace('€', ''),
                date: '10/06/2022'
            },
            {
                id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
                product: 'Dunk High', 
                site: 'Zalando IT',
                price: +'109.99€'.replace('€', ''),
                date: '11/06/2022'
            },
        ]

        if (store.orders) {
            orders = JSON.parse(store.orders)
        }
        if (orders) {
            orders.forEach(res => {
                const html = `
                <div class="card" id="${res.id}">
                    <div id="image"><img src="${res.image}" alt=""></div>
                    <div id="product">${res.product}</div>
                    <div id="site">${res.site}</div>
                    <div id="price">${res.price}</div>
                    <div id="delete"><i class='bx bx-trash' id="delete"></i></div>
                </div>
                `
                document.querySelector('.analytics .orders').insertAdjacentHTML('beforeend', html)
            });

            makeSpendingChart(orders)
        }
    })

    // Gestione del bottone per eliminare gli ordini
    if (document.body.addEventListener){
        document.body.addEventListener('click', deleteOrder, false);
    }
    else{
        document.body.attachEvent('onclick', deleteOrder);//for IE
    }
})

function makeSpendingChart(orders) {
    let dates = []
    for (item of orders) {
        dates.push(item.date)
    }
    let totals = []
    for (item of orders) {
        totals.push(item.price)
    }
    console.log(totals)
    const ctx = document.getElementById('chart');
    const data = {
        labels: dates,
        datasets: [{
            label: 'Spent',
            lineTension: 0.3,
            data: totals,
            fill: true,
            borderColor: '#000957',
            backgroundColor: 'rgba(0, 9, 87, 0.8)',
            borderWidth: 2,
        }]
      };
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {

                },
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    grace: '10%'
                }
            }
        }
    });
}

function deleteOrder(e){
    e = e || window.event;
    const buttonClass = e.path[3].className;
    const cardId = e.path[2].id;

    if (buttonClass === 'orders')
    {
        const cards = document.querySelectorAll('.analytics .orders .card')

        cards.forEach((object) => {
            if(object.id === cardId) {
                object.remove()
            }
        })
    }
}