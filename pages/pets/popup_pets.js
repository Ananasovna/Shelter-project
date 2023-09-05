let activePets = document.querySelectorAll('.pets-card');
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

clickItem = (el) => {
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