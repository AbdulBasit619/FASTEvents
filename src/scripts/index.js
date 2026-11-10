'use strict';

// COUNTDOWN
const countdown = document.querySelector('.countdown');
if (countdown) {
  const target = new Date(countdown.dataset.target).getTime();
  const units = {
    days: countdown.querySelector('[data-unit="days"]'),
    hours: countdown.querySelector('[data-unit="hours"]'),
    mins: countdown.querySelector('[data-unit="mins"]'),
    secs: countdown.querySelector('[data-unit="secs"]'),
  };
  const pad = n => String(n).padStart(2, '0');

  const tick = () => {
    const diff = Math.max(0, target - Date.now());
    units.days.textContent = pad(Math.floor(diff / 864e5));
    units.hours.textContent = pad(Math.floor((diff / 36e5) % 24));
    units.mins.textContent = pad(Math.floor((diff / 6e4) % 60));
    units.secs.textContent = pad(Math.floor((diff / 1e3) % 60));
  };
  tick();
  setInterval(tick, 1000);
}

// CAROUSEL: LAST WINNERS
const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('.carousel__track');
  const total = track.children.length;
  let index = 0;
  let timer;

  const go = i => {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
  };
  const auto = () => {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 5000);
  };

  carousel.querySelector('[data-dir="next"]').addEventListener('click', () => {
    go(index + 1);
    auto();
  });
  carousel.querySelector('[data-dir="prev"]').addEventListener('click', () => {
    go(index - 1);
    auto();
  });
  auto();
}

// CTA Form
const form = document.querySelector('#cta-form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const email = form.elements.email;
  const error = form.querySelector('.form__error');
  const valid =
    form.elements.name.value.trim() && /^\S+@\S+\.\S+$/.test(email.value);
  email.setAttribute('aria-invalid', !valid);
  error.textContent = valid ? '' : 'Enter your name and a valid email.';
  if (!valid) return;
  form.reset();
  form.querySelector('.form__success').hidden = false;
});
