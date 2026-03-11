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



const letters = document.querySelectorAll('.anima2 div');

letters.forEach(letter => {
  letter.addEventListener('click', function () {
    letter.style.animation = 'none';
    letter.style.transform = 'translate(0vw, 0vw)';
  });
});

 




});