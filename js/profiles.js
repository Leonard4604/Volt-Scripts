document.addEventListener('DOMContentLoaded', async () => {
    chrome.storage.sync.get(null, function (store) {
        let profiles = '' 
        if (store.profiles) {
            profiles = JSON.parse(store.profiles)
        }
        if (profiles) {
            const select_elem = document.querySelector('select#profile_selection')
            profiles.forEach((object) =>    // create dropdown items
            {
                select_elem.add(new Option(object.label))
            })
        }
    })

    const addProfile = document.querySelector('.add_profile > .button > button > #button')
    const copyProfile = document.querySelector('.copy_profile > .button > button > #button')
    const profilesList = document.querySelector('select#profile_selection')
    const saveBtn = document.querySelector('.profiles .save#custom_button');
    const deleteBtn = document.querySelector('.profiles .delete#custom_button');
    
    addProfile.addEventListener('click', async function() {
        // Pulisco tutti i campi
        document.querySelector('.profiles #label').value = ''
        document.querySelector('.profiles #first_name').value = ''
        document.querySelector('.profiles #last_name').value = ''
        document.querySelector('.profiles #email').value = ''
        document.querySelector('.profiles #phone').value = ''
        document.querySelector('.profiles #country').value = ''
        document.querySelector('.profiles #field').value = ''
        document.querySelector('.profiles #zip').value = ''
        document.querySelector('.profiles #province').value = ''
        document.querySelector('.profiles #city').value = ''
        document.querySelector('.profiles #name').value = ''
        document.querySelector('.profiles #number').value = ''
        document.querySelector('.profiles #expiry').value = ''
        document.querySelector('.profiles #cvv').value = ''

        // Seleziono l'ultima opzione
        const select_elem = document.querySelector('select#profile_selection')
        select_elem.add(new Option(''))

        select_elem.options[0].removeAttribute('selected');
        select_elem.options[select_elem.options.length - 1].setAttribute('selected', 'selected');
        
        // Listener per il click del save button dopo che si è premuto add profile, salva il profilo in uno nuovo
        saveBtn.addEventListener('click', async () => {
            let profiles = await extract.profiles();
            if (profiles) {
                profiles = JSON.parse(profiles);
            }
            else {
                profiles = [];
            }
            const toSave = {
                label: document.querySelector('.profiles #label').value,
                address: {
                    firstName: document.querySelector('.profiles #first_name').value,
                    lastName: document.querySelector('.profiles #last_name').value,
                    email: document.querySelector('.profiles #email').value,
                    phone: document.querySelector('.profiles #phone').value,
                    country: document.querySelector('.profiles #country').value,
                    field: document.querySelector('.profiles #field').value,
                    zip: document.querySelector('.profiles #zip').value,
                    province: document.querySelector('.profiles #province').value,
                    city: document.querySelector('.profiles #city').value
                },
                creditCard: {
                    name: document.querySelector('.profiles #name').value,
                    number: document.querySelector('.profiles #number').value,
                    expiry: document.querySelector('.profiles #expiry').value,
                    cvv: document.querySelector('.profiles #cvv').value
                }
            }
            profiles.push(toSave)
            chrome.storage.sync.set({
                'profiles': JSON.stringify(profiles, null, 3)
            });
        })
    });

    // Listener per il click del copy button
    copyProfile.addEventListener('click', async function() {
        let profiles = await extract.profiles();
        if (profiles) {
            profiles = JSON.parse(profiles);
        }
        else {
            profiles = [];
        }
        for (item in profiles) {
            if (profilesList.value === profiles[item].label) {
                const toSave = {
                    label: `${profiles[item].label} - Copy`,
                    address: {
                        firstName: profiles[item].address.firstName,
                        lastName: profiles[item].address.lastName,
                        email: profiles[item].address.email,
                        phone: profiles[item].address.phone,
                        country: profiles[item].address.country,
                        field: profiles[item].address.field,
                        zip: profiles[item].address.zip,
                        province: profiles[item].address.province,
                        city: profiles[item].address.city
                    },
                    creditCard: {
                        name: profiles[item].creditCard.name,
                        number: profiles[item].creditCard.number,
                        expiry: profiles[item].creditCard.expiry,
                        cvv: profiles[item].creditCard.cvv
                    }
                }
                profiles.push(toSave)
                chrome.storage.sync.set({
                    'profiles': JSON.stringify(profiles, null, 3)
                });
            }
        }
        // Refresho la pagina per aggiornare il dropdown
        window.location.reload()
    });

    // Listener per il cambio nella selection
    profilesList.addEventListener('change', async function() {
        let profiles = await extract.profiles();
        if (profiles) {
            profiles = JSON.parse(profiles);
        }
        else {
            profiles = [];
        }
        for (item in profiles) {
            if (profilesList.value === profiles[item].label) {
                document.querySelector('.profiles #label').value = profiles[item].label
                document.querySelector('.profiles #first_name').value = profiles[item].address.firstName || ''
                document.querySelector('.profiles #last_name').value = profiles[item].address.lastName || ''
                document.querySelector('.profiles #email').value = profiles[item].address.email || ''
                document.querySelector('.profiles #phone').value = profiles[item].address.phone || ''
                document.querySelector('.profiles #country').value = profiles[item].address.country || ''
                document.querySelector('.profiles #field').value = profiles[item].address.field || ''
                document.querySelector('.profiles #zip').value = profiles[item].address.zip || ''
                document.querySelector('.profiles #province').value = profiles[item].address.province || ''
                document.querySelector('.profiles #city').value = profiles[item].address.city || ''
                document.querySelector('.profiles #name').value = profiles[item].creditCard.name || ''
                document.querySelector('.profiles #number').value = profiles[item].creditCard.number || ''
                document.querySelector('.profiles #expiry').value = profiles[item].creditCard.expiry || ''
                document.querySelector('.profiles #cvv').value = profiles[item].creditCard.cvv || ''
            }
        }
    });

    // Listener per il click del save button, sovrascrive i profili già esistenti
    saveBtn.addEventListener('click', async () => {
        let profiles = await extract.profiles();
        if (profiles) {
            profiles = JSON.parse(profiles);
        }
        else {
            profiles = [];
        }
        for (item in profiles) {
            if (profilesList.value === profiles[item].label) {
                profiles[item].label = document.querySelector('.profiles #label').value,
                profiles[item].address.firstName = document.querySelector('.profiles #first_name').value
                profiles[item].address.lastName = document.querySelector('.profiles #last_name').value
                profiles[item].address.email = document.querySelector('.profiles #email').value
                profiles[item].address.phone = document.querySelector('.profiles #phone').value
                profiles[item].address.country = document.querySelector('.profiles #country').value
                profiles[item].address.field = document.querySelector('.profiles #field').value  
                profiles[item].address.zip = document.querySelector('.profiles #zip').value
                profiles[item].address.province = document.querySelector('.profiles #province').value
                profiles[item].address.city = document.querySelector('.profiles #city').value
                profiles[item].creditCard.name = document.querySelector('.profiles #name').value 
                profiles[item].creditCard.number = document.querySelector('.profiles #number').value
                profiles[item].creditCard.expiry = document.querySelector('.profiles #expiry').value
                profiles[item].creditCard.cvv = document.querySelector('.profiles #cvv').value
                chrome.storage.sync.set({
                    'profiles': JSON.stringify(profiles, null, 3)
                });
            }
        }
        // Refresho la pagina per aggiornare il dropdown
        window.location.reload()
    })

    deleteBtn.addEventListener('click', async () => {
        let profiles = await extract.profiles();
        if (profiles) {
            profiles = JSON.parse(profiles);
        }
        else {
            profiles = [];
        }
        const profileToDelete = document.querySelector('select#profile_selection').value
        for (item in profiles) {
            if (profiles[item].label.startsWith(' ')) {
                profiles[item].label = profiles[item].label.replace(' ', '')
            }
            if (profileToDelete === profiles[item].label) {
                profiles.splice(item, 1);
                chrome.storage.sync.set({
                    'profiles': JSON.stringify(profiles, null, 3)
                });
            }
        }
        // Refresho la pagina per aggiornare il dropdown
        window.location.reload()
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