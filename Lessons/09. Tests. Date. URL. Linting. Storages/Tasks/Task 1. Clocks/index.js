const setRotations = () => {
    const hourEl = document.querySelector('.clocks__hour');
    const minuteEl = document.querySelector('.clocks__minute');
    const secondEl = document.querySelector('.clocks__second');

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = hours % 12 === 0 ? 360 : hours * 30;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    hourEl.style.transform = `rotate(${hourAngle}deg)`;
    minuteEl.style.transform = `rotate(${minuteAngle}deg)`;
    secondEl.style.transform = `rotate(${secondAngle}deg)`;
};

const runClocks = () => {
    setRotations();

    setInterval(setRotations, 1000);
};

export default runClocks;