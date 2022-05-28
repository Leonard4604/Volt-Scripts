document.addEventListener('DOMContentLoaded', async () => {
    chrome.storage.sync.get(null, function (store) {
        const profiles = JSON.parse(store.profiles)
        const select_elem = document.querySelector('#profile_selection > select')
        profiles.forEach((object) =>    // create dropdown items
        {
            select_elem.add(new Option(object.label))
        })
    })

    const addProfile = document.querySelector('.add_profile > .button > button > #button')
    const profilesList = document.querySelector('#profile_selection > select')
    const saveBtn = document.querySelector('#save');
    
    addProfile.addEventListener('click', async function() {
        document.querySelector('#label').value = ''
        document.querySelector('#first_name').value = ''
        document.querySelector('#last_name').value = ''
        document.querySelector('#email').value = ''
        document.querySelector('#phone').value = ''
        document.querySelector('#field').value = ''
        document.querySelector('#zip').value = ''
        document.querySelector('#city').value = ''
        document.querySelector('#name').value = ''
        document.querySelector('#number').value = ''
        document.querySelector('#expiry').value = ''
        document.querySelector('#cvv').value = ''

        saveBtn.addEventListener('click', async () => {
            const profiles = JSON.parse(await extract.profiles());
            const toSave = {
                label: document.querySelector('#label').value,
                address: {
                    firstName: document.querySelector('#first_name').value,
                    lastName: document.querySelector('#last_name').value,
                    email: document.querySelector('#email').value,
                    phone: document.querySelector('#phone').value,
                    field: document.querySelector('#field').value,
                    zip: document.querySelector('#zip').value,
                    city: document.querySelector('#city').value
                },
                creditCard: {
                    name: document.querySelector('#name').value,
                    number: document.querySelector('#number').value,
                    expiry: document.querySelector('#expiry').value,
                    cvv: document.querySelector('#cvv').value
                }
            }
            profiles.push(toSave)
            chrome.storage.sync.set({
                'profiles': JSON.stringify(profiles)
            });
        })
    });

    profilesList.addEventListener('click', async function() {
        // const select_elem = document.querySelector('#profile_selection > select')
        // select_elem.querySelectorAll('option').forEach((object, index) =>    // create dropdown items
        // {
        //     if (index !== 0) {
        //         object.remove();
        //     }
        // })
        // setTimeout(() => {
        //     chrome.storage.sync.get(null, function (store) {
        //         const profiles = JSON.parse(store.profiles)
        //         profiles.forEach((object) =>    // create dropdown items
        //         {
        //             select_elem.add(new Option(object.label))
        //         })
        //     })
        // }, 100)
    });


    profilesList.addEventListener('change', async function() {
        let profiles = JSON.parse(await extract.profiles());
        console.log(profilesList.value)
        for (item in profiles) {
            if (profilesList.value === profiles[item].label) {
                document.querySelector('#label').value = profiles[item].label
                document.querySelector('#first_name').value = profiles[item].address.firstName || ''
                document.querySelector('#last_name').value = profiles[item].address.lastName || ''
                document.querySelector('#email').value = profiles[item].address.email || ''
                document.querySelector('#phone').value = profiles[item].address.phone || ''
                document.querySelector('#field').value = profiles[item].address.field || ''
                document.querySelector('#zip').value = profiles[item].address.zip || ''
                document.querySelector('#city').value = profiles[item].address.city || ''
                document.querySelector('#name').value = profiles[item].creditCard.name || ''
                document.querySelector('#number').value = profiles[item].creditCard.number || ''
                document.querySelector('#expiry').value = profiles[item].creditCard.expiry || ''
                document.querySelector('#cvv').value = profiles[item].creditCard.cvv || ''
            }
        }
    });


    saveBtn.addEventListener('click', async () => {
        const profiles = JSON.parse(await extract.profiles());
        for (item in profiles) {
            if (profilesList.value === profiles[item].label) {
                profiles[item].label = document.querySelector('#label').value,
                profiles[item].address.firstName = document.querySelector('#first_name').value
                profiles[item].address.lastName = document.querySelector('#last_name').value
                profiles[item].address.email = document.querySelector('#email').value
                profiles[item].address.phone = document.querySelector('#phone').value
                profiles[item].address.field = document.querySelector('#field').value  
                profiles[item].address.zip = document.querySelector('#zip').value
                profiles[item].address.city = document.querySelector('#city').value
                profiles[item].creditCard.name = document.querySelector('#name').value 
                profiles[item].creditCard.number = document.querySelector('#number').value
                profiles[item].creditCard.expiry = document.querySelector('#expiry').value
                profiles[item].creditCard.cvv = document.querySelector('#cvv').value
                chrome.storage.sync.set({
                    'profiles': JSON.stringify(profiles)
                });
            }
        }
    })

    const deleteBtn = document.querySelector('#delete');
    deleteBtn.addEventListener('click', async () => {
        let profiles = JSON.parse(await extract.profiles());
        const profileToDelete = document.querySelector('#profile_selection > select').value
        for (item in profiles) {
            if (profileToDelete === profiles[item].label) {
                profiles.splice(item, 1);
                chrome.storage.sync.set({
                    'profiles': JSON.stringify(profiles)
                });
            }
        }
    })
})

const extract = {
    profiles: async function () {
        return new Promise((resolve) => {
            chrome.storage.sync.get(null, function(store) {
                resolve(store.profiles)
            })
        })
    }
}