const jwt = require('jsonwebtoken')
const User = require('../models/User')
const dotenv = require('dotenv')

async function auth(req, res, next) {
    const env = dotenv.config()

    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = jwt.verify(token, env.parsed.TOKEN_SECRET)
        const user = await User.findByPk(tokenData.id, {
            attributes: ['id', 'username']
        })
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.send({
            message: '登录失效',
            error: error.message
        })
    }

}

module.exports = auth