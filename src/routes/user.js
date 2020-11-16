const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middlewares/auth')
const dotenv = require('dotenv')

const router = Router();

router.post('/api/register', auth, async (req, res) => {
    const { username, password } = req.body
    try {
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ username, password: hash })
        res.send(user)
    } catch (error) {
        console.error(error)
        res.send(error.message)
    }
})

router.post('/api/login', auth, async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ where: { username } })
        if (!user) {
            return res.send({ message: '用户不存在' })
        }
        // 对比密码
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            return res.send({ message: '密码错误' })
        }
        // 生成token

        const token = jwt.sign({
            id: user.id
        }, dotenv.config().parsed.TOKEN_SECRET)
        res.send({
            user,
            token
        })
    } catch (error) {
        res.send(error)
    }
})


router.post('/api/profile', auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router

