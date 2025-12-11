export default {
    mounted(el, binding) {
        el.__originalText = el.textContent;
        highlight(el, binding.value);
    },

    updated(el, binding) {
        highlight(el, binding.value);
    },
};

function highlight(el, value) {
    const text = el.__originalText;

    if (!value) {
        el.innerHTML = text;
        return;
    }

    const regex = new RegExp(value, 'gi');

    el.innerHTML = text.replace(regex, match => `<span>${match}</span>`);
}
