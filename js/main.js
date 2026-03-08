document.addEventListener("DOMContentLoaded", function (){





   const TOTAL = 30;
   const scene = document.querySelector('.scene');
   const IMAGE_SRC = 'images/cur.svg';

   const items = [];


   function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
   }


   function rand(min, max) {
      return Math.random() * (max - min) + min;
   }

   function createItem(index) {

   const el = document.createElement('div');
   el.className = 'floating';
   el.style.setProperty('--delay', `${rand(0, 4).toFixed(2)}s`);

   const img = document.createElement('img');
   img.src = IMAGE_SRC;
   img.alt = `image-${index + 1}`;

   el.appendChild(img);
   scene.appendChild(el);

   const fromLeft = index < TOTAL / 2;
   const size = Math.max(window.innerWidth * 0.03, 28);
   const startX = fromLeft ? -size - rand(10, 140) : window.innerWidth + rand(10, 140);
   const startY = rand(0, window.innerHeight - size);

      el.style.left = `${startX}px`;
      el.style.top = `${startY}px`;

      const item = {
        el,
        size,
        fromLeft,
        settledX: 0,
        settledY: 0,
      };

      items.push(item);

      requestAnimationFrame(() => {
        setTimeout(() => moveToCenter(item, index), 60 + index * 70);
      });

      el.addEventListener('mouseenter', () => scatterFromCursor(item));
    }

    function moveToCenter(item, index) {
      const centerBandXMin = window.innerWidth * 0.28;
      const centerBandXMax = window.innerWidth * 0.72;
      const centerBandYMin = window.innerHeight * 0.18;
      const centerBandYMax = window.innerHeight * 0.82;

      const columns = 6;
      const gapX = window.innerWidth * 0.07;
      const gapY = window.innerHeight * 0.12;
      const col = index % columns;
      const row = Math.floor(index / columns);

      let x = window.innerWidth / 2 - (columns / 2) * gapX + col * gapX + rand(-20, 20);
      let y = window.innerHeight / 2 - 2 * gapY + row * gapY + rand(-20, 20);

      x = clamp(x, centerBandXMin, centerBandXMax);
      y = clamp(y, centerBandYMin, centerBandYMax);

      item.settledX = x;
      item.settledY = y;

      item.el.style.left = `${x}px`;
      item.el.style.top = `${y}px`;
      item.el.style.transform = `rotate(${rand(-20, 20).toFixed(1)}deg)`;

      setTimeout(() => {
        item.el.classList.add('settled');
      }, 1400);
    }

    function scatterFromCursor(item) {
      const spread = Math.min(window.innerWidth, window.innerHeight) * 0.22;
      const angle = rand(0, Math.PI * 2);
      const distance = rand(spread * 0.6, spread);

      const targetX = clamp(
        item.settledX + Math.cos(angle) * distance,
        0,
        window.innerWidth - item.size
      );

      const targetY = clamp(
        item.settledY + Math.sin(angle) * distance,
        0,
        window.innerHeight - item.size
      );

      item.el.classList.add('scatter');
      item.el.classList.remove('settled');
      item.el.style.left = `${targetX}px`;
      item.el.style.top = `${targetY}px`;
      item.el.style.transform = `scale(1.15) rotate(${rand(-45, 45).toFixed(1)}deg)`;

      item.settledX = targetX;
      item.settledY = targetY;

      clearTimeout(item.returnTimer);
      item.returnTimer = setTimeout(() => {
        item.el.classList.remove('scatter');
        item.el.classList.add('settled');
        item.el.style.transform = `rotate(${rand(-18, 18).toFixed(1)}deg)`;
      }, 800);
    }

    function rebuild() {
      scene.innerHTML = '';
      items.length = 0;
      for (let i = 0; i < TOTAL; i++) {
        createItem(i);
      }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(rebuild, 150);
    });

    rebuild();








});