document.addEventListener("DOMContentLoaded", function (){


const items = document.querySelectorAll(".cursor");

const repelRadius = 200;
const repelForce = 70;

let mouse = {
  x: 0,
  y: 0
};

const basePositions = [];

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("load", () => {
  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();

    basePositions[index] = {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };

    item.style.left = basePositions[index].left + "px";
    item.style.top = basePositions[index].top + "px";
    item.style.marginLeft = "0";
    item.style.marginTop = "0";
  });

  repel();
});

function repel() {
  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();

    const itemX = rect.left + rect.width / 2;
    const itemY = rect.top + rect.height / 2;

    const dx = itemX - mouse.x;
    const dy = itemY - mouse.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    let moveX = 0;
    let moveY = 0;

    if (distance < repelRadius) {
      const angle = Math.atan2(dy, dx);
      const force = (repelRadius - distance) / repelRadius;

      moveX = Math.cos(angle) * force * repelForce;
      moveY = Math.sin(angle) * force * repelForce;
    }

    item.style.left = basePositions[index].left + moveX + "px";
    item.style.top = basePositions[index].top + moveY + "px";
  });

  requestAnimationFrame(repel);
}



const letters = document.querySelectorAll('.anima2 > div');

letters.forEach(letter => {
  let played = false;

  letter.addEventListener('click', () => {

    if (played) return;

    letter.style.animation = 'none';
    letter.offsetHeight; 

    letter.classList.add('reverse');
    letter.style.animation = '';

    played = true;
    
  });
  
});


const text = document.querySelector('.t_1');

let finishedCount = 0;

letters.forEach(letter => {
  let played = false;

  letter.addEventListener('click', () => {
    if (played) return;

    letter.style.animation = 'none';
    letter.offsetHeight;

    letter.classList.add('reverse');
    letter.style.animation = '';

    played = true;
  });

  letter.addEventListener('animationend', () => {
    if (!played) return;

    finishedCount++;

    if (finishedCount === letters.length) {
      text.classList.add('show');
    }
  });
});






const container = document.querySelector('.div1');
const svg = document.querySelector('.links');

const main = document.querySelector('.main');
const buttons = document.querySelectorAll('.but');

const lines = [];

buttons.forEach(() => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "0.4vw");
  svg.appendChild(line);
  lines.push(line);
});

function center(el) {
  const rect = el.getBoundingClientRect();
  const parent = container.getBoundingClientRect();

  return {
    x: rect.left - parent.left + rect.width / 2,
    y: rect.top - parent.top + rect.height / 2
  };
}

function shortenLine(x1, y1, x2, y2, cut) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const length = Math.sqrt(dx * dx + dy * dy);

  const offsetX = (dx / length) * cut;
  const offsetY = (dy / length) * cut;

  return {
    x1: x1 + offsetX,
    y1: y1 + offsetY,
    x2: x2 - offsetX,
    y2: y2 - offsetY
  };
}

function update() {

  const mainPos = center(main);

  buttons.forEach((btn, i) => {

    const btnPos = center(btn);

    function shortenLine(x1, y1, x2, y2, cutStart, cutEnd) {

  const dx = x2 - x1;
  const dy = y2 - y1;

  const length = Math.sqrt(dx * dx + dy * dy);

  const ux = dx / length;
  const uy = dy / length;

  return {
    x1: x1 + ux * cutStart,
    y1: y1 + uy * cutStart,
    x2: x2 - ux * cutEnd,
    y2: y2 - uy * cutEnd
  };
}

const vw = window.innerWidth / 90;
const line = shortenLine(
  mainPos.x,
  mainPos.y,
  btnPos.x,
  btnPos.y,
  8 * vw,
  5 * vw
);


    
    lines[i].setAttribute("x1", line.x1);
    lines[i].setAttribute("y1", line.y1);
    lines[i].setAttribute("x2", line.x2);
    lines[i].setAttribute("y2", line.y2);
  });

  requestAnimationFrame(update);
}

update();



