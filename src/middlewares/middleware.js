exports.middlewareGlobal = (req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequiredMiddleware = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}

exports.notFoundHandler = (req, res, next) => {
    res.status(404).render('404');
};

exports.globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(500).render('500', {
        user: (req.session && req.session.user) ? req.session.user : null,
        errors: [],
        success: []
    });
};