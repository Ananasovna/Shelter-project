let arrPets = [];

function getArrPets() {
    const url = './pages/main/pets.json';
    fetch(url)
        .then((res) => res.json())
        .then((data) => arrPets = [...data])
}

getArrPets();

// alert('Привет! Просьба проверить мою работу 28.04.22, немного не успела доделать. Спасибо! ^_^')


const burger = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu-cover");
const bg = document.querySelector(".menu-bg");
const body = document.querySelector("body");
const nav = document.querySelector(".burger-nav");


function openMenu () {
  menu.classList.toggle('menu-cover_active');
  burger.classList.toggle('burger-menu_active');
  bg.classList.toggle('menu-bg_active');
  body.classList.toggle('hidden');
}

burger.addEventListener("click", () => openMenu());
bg.addEventListener("click", () => openMenu());
nav.addEventListener("click", () => openMenu());


//-----------------

const BUTTON_LEFT = document.querySelector('.button-left');
const BUTTON_RIGHT = document.querySelector('.button-right');
const CAROUSEL = document.querySelector('.carousel');
const CARDS_LEFT = document.querySelector('.cards-left');
const CARDS_RIGHT = document.querySelector('.cards-right');

const generateNumberRandom = () => {  
  const active = document.querySelectorAll('.cards-active .pets-card')
  const arr = [...active]
  const arrIdActiveCard = arr.map((el) => Number(el.id))
  const arrayRandomNumber = []

  for (let i = 0; i < 3; i++) {
      let number = Math.floor(Math.random() * 8)
      while (arrIdActiveCard.includes(number)) {
          number = Math.floor(Math.random() * 8)
      }
      arrIdActiveCard.push(number)
      arrayRandomNumber.push(number)
  }

  return arrayRandomNumber
}


const createCard = (id) => {
  const pet = arrPets[id];
  let petId = pet.id;
  const card = document.createElement('div');
  card.classList.add('pets-card');
  card.id = `${petId}`;
  const img = document.createElement('img');
  img.src = `${pet.img}`;
  img.alt = `${pet.name}`;
  const h4 = document.createElement('h4');
  h4.classList.add('pets-card__title', 'title');
  h4.innerText = `${pet.name}`;
  const button = document.createElement('button');
  button.classList.add('pets-card__button', 'button');
  button.innerText = 'Learn more';

  card.appendChild(img);
  card.appendChild(h4);
  card.appendChild(button);
  return card;
    
}


const moveCarouselLeft = () => {
  CAROUSEL.classList.add('transition-left');
  BUTTON_LEFT.removeEventListener('click', moveCarouselLeft);
  BUTTON_RIGHT.removeEventListener('click', moveCarouselRight);
  const arrRandom = generateNumberRandom();
  CARDS_LEFT.innerHTML = "";

  
  let amountCards;
  document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768 ? amountCards = 2 :
      document.documentElement.clientWidth < 768 ? amountCards = 1 : amountCards = 3
  
  console.log(arrRandom);
  for (let i = 0; i < amountCards; i++) {
    const card = createCard(arrRandom[i]);
    CARDS_LEFT.appendChild(card)
}

}


const moveCarouselRight = () => {
  CAROUSEL.classList.add('transition-right');
  BUTTON_LEFT.removeEventListener('click', moveCarouselLeft);
  BUTTON_RIGHT.removeEventListener('click', moveCarouselRight);
  const arrRandom = generateNumberRandom();
  CARDS_RIGHT.innerHTML = "";

  let amountCards;
    document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768 ? amountCards = 2 :
        document.documentElement.clientWidth < 768 ? amountCards = 1 : amountCards = 3

    console.log(amountCards);
    console.log(document.documentElement.clientWidth);
    for (let i = 0; i < amountCards; i++) {
        const card = createCard(arrRandom[i]);
        CARDS_RIGHT.appendChild(card)
    }
}

BUTTON_LEFT.addEventListener('click', moveCarouselLeft);
BUTTON_RIGHT.addEventListener('click', moveCarouselRight);