const overlays = document.querySelectorAll('.overlay');
const buto = document.querySelectorAll('.but');

let current = null;

function showPic(index){

  overlays.forEach(el => el.classList.remove('active'));
  buto.forEach(el => el.classList.remove('active'));

  if(current === index){
    current = null;
    return;
  }

  overlays[index].classList.add('active');
  buto[index].classList.add('active');

  current = index;
}

document.querySelector('.b1').onclick = () => showPic(0);
document.querySelector('.b2').onclick = () => showPic(1);
document.querySelector('.b3').onclick = () => showPic(2);
document.querySelector('.b4').onclick = () => showPic(3);








const cards = document.querySelectorAll('.card');
let first = null;
let lock = false;

cards.forEach(card => {
  card.onclick = function () {
    if (lock || card === first || card.classList.contains('done')) return;

    card.classList.add('open');

    if (!first) {
      first = card;
      return;
    }

    lock = true;

    const ok =
      (first.classList.contains('c1') && card.classList.contains('c4')) ||
      (first.classList.contains('c4') && card.classList.contains('c1')) ||
      (first.classList.contains('c2') && card.classList.contains('c5')) ||
      (first.classList.contains('c5') && card.classList.contains('c2')) ||
      (first.classList.contains('c3') && card.classList.contains('c6')) ||
      (first.classList.contains('c6') && card.classList.contains('c3'));

    if (ok) {
      if (
        (first.classList.contains('c1') && card.classList.contains('c4')) ||
        (first.classList.contains('c4') && card.classList.contains('c1'))
      ) {
        document.querySelector('.pink').classList.add('act');
      }

      if (
        (first.classList.contains('c2') && card.classList.contains('c5')) ||
        (first.classList.contains('c5') && card.classList.contains('c2'))
      ) {
        document.querySelector('.red').classList.add('act');
      }

      if (
        (first.classList.contains('c3') && card.classList.contains('c6')) ||
        (first.classList.contains('c6') && card.classList.contains('c3'))
      ) {
        document.querySelector('.blue').classList.add('act');
      }

      first.classList.add('done');
      card.classList.add('done');
      first = null;
      lock = false;
    } else {
      setTimeout(() => {
        first.classList.remove('open');
        card.classList.remove('open');
        first = null;
        lock = false;
      }, 900);
    }
  };
});



const colb1 = document.querySelector('.colb1');
const colb2 = document.querySelector('.colb2');
const colb3 = document.querySelector('.colb3');
const colb4 = document.querySelector('.colb4');
const colb5 = document.querySelector('.colb5');

const up1 = document.querySelector('.up1');
const up2 = document.querySelector('.up2');
const up3 = document.querySelector('.up3');
const up4 = document.querySelector('.up4');
const up5 = document.querySelector('.up5');

const popups = document.querySelectorAll('.popup');

let activeColb = null;
let z = 2;

function openPopup(popup, colb) {
  if (activeColb) {
    activeColb.classList.remove('active');
  }

  colb.classList.add('active');
  activeColb = colb;

  popup.classList.add('show');
  popup.style.zIndex = z;
  z++;
}

colb1.onclick = function () {
  openPopup(up1, colb1);
};

colb2.onclick = function () {
  openPopup(up2, colb2);
};

colb3.onclick = function () {
  openPopup(up3, colb3);
};

colb4.onclick = function () {
  openPopup(up4, colb4);
};

colb5.onclick = function () {
  openPopup(up5, colb5);
};

function closePopup(popup, colb, e) {
  if (e.offsetX < 60 && e.offsetY < 60) {
    popup.classList.remove('show');
    colb.classList.remove('active');
    activeColb = null;

    const text = popup.querySelector('.typewriter');
    if (text) {
      stopTypewriter(text, true);
    }
  }
}

up1.onclick = function (e) {
  closePopup(up1, colb1, e);
};

up2.onclick = function (e) {
  closePopup(up2, colb2, e);
};

up3.onclick = function (e) {
  closePopup(up3, colb3, e);
};

