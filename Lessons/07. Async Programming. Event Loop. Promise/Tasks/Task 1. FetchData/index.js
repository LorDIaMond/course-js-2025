const fetchData = () => {
    const form = document.querySelector('.form-control');
    let timer = null;

    form.addEventListener('input', (event) => {
        let text = event.target.value.trim();

        if (timer !== null) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            alert(`Ищем: ${text}`);
            timer = null;
        }, 1000);
    });
};

export default fetchData;
