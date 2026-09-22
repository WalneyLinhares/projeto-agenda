import validator from 'validator';
import BaseValidator from "./BaseValidator";

export default class Contato extends BaseValidator{
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

        const nameInput = this.form.querySelector('#contato-nome');
        const emailInput = this.form.querySelector('#contato-email');
        const telephoneInput = this.form.querySelector('#contato-telefone');

        this.validateName(nameInput);
        this.validateEmailAndTelephone(emailInput, telephoneInput);

        if (this.errors.size === 0) {
            this.form.submit();
        }
    }

    handleInput(e) {
        const { id } = e.target;

        if (id === 'contato-nome') this.validateName(e.target);
        if (id === 'contato-email' || id === 'contato-telefone') {
            const emailInput = this.form.querySelector('#contato-email');
            const telephoneInput = this.form.querySelector('#contato-telefone');
            this.validateEmailAndTelephone(emailInput, telephoneInput);
        }
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


    validateEmailAndTelephone(inputEmail, inputTelephone) {
        if (!inputEmail || !inputTelephone) return;
        const errorContainer = this.form.querySelector('#erro-email');
        const errorContainer2 = this.form.querySelector('#erro-telefone');

        const valueEmail = inputEmail.value.trim();
        const valueTelephone = inputTelephone.value.trim();

        this.clearStatus(inputEmail, errorContainer);
        this.clearStatus(inputTelephone, errorContainer2);

        if (!valueEmail && !valueTelephone) {
            this.setError(inputEmail, errorContainer, 'emailAndTelephone', 'Pelo menos um e-mail ou telefone é obrigatório!');
            return this.setError(inputTelephone, errorContainer2, 'emailAndTelephone', 'Pelo menos um e-mail ou telefone é obrigatório!');
        }

        if (valueEmail && !validator.isEmail(valueEmail)) {
            return this.setError(inputEmail, errorContainer, 'email', 'E-mail inválido. Por favor, digite um formato correto.');
        }

        if (valueTelephone && !validator.isMobilePhone(valueTelephone, 'any')) {
            return this.setError(inputTelephone, errorContainer2, 'telefone', 'Telefone inválido. Por favor, digite um formato correto.');
        }

        this.setSuccess(inputEmail);
        this.setSuccess(inputTelephone);
    }

}