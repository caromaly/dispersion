document.addEventListener("DOMContentLoaded", function (){

   let swaping = document.querySelector(".image1") ; 
   let originimg = "./images/fififufu.gif" ;
   let hoverimg = "./images/fififufu2.gif" ;

   swaping.addEventListener("mouseenter", function() {
    swaping.src = hoverimg;

    swaping.addEventListener("mouseleave", function () {
    swaping.src = originimg;
   
    })



    
   });


   let swaping2 = document.querySelector(".image2") ; 
   let originimg2 = "./images/fififufu2.gif" ;
   let hoverimg2 = "./images/fififufu.gif" ;

   swaping2.addEventListener("mouseenter", function() {
    swaping2.src = hoverimg2;

    swaping2.addEventListener("mouseleave", function () {
    swaping2.src = originimg2;
    
   })

 });





 let arr = [
    "./images/im1.jpeg",
    "./images/im2.jpeg",
    "./images/im3.jpeg",
    "./images/im4.jpeg",
    "./images/im5.jpeg",
 ];

 
 let block = document.querySelector(".move_block");

 block.addEventListener("mousemove", function () {

    let rand = Math.floor(Math.random()* arr.length);
    let element = arr[rand];  // paндомный элемент из массива

    let {top , left} = block.getBoundingClientRect();
    let img = document.createElement("img");
    img.src =  element;
    img.style.position = "absolute";
    img.style.left = `${e.clientX - left}px `;
    img.style.top = `${e.clientY - top}px `;
    img.style.width = `100px`;
    img.style.height = `100px`;

    block.appendChild(img);
    
    setTimeout ((img.style.opacity = '0') ,500);
    setTimeout (img.remove () ,500);








    
 });











});