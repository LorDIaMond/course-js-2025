let count = 0;
const setCounter = () => {
    const mainDiv = document.querySelector('.main');
    let button = mainDiv.querySelector('button');
    if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.onclick = setCounter;
        mainDiv.appendChild(button);
        count = 0;
        button.textContent = `Количество нажатий: ${count}`;
        return;
    }
    count++;
    button.textContent = `Количество нажатий: ${count}`;
};

export default setCounter;
