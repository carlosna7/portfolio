const galleryMain = document.querySelector('#galleryMain');
const galleryLabel = document.querySelector('#galleryLabel');
const galleryThumbs = document.querySelector('#galleryThumbs');
const galleryPrev = document.querySelector('#galleryPrev');
const galleryNext = document.querySelector('#galleryNext');

const slides = [...galleryMain.querySelectorAll('.project-gallery__slide')];
const thumbs = [...galleryThumbs.querySelectorAll('.project-gallery__thumb')];

let current = 0;

const showSlide = (index) => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    thumbs.forEach((thumb, i) => thumb.classList.toggle('is-active', i === current));
    galleryLabel.textContent = thumbs[current].querySelector('span').textContent;
};

thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => showSlide(i));
});

galleryPrev.addEventListener('click', () => showSlide(current - 1));
galleryNext.addEventListener('click', () => showSlide(current + 1));
