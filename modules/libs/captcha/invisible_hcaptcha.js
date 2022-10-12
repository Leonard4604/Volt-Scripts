async function triggerCaptcha() {
    var actualCode = `hcaptcha.execute();`;

    document.documentElement.setAttribute('onreset', actualCode);
    document.documentElement.dispatchEvent(new CustomEvent('reset'));
    document.documentElement.removeAttribute('onreset');
}