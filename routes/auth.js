const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const util = require('util');
const jwt = require('jsonwebtoken');
const jwtSignAsync = util.promisify(jwt.sign);
const db = require('../models');
const saltRounds = 10;
const jwtSecret = 'my-super-secret';

router.post('/register', async (req, res, next) => {
    try {
        if (
            !(
                req.body.email &&
                req.body.password &&
                req.body.password.length > 5 &&
                req.body.repeatPassword &&
                req.body.repeatPassword === req.body.password &&
                req.body.firstName &&
                req.body.lastName
            )
        ) {
            return res.status(401).json({ msg: 'invalid request parameters' });
        }

        const userExist = await db.User.findAll({
            where: {
                email: req.body.email
            }
        });

        if (userExist && userExist.length > 0) {
            return res.status(409).json({ msg: 'already exist' });
        }

        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

        const result = await db.User.create({
            id2: uuid.v4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passwordHash,
            avatar: '',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        });
        return res.status(200).json({ msg: 'success' });
    } catch (createUserError) {
        console.error(createUserError);
        return res.status(500).json({ msg: 'internal server error' });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        if (!(req.body.email && req.body.password)) {
            return res.status(401).json({ msg: 'invalid login' });
        }

        const user = await db.User.findAll({
            where: {
                email: req.body.email
            }
        });

        if (user && user.length <= 0) {
            return res.status(401).json({ msg: 'invalid login' });
        }

        const passwordCompareRes = await bcrypt.compare(req.body.password, user[0].password);

        if (!passwordCompareRes) {
            return res.status(401).json({ msg: 'invalid login' });
        }

        const token = await jwtSignAsync(
            {
                email: user[0].email,
                firstName: user[0].firstName,
                lastName: user[0].lastName
            },
            jwtSecret,
            { expiresIn: 60 * 60 }
        );
        return res.status(200).json({ accessToken: token, msg: 'success' });
    } catch (error) {
        return res.status(401).json({ msg: 'internal server error while login' });
    }
});

module.exports = router;
