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
    if(!getTokenFrom(req, res)){
        return res.send("Unathorised Access!");
    }

    const decodedToken = jwt.verify(getTokenFrom(req, res), process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    next();
}

exports.userAuth = async (req, res, next) => {
    if(!getTokenFrom(req, res)){
        return res.send("Unathorised Access!");
    }
    
    const decodedToken = jwt.verify(getTokenFrom(req, res), process.env.USERSECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    next();
}