up4.onclick = function (e) {
  closePopup(up4, colb4, e);
};

up5.onclick = function (e) {
  closePopup(up5, colb5, e);
};

up5.onclick = function (e) {
  if (e.offsetX < 60 && e.offsetY < 60) {
    up5.classList.remove('show');
    colb5.classList.remove('active');
    activeColb = null;
  }
};







const sec4Block = document.querySelector('.sec4');
  const draggableElements = document.querySelectorAll('.sec4 .item');
  const activeZones = document.querySelectorAll(
    '.sec4 .activescene1, .sec4 .activescene2, .sec4 .activescene3'
  );
  const buttonBlock = document.querySelector('.but2');
  const popupBlock = document.querySelector('.popup2');
  const coverBlock = document.querySelector('.cover');

  draggableElements.forEach((elementCard) => {
    let shiftX = 0;
    let shiftY = 0;
    let dragging = false;

    elementCard.addEventListener('mousedown', startDrag);
    elementCard.addEventListener('touchstart', startDrag, { passive: false });

    function startDrag(evt) {
      evt.preventDefault();

      const pointer = getPointer(evt);
      const elementRect = elementCard.getBoundingClientRect();
      const sec4Rect = sec4Block.getBoundingClientRect();

      dragging = true;
      elementCard.classList.add('dragging');
      elementCard.style.zIndex = '5';

      shiftX = pointer.clientX - elementRect.left;
      shiftY = pointer.clientY - elementRect.top;

      const currentLeft = elementRect.left - sec4Rect.left;
      const currentTop = elementRect.top - sec4Rect.top;

      elementCard.style.left = `${currentLeft}px`;
      elementCard.style.top = `${currentTop}px`;
      elementCard.style.marginLeft = '0';
      elementCard.style.marginTop = '0';

      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', onDrag, { passive: false });
      document.addEventListener('touchend', stopDrag);
    }

    function onDrag(evt) {
      if (!dragging) return;
      evt.preventDefault();

      const pointer = getPointer(evt);
      const sec4Rect = sec4Block.getBoundingClientRect();

      let nextLeft = pointer.clientX - sec4Rect.left - shiftX;
      let nextTop = pointer.clientY - sec4Rect.top - shiftY;

      const maxLeft = sec4Rect.width - elementCard.offsetWidth;
      const maxTop = sec4Rect.height - elementCard.offsetHeight;

      if (nextLeft < 0) nextLeft = 0;
      if (nextTop < 0) nextTop = 0;
      if (nextLeft > maxLeft) nextLeft = maxLeft;
      if (nextTop > maxTop) nextTop = maxTop;

      elementCard.style.left = `${nextLeft}px`;
      elementCard.style.top = `${nextTop}px`;

      updateAnimationState(elementCard);
      updateButtonState();
    }

    function stopDrag() {
      dragging = false;
      elementCard.classList.remove('dragging');
      elementCard.style.zIndex = '3';

      updateAnimationState(elementCard);
      updateButtonState();

      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDrag);
    }
  });

  buttonBlock.addEventListener('click', () => {
    if (!buttonBlock.classList.contains('on')) return;

    popupBlock.classList.add('show');
    coverBlock.classList.add('show');
    popupBlock.style.visibility = 'visible';
    popupBlock.style.pointerEvents = 'auto';
  });

  coverBlock.addEventListener('click', () => {
    popupBlock.classList.remove('show');
    coverBlock.classList.remove('show');
    popupBlock.style.visibility = 'hidden';
    popupBlock.style.pointerEvents = 'none';
  });

  function getPointer(evt) {
    return evt.touches ? evt.touches[0] : evt;
  }

  function updateAnimationState(elementCard) {
    if (isInActiveZone(elementCard)) {
      elementCard.style.animation = 'none';
    } else {
      elementCard.style.animation = '';
    }
  }

  function updateButtonState() {
    let hasActiveElement = false;

    draggableElements.forEach((elementCard) => {
      if (isInActiveZone(elementCard)) {
        hasActiveElement = true;
      }
    });

    if (hasActiveElement) {
      buttonBlock.classList.add('on');
    } else {
      buttonBlock.classList.remove('on');

      popupBlock.classList.remove('show');
      coverBlock.classList.remove('show');
      popupBlock.style.visibility = 'hidden';
      popupBlock.style.pointerEvents = 'none';
    }
  }

  function isInActiveZone(elementCard) {
    const elementRect = elementCard.getBoundingClientRect();

    for (const zoneBlock of activeZones) {
      const zoneRect = zoneBlock.getBoundingClientRect();

      const overlapX = Math.max(
        0,
        Math.min(elementRect.right, zoneRect.right) - Math.max(elementRect.left, zoneRect.left)
      );

      const overlapY = Math.max(
        0,
        Math.min(elementRect.bottom, zoneRect.bottom) - Math.max(elementRect.top, zoneRect.top)
      );

      const overlapArea = overlapX * overlapY;
      const elementArea = elementRect.width * elementRect.height;

      if (overlapArea > elementArea * 0.3) {
        return true;
      }
    }

    return false;
  }




  
    const takeButton = document.querySelector('.take');

    takeButton.addEventListener('click', () => {
      popupBlock.classList.remove('show');
      coverBlock.classList.remove('show');
      popupBlock.style.visibility = 'hidden';
      popupBlock.style.pointerEvents = 'none';
    });

    buttonBlock.addEventListener('click', () => {
  if (!buttonBlock.classList.contains('on')) return;

  popupBlock.classList.add('show');
  coverBlock.classList.add('show');

  popupBlock.style.visibility = 'visible';
  popupBlock.style.pointerEvents = 'auto';

  document.body.classList.add('lock');
});

