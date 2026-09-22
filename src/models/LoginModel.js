const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    terms: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const LoginModel = mongoose.model('Register', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.validate();
        if (this.errors.length > 0) return;

        await this.userExists();
        if (this.errors.length > 0) return;

        if (!bcrypt.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Usuário ou senha incorreta');
        }
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário não existe.');
        }
    }

    validate() {
        this.cleanUp();
        this.validateEmail();
    }

    validateEmail()  {
        if (!this.body.email || this.body.email === '') {
            this.errors.push('E-mail é obrigatório.');
        }

        else if (!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido. Por favor, digite um formato correto.');
        }
    }

    cleanUp() {
        if (typeof this.body !== 'object' || this.body === null) {
            this.body = {};
        }

        const rememberMe = this.body.rememberMe === 'on' || this.body.rememberMe === true;


        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            } else {
                this.body[key] = this.body[key].trim();
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
            rememberMe: rememberMe,
        };
    }
}

module.exports = Login;