document.addEventListener('DOMContentLoaded', async () => {
    makeSpendingChart()

    // Supposing you already have queried the API and have your data
    let data = [
        {
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
            image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
            product: 'Dunk High', 
            site: 'Zalando IT',
            price: '109.99€'
        },
        {
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
            image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
            product: 'Dunk High', 
            site: 'Zalando IT',
            price: '109.99€'
        },
        {
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
            image: 'https://images-ext-2.discordapp.net/external/WsD32nS1ccJVDE7WU3cnaZEQSZJNkE-Wmk7nESF3PYs/%3Fimwidth%3D303%26filter%3Dpackshot/https/img01.ztat.net/article/spp-media-p1/bb061281ef424fb8a0d684792b15c6d2/7f5cce17eb834a28aabfdf13d726a16c.jpg', 
            product: 'Dunk High', 
            site: 'Zalando IT',
            price: '109.99€'
        }

    ]

    data.forEach(res => {
        console.log()
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
})

function makeSpendingChart() {
    const dates = [
        '09/05/2022', 
        '10/05/2022', 
        '11/05/2022', 
        '12/05/2022'
    ]
    const totals = [
        100, 
        200, 
        300, 
        100
    ]
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