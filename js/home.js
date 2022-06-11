document.addEventListener('DOMContentLoaded', async () => {
    const showBtn = document.querySelector('.home #license #show')
    const key = document.querySelector('.home #license #key') 
    const hidden = document.querySelector('.home #license #hidden') 
    const copyBtn = document.querySelector('.home #license #copy')

    showBtn.addEventListener('mousedown', () => {
        showElement(key, hidden)
    })

    showBtn.addEventListener('mouseup', () => {
        showElement(hidden, key)
    })

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(key.textContent).then(function() {
            console.log('Async: Copying to clipboard was successful!');
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    })

    function showElement(shown, hidden) {
        shown.style.display='flex';
        hidden.style.display='none';
        return false;
    }
});