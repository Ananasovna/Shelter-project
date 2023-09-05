const BUTTON_LEFT = document.querySelector('.button-left');
const BUTTON_RIGHT = document.querySelector('.button-right');
const CAROUSEL = document.querySelector('.carousel');
const CARDS_LEFT = document.querySelector('.cards-left');
const CARDS_RIGHT = document.querySelector('.cards-right');

let arrPets = [];

function getArrPets() {
    const url = './pets_pets.json';
    fetch(url)
        .then((res) => res.json())
        .then((data) => arrPets = [...data])
}

getArrPets();

let clickItem = () => {}

const first = document.querySelector('.first-button');
const left = document.querySelector('.left-button');
const active = document.querySelector('.current-button');
const right = document.querySelector('.right-button');
const last = document.querySelector('.last-button');

let page = 1;
let cards = document.querySelector('.cards-conatiner');
let card = document.querySelectorAll('.pets-card');
let arrActivePets = [];
let arrLists = [];

const createRandomList = () => {
  let arrList = []
    for (let i = 0; i < 8; i++) {
        let number = Math.floor(Math.random() * 8)
        while (arrList.includes(number)) {
            number = Math.floor(Math.random() * 8)
        }
        arrList.push(number)
    }
    return arrList
}

for (let i = 0; i < 5; i++) {
  arrLists.push(createRandomList())
}
card.forEach((el) => {
  arrActivePets.push(Number(el.id))
})
console.log(arrActivePets)
arrLists.unshift(arrActivePets);

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

const hidden = (page) => {
  // console.log(page)
  if (page >= maxPage + 1) {
      right.classList.add('pets__button_inactive')
      last.classList.add('pets__button_inactive')
      right.removeEventListener('click', rightClick)
      last.removeEventListener('click', lastClick)
  } else {
      right.classList.remove('pets__button_inactive')
      last.classList.remove('pets__button_inactive')
      right.addEventListener('click', rightClick)
      last.addEventListener('click', lastClick)
  }
  if (page === 1) {
      first.classList.add('pets__button_inactive')
      left.classList.add('pets__button_inactive')
      left.removeEventListener('click', leftClick)
      first.removeEventListener('click', firstClick)
  } else {
      first.classList.remove('pets__button_inactive')
      left.classList.remove('pets__button_inactive')
      left.addEventListener('click', leftClick)
      first.addEventListener('click', firstClick)
  }
}
const reRender = (localPage) => {
  active.textContent = `${localPage}`
  hidden(localPage)
  cards.innerHTML = "";

  let amountCards;
  document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768 ? amountCards = 6 :
      document.documentElement.clientWidth < 768 ? amountCards = 3 : amountCards = 8
  for (let i = 0; i < amountCards; i++) {
      cards.appendChild(createCard(arrLists[localPage - 1][i]))
  }

  arrActive = document.querySelectorAll('.pets-card')
  arrActive.forEach((item) => {
      item.addEventListener('click', clickItem)
  })
  page = localPage;
}

function render() {
  cards.innerHTML = "";
  let arrList = createRandomList()
  arrLists.unshift(arrList)
  let amountCards;
  document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768 ? amountCards = 6 :
      document.documentElement.clientWidth < 768 ? amountCards = 3 : amountCards = 8

  for (let i = 0; i < amountCards; i++) {
      cards.appendChild(createCard(arrList[i]))
  }

  arrActive = document.querySelectorAll('.pets-card')
  arrActive.forEach((item) => {
      item.addEventListener('click', clickItem)
  })
}

window.onload = function () {
  setTimeout(() => {
      render()
  }, 100)
};

let maxPage;
document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768 ? maxPage = 7 :
    document.documentElement.clientWidth < 768 ? maxPage = 15 : maxPage = 5
console.log(maxPage)
window.addEventListener('resize', (el) => {
    let width = el.path[0].innerWidth
    width < 1280 && width >= 768 ? maxPage = 7 :
        width < 768 ? maxPage = 15 : maxPage = 5
    hidden(page)

    if (page > maxPage + 1) {
      reRender(maxPage + 1)
  }
})

for (let i = 0; i < 15; i++) {
    arrLists.push(createRandomList())
}

const rightClick = () => {
  nextList('+')
}
const leftClick = () => {
  nextList('-')
}
const lastClick = () => {
  nextList('++')
}
const firstClick = () => {
  nextList('--')
}

const nextList = (props) => {
  let localPage
  localPage = page;
  props === '+' ? ++localPage :
      props === '-' ? --localPage :
          props === '--' ? localPage = 1 : localPage = maxPage + 1;

  reRender(localPage)

}

right.addEventListener('click', rightClick)
last.addEventListener('click', lastClick)

