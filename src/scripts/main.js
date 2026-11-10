'use strict';

// Theme toggle (persisted)
const root = document.documentElement;
const saved = localStorage.getItem('unifest-theme');
if (saved) root.dataset.theme = saved;

document.querySelector('.toggle')?.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('unifest-theme', next);
});

// Mobile nav
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.nav');
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});

// Modals (native <dialog>): data-modal-open="id"
document.addEventListener('click', e => {
  const opener = e.target.closest('[data-modal-open]');
  if (opener)
    return document.getElementById(opener.dataset.modalOpen)?.showModal();

  const closer = e.target.closest('[data-modal-close]');
  if (closer) return closer.closest('dialog').close();

  if (e.target.matches('dialog.modal')) e.target.close(); // backdrop click
});
