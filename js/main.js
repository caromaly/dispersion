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

function update() {

  const mainPos = center(main);

  buttons.forEach((btn, i) => {
    const btnPos = center(btn);

    lines[i].setAttribute("x1", mainPos.x);
    lines[i].setAttribute("y1", mainPos.y);
    lines[i].setAttribute("x2", btnPos.x);
    lines[i].setAttribute("y2", btnPos.y);
  });

  requestAnimationFrame(update);
}

update();

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

    const linePos = shortenLine(
      mainPos.x,
      mainPos.y,
      btnPos.x,
      btnPos.y,
      100 // сколько обрезать
    );

    lines[i].setAttribute("x1", linePos.x1);
    lines[i].setAttribute("y1", linePos.y1);
    lines[i].setAttribute("x2", linePos.x2);
    lines[i].setAttribute("y2", linePos.y2);
  });

  requestAnimationFrame(update);
}

























});