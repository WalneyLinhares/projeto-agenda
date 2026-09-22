export default class BaseValidator {
    constructor() {
        this.errors = new Set();
    }

    clearStatus(input, errorContainer) {
        input.classList.remove('is-invalid', 'is-valid');
        if (errorContainer) errorContainer.textContent = '';
    }

    setError(input, errorContainer, errorKey, message) {
        input.classList.add('is-invalid');
        if (errorContainer) errorContainer.textContent = message;
        this.errors.add(errorKey);
    }

    setSuccess(input) {
        input.classList.add('is-valid');
    }

    toggleReqState(element, isValid) {
        console.log(element, isValid);
        if (!element) return;
        element.className = isValid ? 'text-success' : 'text-danger';
    }
}