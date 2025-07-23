const form = document.getElementById('contact-form');
const response = document.getElementById('form-response');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearValidation();

    if (!validateForm()) return;

    const data = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    const res = await fetch(form.action, {
        method: 'POST', body: data, headers: {'Accept': 'application/json'}
    });

    if (res.ok) {
        response.innerHTML = successAlert(`Your message has been sent successfully. I'll get back to you soon!`);
        form.reset();
    } else {
        response.innerHTML = errorAlert('Something went wrong. Please try again or contact me via email.');
    }

    removeAlert();
    submitBtn.disabled = false;
});

function validateForm() {
    let valid = true;

    ['name', 'email', 'message'].forEach(id => {
        const input = document.getElementById(id);
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            valid = false;
        } else if (id === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
            input.classList.add('is-invalid');
            valid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return valid;
}

function clearValidation() {
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

function successAlert(message) {
    return `
    <div class="alert alert-success d-flex align-items-center" role="alert">
        <i class="fa-solid fa-circle-check me-2"></i>
        <div>${message}</div>
    </div>`;
}

function errorAlert(message) {
    return `
    <div class="alert alert-danger d-flex align-items-center" role="alert">
        <i class="fa-solid fa-triangle-exclamation me-2"></i>
        <div>${message}</div>
    </div>`;
}

function removeAlert(time = 6000) {
    setTimeout(() => {
        response.innerHTML = '';
    }, time);
}
