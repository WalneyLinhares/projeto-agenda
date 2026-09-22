import validator from 'validator';
import BaseValidator from "./BaseValidator";

export default class Login extends BaseValidator{
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
    }

    handleSubmit(e) {
        e.preventDefault();
        this.errors.clear();

        const emailInput = this.form.querySelector('#login-email');
        const passwordInput = this.form.querySelector('#login-senha');

        this.validateEmail(emailInput);
        this.validatePassword(passwordInput);

        if (this.errors.size === 0) {
            this.form.submit();
        }
    }

    handleInput(e) {
        const { id } = e.target;

        if (id === 'login-email') this.validateEmail(e.target);
        if (id === 'login-senha') this.validatePassword(e.target);
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
        const errorContainer = this.form.querySelector('#erro-senha');
        const value = input.value.trim();

        this.clearStatus(input, errorContainer);

        if (!value) {
            return this.setError(input, errorContainer, 'senha', 'Senha é obrigatório!');
        }

        if (value.length < 6 || value.length > 30) {
            return this.setError(input, errorContainer, 'senha', 'Senha precisa ter pelo menos 6 e 30 caracteres.');
        }

        this.setSuccess(input);
    }
}