import WatchJS from '../../helpers/melanke-watchjs.js';

const { watch } = WatchJS;

const initDOM = () => {
    return {
        button: document.querySelector('.btn'),
        input: document.querySelector('.form-control'),
        news: document.querySelector('.news__container')
    }
}
const render = (news, init) => {
    init.news.innerHTML = '';
    news.forEach(item => {
        const el = document.createElement('div');
        el.className = 'news__news-element';

        const dateEl = document.createElement('h5');
        dateEl.textContent = item.date;

        const textEl = document.createElement('div');
        textEl.textContent = item.text;

        el.append(dateEl, textEl);
        init.news.append(el);
    });
}

const addListeners = (state, init) => {

    init.button.addEventListener('click', () => {
        const text = init.input.value;
        state.news.unshift({
            text: text,
            date: new Date().toLocaleString()
        });
        init.input.value = '';
    });
}

const setNewsMaker = () => {

    const state = {
        news: []
    };
    const init = initDOM();

    addListeners(state, init);

    watch(state, 'news', () => {
        render(state.news, init);
    });

    render(state.news, init);
};

export default setNewsMaker;
