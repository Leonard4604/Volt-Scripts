var actualCode = `grecaptcha.execute(document.querySelector('[class="g-recaptcha"]'));`;

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');