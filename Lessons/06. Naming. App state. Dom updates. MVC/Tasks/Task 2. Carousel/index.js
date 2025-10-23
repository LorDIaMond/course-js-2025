// Метод для инициализации DOM приложения
const initDOM = (state) => {
    const carousel = document.querySelector('.carousel-inner')
    for (let i = 0; i < state.images.length; i++) {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (i === 0) {
            item.classList.add('active');
        }
        carousel.appendChild(item);

        const image = document.createElement('img');
        image.classList.add('d-block', 'w-100');
        image.src = state.images[i];
        item.appendChild(image);
    }
};

// Метод для ререндера приложения
const render = (activeImageIndex) => {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        if (index === activeImageIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};

// Метод определения обработчиков событий в приложении
const addListeners = (state) => {
    const btnNext = document.querySelector('.carousel-control-next');
    const btnPrev = document.querySelector('.carousel-control-prev');

    btnNext.addEventListener('click', () => {
        state.index = (state.index + 1) % state.images.length;
        render(state.index);
    });

    btnPrev.addEventListener('click', () => {
        state.index = (state.index - 1 + state.images.length) % state.images.length;
        render(state.index);
    });
};

// Приложение
const setCarousel = (imageUrls) => {

    const state = {
        images: imageUrls,
        index: 0
    }

    initDOM(state);
    addListeners(state);
};

export default setCarousel;
