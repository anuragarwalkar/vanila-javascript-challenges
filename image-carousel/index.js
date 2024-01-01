const images = [
    { url: 'https://source.unsplash.com/ljEXet84nL8', attributes: [{ key: 'data-active', value: '' }] },
    { url: 'https://source.unsplash.com/fZy2Ws4kc7Q', attributes: [] },
    { url: 'https://source.unsplash.com/VSiWvrAY1F8', attributes: [] },
    { url: 'https://source.unsplash.com/RqfFauPXJx0', attributes: [] },
    { url: 'https://source.unsplash.com/hn1_U1yCNAQ', attributes: [] }
]

const generateCarousel = () => {
    const imageCarousel = document.getElementById('image-carousel');
    const ul = document.createElement('ul');
    ul.setAttribute('data-slides', '');
    imageCarousel.appendChild(ul);

    for (let i = 0; i < images.length; i++) {
        const li = document.createElement('li');
        const img = document.createElement('img');

        li.className = 'slide';

        images[i].attributes.forEach(attribute => {
            li.setAttribute(attribute.key, attribute.value)
        });

        img.src = images[i].url;

        li.appendChild(img);
        ul.appendChild(li);
    }
}

const onClickCarouselButton = (event) => {
    const offset = event.target.getAttribute('data-carousel-button') === 'next' ? 1 : -1

    const slides = event.target.closest('[data-carousel]').querySelector('[data-slides]');
    const childrens = [...slides.children];
    const activeIndex = childrens.findIndex((element) => element.getAttribute('data-active') != null);

    if (activeIndex >= 0 && activeIndex < childrens.length - 1) {
        slides.children[activeIndex + 1].setAttribute('data-active', '');
        delete slides.children[activeIndex].removeAttribute('data-active');
    } else {
        slides.children[0].setAttribute('data-active', '');
        slides.children[activeIndex].removeAttribute('data-active');
        // Other way
        // slides.children[0].dataset.active = true;
        // delete slides.children[activeIndex].dataset.active;
    }
}

const allCarouselButtons = document.querySelectorAll('[data-carousel-button]');

allCarouselButtons.forEach(b => b.addEventListener('click', onClickCarouselButton))

window.onload = generateCarousel;

