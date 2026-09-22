const Login = require("../models/LoginModel");

exports.index = (req, res) => {
    if (req.session.user) {
        return res.render('login-logado');
    }

    return res.render('login');
}

exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            return req.session.save(() => res.redirect('/login'));
        }

        req.flash('success', 'Você fez login com sucesso!');
        req.session.user = login.user;

        if (req.body.rememberMe) {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
        } else {
            req.session.cookie.expires = false;
        }

        return req.session.save(() => res.redirect('/login'));
    } catch (err) {
        throw err;
    }
};

exports.logout = function (req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};