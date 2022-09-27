const logger = {
    display: function() {
      const html = `
      <div id="volt-logger-container">
        <div id="volt-logger-header">
            <div id="volt-logo">
                <svg xmlns="http://www.w3.org/2000/svg" id="Livello_1" data-name="Livello 1" viewBox="0 0 1080 1080"><path d="M459.37,575.64H433A70.36,70.36,0,0,1,430.3,435l.74,20.87a49.48,49.48,0,0,0,2,98.92h26.33Z" style="fill:#ffec00"/><path d="M644.3,575.64H620.49l18.21-20.88h5.6c47,0,52.12-34,52.12-48.63a52.15,52.15,0,0,0-52-52.14V433.11a73.05,73.05,0,0,1,72.92,73C717.3,539.73,698.12,575.64,644.3,575.64Z" style="fill:#ffec00"/><path d="M578.17,343.77a77.79,77.79,0,0,0-64.61,34.81,70.35,70.35,0,0,0-65.9,122.25l7.4-21.32a49.5,49.5,0,0,1,49.77-81.82L428.07,612.94h59L459.79,736.57,618.35,555.25H573.87l26.94-78c6.59-13.05,23-22.35,40.94-23.21l6.89-.33,2.4-6.47a74.36,74.36,0,0,0,4.56-26A77.55,77.55,0,0,0,578.17,343.77ZM633.3,433.9c-22.95,3.29-42.7,16.43-51.54,34.79L544.57,576.12h27.79l-74.58,85.29,15.33-69.35H457.68l69.93-196.13a56.53,56.53,0,0,1,107.11,25.33A55.28,55.28,0,0,1,633.3,433.9Z" style="fill:#ffec00"/></svg>
            </div>
            <div id="logger-header-text">
                Volt Scripts
            </div>
            <div id="volt-logger-sidebar">
              <div id="close-volt-logger">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
              <div id="clear-cart-volt-logger">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </div>
            </div>
        </div>
        <div id="volt-logger-content">
        </div>
    </div>
      `
      document.querySelector('body').insertAdjacentHTML('beforeend', html)
      
      const closeBtn = document.querySelector('#close-volt-logger');
      closeBtn.addEventListener('click', () => {
          document.querySelector('#volt-logger-container').style.display = 'none';
      })
    
      // Make the DIV element draggable:
      dragElement(document.querySelector("#volt-logger-container"));
    
      return true;
    },
    wait: function(text = '') {
      const html = `
      <div class="volt-logger-line">
        <div id="volt-logger-loading">
            <div id="volt-logger-status">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div id="volt-logger-message">${text}</div>
        </div>
      </div>
    `
    document.querySelector('#volt-logger-content').insertAdjacentHTML('beforeend', html)
    updateScroll() 
    },
    update: {
      success: function(text = '') {
        const html = `
        <div class="volt-logger-line">
          <div id="volt-logger-success">
            <div id="volt-logger-status">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div id="volt-logger-message">${text}</div>
          </div>
        </div>
      `
      const loading = document.querySelectorAll('#volt-logger-loading')
      if (loading.length !== 0) {
        loading[loading.length - 1].remove();
      }
      document.querySelector('#volt-logger-content').insertAdjacentHTML('beforeend', html)
      updateScroll()   
      },
      error: function(text = '') {
        const html = `
        <div class="volt-logger-line">
          <div id="volt-logger-error">
            <div id="volt-logger-status">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#890000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
            <div id="volt-logger-message">${text}</div>
          </div>
        </div>
      `
      const loading = document.querySelectorAll('#volt-logger-loading')
      if (loading.length !== 0) {
        loading[loading.length - 1].remove();
      }
      document.querySelector('#volt-logger-content').insertAdjacentHTML('beforeend', html)
      updateScroll()  
      }
    }
}
  
// Function to be able to drag the window
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.querySelector('#volt-logger-header')) {
    // if present, the header is where you move the DIV from:
    document.querySelector('#volt-logger-header').onmousedown = dragMouseDown;
    } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    }
}
  
// Auto scroll to the last element of the logger
function updateScroll(){
    var element = document.querySelector('#volt-logger-content');
    element.scrollTop = element.scrollHeight;
}