coverBlock.addEventListener('click', () => {
  popupBlock.classList.remove('show');
  coverBlock.classList.remove('show');

  popupBlock.style.visibility = 'hidden';
  popupBlock.style.pointerEvents = 'none';

  document.body.classList.remove('lock');
});

takeButton.addEventListener('click', () => {
  popupBlock.classList.remove('show');
  coverBlock.classList.remove('show');

  popupBlock.style.visibility = 'hidden';
  popupBlock.style.pointerEvents = 'none';

  document.body.classList.remove('lock');
});




    const TYPE_SPEED = 30;

    function prepareTypewriters() {
      document.querySelectorAll('.typewriter').forEach((element) => {
        if (!element.dataset.originalHtml) {
          element.dataset.originalHtml = element.innerHTML;
        }

        const popup = element.closest('.popup');

        if (!popup || !popup.classList.contains('show')) {
          element.innerHTML = '';
        }
      });
    }

    function stopTypewriter(element, clearText = false) {
      if (element._typeTimer) {
        clearTimeout(element._typeTimer);
      }

      element._typingRun = (element._typingRun || 0) + 1;

      if (clearText) {
        element.innerHTML = '';
      }
    }

    function startTypewriter(element) {
      const original = element.dataset.originalHtml || element.innerHTML;

      stopTypewriter(element, true);

      let i = 0;
      const runId = element._typingRun;

      function type() {
        if (element._typingRun !== runId) return;

        if (i >= original.length) return;

        if (original.slice(i, i + 4).toLowerCase() === '<br>') {
          element.innerHTML += '<br>';
          i += 4;
        } else {
          element.innerHTML += original[i];
          i++;
        }

        element._typeTimer = setTimeout(type, TYPE_SPEED);
      }

      type();
    }

    function restartPopupTypewriter(popup) {
      const text = popup.querySelector('.typewriter');
      if (!text) return;

      startTypewriter(text);
    }

    prepareTypewriters();

     document.querySelectorAll('.popup.show').forEach((popup) => {
      restartPopupTypewriter(popup);
    });

    function openPopup(popup, colb) {
      if (activeColb) {
        activeColb.classList.remove('active');
      }

      colb.classList.add('active');
      activeColb = colb;

      popup.classList.add('show');
      popup.style.zIndex = z;
      z++;

      restartPopupTypewriter(popup);
    }

    function restartBubble3Typewriter() {
    stopTypewriter(text3_1, true);
    stopTypewriter(text3_2, true);
    stopTypewriter(text3_3, true);

    if (step === 1) {
        startTypewriter(text3_1);
    }
    else if (step === 2) {
        startTypewriter(text3_2);
    }
    else if (step === 3) {
        startTypewriter(text3_3);
    }
}






