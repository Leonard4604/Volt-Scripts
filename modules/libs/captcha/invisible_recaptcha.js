async function triggerCaptcha() {
    var actualCode = `grecaptcha.execute(document.querySelector('[class="g-recaptcha"]'));`;

    document.documentElement.setAttribute('onreset', actualCode);
    document.documentElement.dispatchEvent(new CustomEvent('reset'));
    document.documentElement.removeAttribute('onreset');
}

async function getToken() {
    return new Promise(resolve => {
        try {
            let delayInterval = setInterval(function() {
                const token = document.querySelector('[name="g-recaptcha-response"]').value
                if (token !== '') {
                    clearInterval(delayInterval)
                    resolve(token)
                }
            }, 100)
        }
        catch {

        }
    })
}