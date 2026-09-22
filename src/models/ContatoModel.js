const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    surname: { type: String, required: false, default: null },
    email: { type: String, required: false, default: null },
    telephone: { type: String, required: false, default: null },
}, { timestamps: true });

const ContatoModel = mongoose.model('Contatos', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.newContato = null;
    }

    async contact() {
        this.validate();
        if (this.errors.length > 0) return;

        this.newContato = new ContatoModel(this.body);
        await this.newContato.save();
    }

    static async searchId(id) {
        if (typeof id !== 'string') return

        return ContatoModel.findById(id);
    }

    static async deleteId(id) {
        if (typeof id !== 'string') return

        return ContatoModel.findOneAndDelete({ _id: id });
    }

    static async searchContacts(userId) {
        return ContatoModel.find({ userId: userId }).sort({ createdAt: -1 });
    }

    async editContact(id) {
        if (typeof id !== 'string') return

        this.validate();
        if (this.errors.length > 0) return;

        this.newContato = await ContatoModel.findByIdAndUpdate(id, this.body, { returnDocument: 'after' });
    }

    validate() {
        this.cleanUp();
        this.validateName();
        this.validateNumberAndEmail()
    }

    validateName() {
        if (!this.body.name) {
            this.errors.push('Nome é obrigatorio');
        }
    }

    validateNumberAndEmail() {
        if (!this.body.email && !this.body.telephone) {
            this.errors.push('Pelo menos um e-mail ou telefone é obrigatorio');
        }

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail é inválido.');
        }

        if (this.body.telephone && !validator.isMobilePhone(this.body.telephone, 'any')) {
            this.errors.push('Formato do telefone é inválido');
        }
    }

    cleanUp() {
        if (typeof this.body !== 'object' || this.body === null) {
            this.body = {};
        }

        for (const key in this.body) {
            if (key === 'userId') continue;

            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            } else {
                this.body[key] = this.body[key].trim();
            }
        }

        this.body = {
            userId: this.body.userId,
            name: this.body.name,
            surname: this.body.surname,
            telephone: this.body.telephone,
            email: this.body.email,
        };
    }
}

module.exports = Contato;