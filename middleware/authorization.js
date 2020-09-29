const jwt = require('jsonwebtoken');
const config = require('config');

function authorization(req, res, next) {
    const token = req.header('x-login-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('invalid token.');
    }
}


module.exports = authorization;