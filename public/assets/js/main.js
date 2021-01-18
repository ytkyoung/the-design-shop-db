// console.log("let's go!");

// Burger Navi
const nav = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const links = nav.querySelectorAll('a');
const logo = document.querySelector('#logo');

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
  logo.classList.toggle('logo-top');
  burger.classList.toggle('toggle');
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    logo.classList.toggle('logo-top');
    burger.classList.toggle('toggle');
  });
});
