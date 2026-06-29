import "./style.css";
// import "./three/scene.js";


const header = document.querySelector("header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



document.addEventListener("DOMContentLoaded", () => {


    const menuBtn = document.querySelector(".menu-btn");

    const mobileMenu = document.querySelector(".mobile-menu");


    if(menuBtn && mobileMenu){


       menuBtn.addEventListener("click", () => {


    mobileMenu.classList.toggle("active");


    menuBtn.classList.toggle("close");


});


    }


});

const reveals = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }


    });


},{threshold:.15});



reveals.forEach(section=>{

    observer.observe(section);

});