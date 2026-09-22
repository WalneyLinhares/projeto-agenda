const Register = require('../models/RegisterModel');

exports.index = (req, res) => {
    res.render('cadastro');
}

exports.register = async function (req, res) {
    try {
        const register = new Register(req.body);
        await register.register();

        if (register.errors.length > 0) {
            req.flash('errors', register.errors);
            return req.session.save(() => res.redirect('/cadastro'));
        }

        req.flash('success', 'Cadastrado com sucesso!');
        return req.session.save(() => res.redirect('/login'));
    } catch (err) {
        throw err;
    }
};