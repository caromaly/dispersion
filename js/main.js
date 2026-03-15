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
  line.setAttribute("stroke-width", "3");
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

const vw = window.innerWidth / 100;
const line = shortenLine(
  mainPos.x,
  mainPos.y,
  btnPos.x,
  btnPos.y,
  8 * vw,
  4 * vw
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

up1.onclick = function (e) {
  if (e.offsetX < 60 && e.offsetY < 60) {
    up1.classList.remove('show');
    colb1.classList.remove('active');
    activeColb = null;
  }
};

up2.onclick = function (e) {
  if (e.offsetX < 60 && e.offsetY < 60) {
    up2.classList.remove('show');
    colb2.classList.remove('active');
    activeColb = null;
  }
};

up3.onclick = function (e) {
  if (e.offsetX < 60 && e.offsetY < 60) {
    up3.classList.remove('show');
    colb3.classList.remove('active');
    activeColb = null;
  }
};

up4.onclick = function (e) {
  if (e.offsetX < 60 && e.offsetY < 60) {
    up4.classList.remove('show');
    colb4.classList.remove('active');
    activeColb = null;
  }
};

up5.onclick = function (e) {
  if (e.offsetX < 60 && e.offsetY < 60) {
    up5.classList.remove('show');
    colb5.classList.remove('active');
    activeColb = null;
  }
};

















});