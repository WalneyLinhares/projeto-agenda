const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const RegisterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    terms: {type: Boolean, required: true, default: false},
}, {timestamps: true});

const RegisterModel = mongoose.model('Registers', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.validate();
        if (this.errors.length > 0) return;

        await this.userExists();
        if (this.errors.length > 0) return;

        this.body.password = await bcrypt.hash(this.body.password, 12)
        const newUser = new RegisterModel(this.body);
        this.user = await newUser.save();
    }

    async userExists() {
        const user = await RegisterModel.findOne({email: this.body.email});

        if (user) {
            this.errors.push('Este e-mail já está cadastrado.');
        }
    }

    validate() {
        this.cleanUp();
        this.validateName();
        this.validateEmail();
        this.validatePassword();
        this.validateTerms();
    }

    validateName() {
        if (!this.body.name || this.body.name === '') {
            this.errors.push('Nome é obrigatorio');
        } else if (this.body.name.length < 3 || this.body.name.length > 30) {
            this.errors.push('O nome precisa ter entre 3 e 30 caracteres.');
        }
    }

    validateEmail() {
        if (!this.body.email || this.body.email === '') {
            this.errors.push('E-mail é obrigatório.');
        } else if (!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido. Por favor, digite um formato correto.');
        }
    }

    validatePassword() {
        if (!this.body.password || this.body.password.length < 6 || this.body.password.length > 30) {
            this.errors.push('A senha precisa ter pelo menos 6 e 30 caracteres.');
        } else if (!/[A-Z]/.test(this.body.password)) {
            this.errors.push('A senha precisa ter pelo menos uma letra maiúscula.');
        } else if (!/[0-9]/.test(this.body.password)) {
            this.errors.push('A senha precisa ter pelo menos um número.');
        }
    }

    validateTerms() {
        if (!this.body.terms) {
            this.errors.push('Você precisa aceitar os termos de uso.');
        }
    }

    cleanUp() {
        if (typeof this.body !== 'object' || this.body === null) {
            this.body = {};
        }

        const acceptedTerms = this.body.terms === 'on' || this.body.terms === true;

        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            } else {
                this.body[key] = this.body[key].trim();
            }
        }

        this.body = {
            name: this.body.name,
            email: this.body.email,
            password: this.body.password,
            terms: acceptedTerms,
        };
    }
}

module.exports = Register;