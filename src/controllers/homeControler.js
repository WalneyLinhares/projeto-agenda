const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const user = req.session.user || null;
    const loginId = user?._id;
    const contatos = await Contato.searchContacts(loginId);

    res.render('index', { user, contatos });
}