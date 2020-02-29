const colors = ['#f95a53', '#f98453', '#f8b23a', '#7cb771', '#61bdd1', '#90989e']

colors.forEach(function (el) {
    const container = document.querySelector('#colors');
    let current = chroma(el).luminance();
    let lumDownA = chroma(el).luminance((current + -0.08), 'hsl').saturate(0.5).hex();
    let lumUpA = chroma(el).luminance((current + 0.2), 'hsl').hex();
    let lumUpB = chroma(el).luminance((current + 0.4), 'hsl').hex();
    let newBlock = `<div class="row">
        ${createBlockEl(lumDownA, true)}
        ${createBlockEl(el, true)}
        ${createBlockEl(el)}
        ${createBlockEl(lumUpA)}
        ${createBlockEl(lumUpB)}
    </div>`;
    container.insertAdjacentHTML('beforeEnd', newBlock);
});

const blocks = document.querySelectorAll('.block');
blocks.forEach(function(el){
    el.addEventListener('click',function(){
        const hexcode = this.dataset.hex;
        if (hexcode) {
            copyToClipboard(hexcode);
        }
    });
});

function createBlockEl(hex, isIcons) {
    let el = `<div class="block" style="background-color:${hex}" data-hex="${hex}">
    <span class="black-text">${hex}</span><span class="white-text">${hex}</span>
    </div>`;
    if (isIcons) {
        el = `<div class="block" style="color:${hex}" data-hex="${hex}"><span><i class="fas fa-exclamation-circle"></i><i class="fas fa-check-circle"></i><i class="far fa-check-circle"></i></span><span>${hex}</span></div>`;
    }
    return el;
}

function copyToClipboard(val) {
    let textArea = document.createElement("textarea");
    textArea.value = val;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.log('Oops, unable to copy');
    }
     document.body.removeChild(textArea);
     const message = document.querySelector('#message');
    fadeIn(message);
    setTimeout(function(){ fadeOut(message) }, 1500);
}

function fadeOut(el){
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  };
  
  function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || 'block';
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  };