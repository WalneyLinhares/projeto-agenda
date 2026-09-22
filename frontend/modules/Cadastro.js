import validator from 'validator';
import BaseValidator from "./BaseValidator";

export default class Cadastro extends BaseValidator {
    constructor(formClass) {
        super();
        this.form = document.querySelector(formClass);
    }

    init() {
        if (!this.form) return;
        this.events();
    }

    events() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.addEventListener('input', (e) => this.handleInput(e));
        this.form.addEventListener('change', (e) => this.handleInput(e));

        const termsInput = this.form.querySelector('#cadastro-terms');
        termsInput?.addEventListener('change', (e) => this.validateTerms(e.target));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.errors.clear();

        const nameInput = this.form.querySelector('#cadastro-nome');
        const emailInput = this.form.querySelector('#cadastro-email');
        const passwordInput = this.form.querySelector('#cadastro-senha');
        const termsInput = this.form.querySelector('#cadastro-terms');

        this.validateName(nameInput);
        this.validateEmail(emailInput);
        this.validatePassword(passwordInput);
        this.validateTerms(termsInput);

        if (this.errors.size === 0) {
            this.form.submit();
        }
    }

    handleInput(e) {
        const { id } = e.target;

        if (id === 'cadastro-nome') this.validateName(e.target);
        if (id === 'cadastro-email') this.validateEmail(e.target);
        if (id === 'cadastro-senha') this.validatePassword(e.target);
    }


    validateName(input) {
        if (!input) return;
        const errorContainer = this.form.querySelector('#erro-nome');
        const value = input.value.trim();

        this.clearStatus(input, errorContainer);

        if (!value) {
            return this.setError(input, errorContainer, 'nome', 'Nome é obrigatório!');
        }

        if (value.length < 3 || value.length > 30) {
            return this.setError(input, errorContainer, 'nome', 'O nome precisa ter entre 3 e 30 caracteres.');
        }

        this.setSuccess(input);
    }

    validateEmail(input) {
        if (!input) return;
        const errorContainer = this.form.querySelector('#erro-email');
        const value = input.value.trim();

        this.clearStatus(input, errorContainer);

        if (!value) {
            return this.setError(input, errorContainer, 'email', 'E-mail é obrigatório!');
        }

        if (!validator.isEmail(value)) {
            return this.setError(input, errorContainer, 'email', 'E-mail inválido. Por favor, digite um formato correto.');
        }

        this.setSuccess(input);
    }

    validatePassword(input) {
        if (!input) return;
        const value = input.value;

        const reqs = {
            length: this.form.querySelector('#req-tamanho'),
            upper: this.form.querySelector('#req-maiuscula'),
            number: this.form.querySelector('#req-numero')
        };

        const isLengthValid = value.length >= 6 && value.length <= 30;
        const isUpperValid = /[A-Z]/.test(value);
        const isNumberValid = /[0-9]/.test(value);

        this.toggleReqState(reqs.length, isLengthValid);
        this.toggleReqState(reqs.upper, isUpperValid);
        this.toggleReqState(reqs.number, isNumberValid);

        const isPasswordValid = isLengthValid && isUpperValid && isNumberValid;

        input.classList.remove('is-invalid', 'is-valid');

        if (!isPasswordValid) {
            input.classList.add('is-invalid');
            this.errors.add('senha');
        } else {
            input.classList.add('is-valid');
        }
    }

    validateTerms(input) {
        if (!input) return;

        input.classList.remove('is-invalid', 'is-valid');

        if (!input.checked) {
            input.classList.add('is-invalid');
            this.errors.add('termos');
            return;
        }

        input.classList.add('is-valid');
    }
}