CAROUSEL.addEventListener('animationend', (animation) => {
  if (animation.animationName === 'move-left' || animation.animationName === 'move-left_1280' || animation.animationName === 'move-left_768') {
    CAROUSEL.classList.remove('transition-left');
    document.querySelector('.cards-active').innerHTML = CARDS_LEFT.innerHTML;

  } else {
    CAROUSEL.classList.remove('transition-right');
    document.querySelector('.cards-active').innerHTML = CARDS_RIGHT.innerHTML;

    console.log(CARDS_RIGHT)
    console.log(document.querySelector('.cards-active'))
  }
  
  BUTTON_LEFT.addEventListener('click', moveCarouselLeft);
  BUTTON_RIGHT.addEventListener('click', moveCarouselRight);
})

//-------------------------------------------------------------

let activePets = document.querySelectorAll('.cards-active .pets-card');
const modal = document.querySelector('.modal');

const createModalWindow = async (pet) => {

  await pet;

  const div = document.createElement('div');
  div.classList.add('modal-window');

  const button = document.createElement('button');
  button.classList.add('button');
  
  const block2 = document.createElement('div')
  block2.classList.add('wrapper')

    const img = document.createElement('img')
    img.src = `${pet.img}`

    const h3 = document.createElement('h3')
    h3.classList.add('title')
    h3.innerText = pet.name

    const p = document.createElement('p')
    p.classList.add('sub-title')
    p.innerText = `${pet.type} - ${pet.breed}`

    const p2 = document.createElement('p')
    p2.classList.add('text')
    p2.innerText = pet.description

    const divSpan = document.createElement('div')

    const span = document.createElement('span')
    span.innerText = `Age: ${pet.age}`

    const span1 = document.createElement('span')
    span1.innerText = `Inoculations: ${pet.inoculations[0]}`

    const span2 = document.createElement('span')
    span2.innerText = `Diseases: ${pet.diseases[0]}`

    const span3 = document.createElement('span')
    span3.innerText = `Parasites: ${pet.parasites[0]}`

    

    block2.appendChild(h3)
    block2.appendChild(p)
    block2.appendChild(p2)
    divSpan.appendChild(span)
    divSpan.appendChild(span1)
    divSpan.appendChild(span2)
    divSpan.appendChild(span3)
    block2.appendChild(divSpan)
    div.appendChild(img)
    div.appendChild(block2)
    div.appendChild(button)
    modal.appendChild(div);

}

const closeOpenPopup = (el) => {
  if (el.target.classList[0] === 'modal') {
      modal.innerHTML = ""
      modal.classList.toggle('modal_active')
      body.classList.toggle('hidden')
  }
  if (el.target.classList[0] === 'button') {
      modal.innerHTML = ""
      modal.classList.remove('modal_active')
      body.classList.remove('hidden')
      button.classList.remove('button-bg_hover')
  }
}

const clickItem = (el) => {
  let id = el.path[0].id
  if (arrPets[id] === undefined) {
    id = el.path[1].id
  } 

  // if (arrPets[id] === undefined) {
  //   id = el.path[1].id
  //   }  

  modal.classList.add('modal_active');
  body.classList.add('hidden');

  createModalWindow(arrPets[id]).catch(err => console.log(`ERROR: ` + err))
  
}
  
CAROUSEL.addEventListener('animationend', () => {
  activePets = document.querySelectorAll('.cards-active .pets-card');
  activePets.forEach((item) => {
      item.addEventListener('click', clickItem);
  })
})

activePets.forEach((card) => {
  card.addEventListener('click', clickItem);
})

modal.addEventListener('click', closeOpenPopup);

let button = document.querySelector('.button')

setInterval(() => {
    button = document.querySelector('.button')
    if (!!button) {
        button.addEventListener('click', closeOpenPopup)

    }
}, 1000)

modal.addEventListener('mousemove', (el) => {
    if (el.target.classList[0] === 'modal') {
      button = document.querySelector('.modal-window .button')
      button.classList.add('button-bg_hover')
    } else {
      button.classList.remove('button-bg_hover')
    }
})

