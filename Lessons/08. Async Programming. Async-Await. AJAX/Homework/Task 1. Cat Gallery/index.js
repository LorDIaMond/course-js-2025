// Импорт axios ниже работает только в node.js и нужен для тестирования
// Для отслеживания решения в браузере axios добавляется на страницу в виде скрипта:
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
// Выполните задание, отслеживая изменения в браузере,
// после чего раскомментируйте строку с импортом для прохождения тестов

// import axios from 'axios';

const setCatGallery = async () => {
    const container = document.querySelector('.main__container');
    const url = 'https://api.thecatapi.com/v1/images/search';

    const promises = [];
    for (let i = 0; i < 10; i++) {
        promises.push(fetch(url).then(response => response.json()));
    }
    const results = await Promise.all(promises);

    results.forEach(arr => {
        const img = document.createElement('img');
        img.src = arr[0].url;
        container.appendChild(img);
    });

    return 'cat gallery is ready!';
};

export default setCatGallery;
