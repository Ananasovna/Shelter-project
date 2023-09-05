const burger = document.querySelector(".burger-menu");
const burgerOpened = document.querySelector(".burger-menu_opened");
const menu = document.querySelector(".menu-cover");
const bg = document.querySelector(".menu-bg");
const body = document.querySelector("body");
const nav = document.querySelector(".burger-nav");



console.log(burger);

function openMenu () {
  console.log("click");
  menu.classList.toggle('menu-cover_active');
  burger.classList.toggle('burger-menu_active');
  burgerOpened.classList.toggle('burger-menu_active');
  bg.classList.toggle('menu-bg_active');
  body.classList.toggle('hidden');
}

burger.addEventListener("click", () => openMenu());
burgerOpened.addEventListener("click", () => openMenu());
bg.addEventListener("click", () => openMenu());
nav.addEventListener("click", () => openMenu());