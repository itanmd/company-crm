const jwt = require('jsonwebtoken');
const config = require('../config/dev');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    console.log(token);
    if (!token) return res.status(401).send("Access denied. go to /signin");


    try {
        req.user = jwt.verify(token, config.JWT_SECRET);
        console.log(req.user);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).send('Access denied. go to /signin');
    }
}