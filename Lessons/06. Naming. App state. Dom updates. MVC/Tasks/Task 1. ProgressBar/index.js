const setWidth = (number) => {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${number}%`;
};

const updateProgress = (defaultNumber, delta) => {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${defaultNumber}%`;
    const btnIncrease = document.querySelector('.button-increase');
    const btnDecrease = document.querySelector('.button-decrease');

    btnIncrease.addEventListener('click', function () {
        let currentWidth = parseInt(progressBar.style.width);
        const newWidth = currentWidth + delta;
        if (newWidth > 100) {
            setWidth(100);
        }
        else {
            setWidth(newWidth);
        }
    });

    btnDecrease.addEventListener('click', function() {
        let currentWidth = parseInt(progressBar.style.width);
        const newWidth = currentWidth - delta;
        if (newWidth < 0) {
            setWidth(0);
        }
        else {
            setWidth(newWidth);
        }
    });

};

export default updateProgress;
