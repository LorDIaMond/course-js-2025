const BASE_URL = 'https://api.imgflip.com/get_memes';

const updateImage = (imageData, container) => {
    container.innerHTML = `<img src="${imageData.url}" alt="Мем" />`;
};

const initDom = () => {

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-warning');
    button.textContent = 'ДАЙ МНЕ МЕМ!';

    const container = document.createElement('div');
    container.classList.add('main__image-container');

    const main = document.querySelector('.main');
    main.appendChild(container);
    main.appendChild(button);
}

const addListener = () => {
    const button = document.querySelector('.btn-warning');
    const container = document.querySelector('.main__image-container');

    button.addEventListener('click', async () => {

        const response = await fetch(BASE_URL);
        const data = await response.json();

        const memes = data.data.memes;
        const randomIndex = Math.floor(Math.random() * memes.length);
        const randomMeme = memes[randomIndex];

        updateImage(randomMeme, container);
    });
}
const giveMeMeme = () => {
    initDom();
    addListener();

};

export default giveMeMeme;
