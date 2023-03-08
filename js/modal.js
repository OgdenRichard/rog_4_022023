/* eslint-disable import/extensions */
import FormController from './formcontroller.js';

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

// launch navbar menu
navbarBtn.addEventListener('click', editNav);

const modalController = new FormController();
modalController.runForm();
