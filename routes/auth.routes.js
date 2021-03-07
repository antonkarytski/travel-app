const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const route = Router()

route.post(
    '/register',
    [
        check('email', 'email is incorrect').isEmail(),
        check(
            'password',
            'password length have to be more then 6 symbols')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "incorrect email or password"
                })
            }
            const {email, password} = req.body
            const potentialUser = await User.findOne({email})
            if (potentialUser) {
                res.status(400).json({message: "User with this email is existing yet"})
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({email, password: hashedPassword})
            user.save().then((data) => {
            }).catch((e) => {
            })

            res.status(201).json({message: "You successfully registered"})
        } catch (e) {
            res.status(500).json({message: "Smth wrong"})
        }
    })

route.post('/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "incorrect email or password"
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({message: "User is not found"})
            }

            const passwordIsCorrect = await bcrypt.compare(password, user.password)
            if (!passwordIsCorrect) {
                return res.status(400).json({message: "Неверный пароль"})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecretKey'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id, message: "you logged in"})
        } catch (e) {
            res.status(500).json({message: "Something wrong", e})
        }
    })

module.exports = route