require('dotenv').config();
const jwt = require('jsonwebtoken');

const getTokenFrom = (req, res) => {
    const authorization = req.get('authorization');

    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null
}

exports.adminAuth = async (req, res, next) => {
    const token = getTokenFrom(req, res);
    if (!token) {
        return res.send("Unathorised Access!");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    next();
}

exports.userAuth = async (req, res, next) => {
    const token = getTokenFrom(req, res);
    if (!token) {
        return res.send("Unathorised Access!");
    }

    const decodedToken = jwt.verify(token, process.env.USERSECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    next();
}