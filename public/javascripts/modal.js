'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  let modals = [];

  let targetNodes = document.querySelectorAll('[data-modal-target]');
  targetNodes.forEach((element) => {
    modals.push(new Modal(element.dataset.modalTarget));
  });
});

class Modal {
  /** @param {String} elementId */
  constructor(elementId) {
    this.elementId = elementId;

    const showNodes = document.querySelectorAll('[data-modal-show]');
    showNodes.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        this.show();
      });
    });

    const hideNodes = document.querySelectorAll('[data-modal-hide]');
    hideNodes.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        this.hide();
      });
    });
  }

  show() {
    let modal = document.getElementById(this.elementId);
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
    }, 20);
  }

  hide() {
    let modal = document.getElementById(this.elementId);
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 500);
  }
}
