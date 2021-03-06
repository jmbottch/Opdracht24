const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {return res.status(401).send('Aces denied. Token not provided');}
     else try {
        const payload = jwt.verify(token, 'AardappeLKrokeT');
        console.log('Payload gotten from token:\n', payload);
        req.user = {
            id: payload.userServer.id,
            email: payload.userServer.email
        };
        console.log('User created from payload:\n', req.user);
        next();
    } catch (ex) {
        res.status(400).send('Aces denied. Invalid token');
    }
}

module.exports = auth;