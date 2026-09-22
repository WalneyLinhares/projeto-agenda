const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
    return res.render('contato', {
        contato: {}
    });
}

exports.contato = async function (req, res) {
    try {
        const contato = new Contato({...req.body, userId: req.session.user._id});
        await contato.contact();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            return req.session.save(() => res.redirect('/contato'));
        }

        req.flash('success', 'Contato salvo com sucesso!');
        return req.session.save(() => res.redirect(`/contato/${contato.newContato._id}`));
    } catch (err) {
        throw err;
    }
};

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('404');

    try {
        const contato = await Contato.searchId(req.params.id);

        if (!contato) return res.render('404');

        res.render('contato', { contato });
    } catch (err) {
        throw err;
    }
}

exports.edit = async function (req, res) {
    try {
        if (!req.params.id) return res.render('404');

        const contato = new Contato({...req.body, userId: req.session.user._id});
        await contato.editContact(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            return req.session.save(() => res.redirect(`/contato/${req.params.id}`));
        }

        req.flash('success', 'Contato editado com sucesso!');
        return req.session.save(() => res.redirect(`/contato/${contato.newContato._id}`));

    } catch (err) {
        throw err;
    }
}

exports.delete = async function (req, res) {
    try {
        if (!req.params.id) return res.render('404');

        const contato = await Contato.deleteId(req.params.id);

        if (!contato) return res.render('404');

        req.flash('success', 'Contato deletado com sucesso!');
        return req.session.save(() => res.redirect(`/`));
    } catch (err) {
        throw err;
    }
}