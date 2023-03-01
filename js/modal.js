function editNav() {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const navbarBtn = document.querySelector('#navbar-menu');
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const inputVals = document.querySelectorAll('.text-control');
const modalForm = document.getElementById('reserve');
const modalCloseBtn = document.querySelectorAll('.close');
const formData = document.querySelectorAll('.formData');

// launch navbar menu
navbarBtn.addEventListener('click', editNav);

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
}

function checkUserData() {
  inputVals.forEach((data) => {
    data.addEventListener('keyup', () => {
      console.log(data.value);
    });
  });
}

function validateForm() {
  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // process data and submit a request manually
  });
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// close modal
modalCloseBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    modalbg.style.display = 'none';
  })
);

// close modal on keypress esc
document.addEventListener('keydown', ({ key }) => {
  if (key === 'Escape') {
    modalbg.style.display = 'none';
  }
});

checkUserData();
validateForm();
