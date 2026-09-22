const rateLimit = require('express-rate-limit');

const createLimiter = (redirectPath, options = {}) => {
    return rateLimit({
        windowMs: options.windowMs || 60 * 60 * 1000, // 1 HORA
        max: options.max || 5,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            req.flash('errors', options.message || 'Você está fazendo isso muito rápido. Espere um momento.');
            res.redirect(redirectPath);
        },
    });
};

exports.rateLimitContato = createLimiter('/contato', {
    windowMs: 60 * 1000, // 1 MINUTO
    max: 5,
    message: 'Você está fazendo isso muito rápido. Espere um momento.'
});

exports.rateLimitRegister = createLimiter('/cadastro');
exports.rateLimitLogin = createLimiter('/login');
exports.rateLimitContato = createLimiter('/contato');
