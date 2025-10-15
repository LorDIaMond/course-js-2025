const createButton = () => {
    const container = document.querySelector('.button-container');
    const description = document.querySelector('.description');
    const button = document.createElement('button');
    
    button.textContent = 'Кнопка';
    button.type = 'button';
    button.className = 'btn btn-primary';
    button.addEventListener('click', () => {
        description.innerHTML = '';
        const span = document.createElement('span');
        span.className = 'description span';
        span.textContent = 'Текст вставлен!';
        description.appendChild(span);
    });

    container.appendChild(button);
};

export default createButton;
