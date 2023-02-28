function editNav() {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

function reportWindowSize() {
  console.log(window.innerWidth);
}

window.onresize = reportWindowSize;

// DOM Elements
const windowWidth = window.innerWidth;
const navbarBtn = document.querySelector('#navbar-menu');
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');

// launch navbar menu
navbarBtn.addEventListener('click', editNav);

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