document.querySelectorAll('.pict').forEach(p => {
  p.onclick = () => {
    
    p.classList.add('shake');
    setTimeout(() => p.classList.remove('shake'), 400);

    let topImg = p.querySelector('[class*="_2"]');
    topImg.style.opacity = "1";
  }
});




const bubble2 = document.querySelector('.bubble2');
const bubble3 = document.querySelector('.bubble3');
const bubble4 = document.querySelector('.bubble4');

const text2_0 = document.querySelector('.bb2_0');
const text2_1 = document.querySelector('.bb2_1');
const text2_2 = document.querySelector('.bb2_2');
const text2_3 = document.querySelector('.bb2_3');

const text3_1 = document.querySelector('.bb3_1');
const text3_2 = document.querySelector('.bb3_2');
const text3_3 = document.querySelector('.bb3_3');

const text4_1 = document.querySelector('.bb4_1');
const text4_2 = document.querySelector('.bb4_2');


let step = 0;

function hideAllTexts() {

    text2_0.classList.remove('active-text');
    text2_1.classList.remove('active-text');
    text2_2.classList.remove('active-text');
    text2_3.classList.remove('active-text');
    
    text3_1.classList.remove('active-text');
    text3_2.classList.remove('active-text');
    text3_3.classList.remove('active-text');
    
    text4_1.classList.remove('active-text');
    text4_2.classList.remove('active-text');
}

function updateDisplay() {
    hideAllTexts();
    
    if (step === 0) {
        text2_0.classList.add('active-text');
        bubble3.classList.remove('visible');
        bubble4.classList.remove('visible');
    }
    else if (step === 1) {
        text2_1.classList.add('active-text');
        text3_1.classList.add('active-text');
        text4_1.classList.add('active-text');
        bubble3.classList.add('visible');
        bubble4.classList.add('visible');
    }
    else if (step === 2) {
        text2_2.classList.add('active-text');
        text3_2.classList.add('active-text');
        text4_1.classList.add('active-text');
        bubble3.classList.add('visible');
        bubble4.classList.add('visible');
    }
    else if (step === 3) {
        text2_3.classList.add('active-text');
        text3_3.classList.add('active-text');
        text4_2.classList.add('active-text');
        bubble3.classList.add('visible');
        bubble4.classList.add('visible');
    }
    
    setupEventListeners();
    restartBubble3Typewriter();
}


function setupEventListeners() {

    bubble2.onclick = function() {
        if (step === 0) {
            step = 1;
            updateDisplay();
        }
    };

    if (text4_1) {
        text4_1.onclick = function(e) {
            e.stopPropagation();
            if (step === 1) {
                step = 2;
                updateDisplay();
            }
            else if (step === 2) {
                step = 3;
                updateDisplay();
            }
        };
    }
    

    if (text4_2) {
        text4_2.onclick = function(e) {
            e.stopPropagation();
            if (step === 3) {
                step = 0;
                updateDisplay();
            }
        };
    }
}

updateDisplay();


const input = document.querySelector('.input-write');
const write = document.querySelector('.write');

input.addEventListener('input', () => {
    const length = input.value.length;

    // двигаем "палочку" вправо
    write.style.setProperty('--pos', length);
    write.style.width = (length * 10 + 10) + 'px';
});

const bottle = document.getElementById('bottle');
const backpic = document.getElementById('backpic');

bottle.addEventListener('click', function () {
    backpic.classList.add('show');
});

    
});