const setToDo = () => {
    const main = document.querySelector('.to-do__main');
    const tasks = document.querySelector('.to-do__tasks');
    const form = document.createElement('input');
    form.type = 'text';
    form.className = 'form-control-lg';
    main.appendChild(form);

    const btnDanger = document.createElement('button');
    btnDanger.className = 'btn-danger';
    main.appendChild(btnDanger);

    const btnSuccess = document.createElement('button');
    btnSuccess.className = 'btn-success';
    main.appendChild(btnSuccess);

    btnDanger.addEventListener('click', function() {
        const span = document.createElement('span');
        span.textContent = form.value;
        span.setAttribute('data-type', 'planned');
        span.addEventListener('click', function() {
            this.remove();
        });
        tasks.appendChild(span);

        form.value = '';
    });

    btnSuccess.addEventListener('click', function() {
        const span = document.createElement('span');
        span.textContent = form.value;
        span.setAttribute('data-type', 'completed');
        span.addEventListener('click', function() {
            this.remove();
        });
        tasks.appendChild(span);

        form.value = '';
    });

};

export default setToDo;