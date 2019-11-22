const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const db = require('../models');
const uuid = require('uuid');

router.get('/', async (req, res, next) => {
    const users = await db.User.findAll();
    return res.status(200).json(users);
});

router.post('/', async (req, res, next) => {
    try {
        const userExist = await db.User.findAll({
            where: {
                email: req.body.email
            }
        });

        if (userExist && userExist.length > 0) {
            return res.status(409).json({ msg: 'already exist' });
        }

        const result = await db.User.create({
            id2: uuid.v4(),
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            avatar: '',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        });
        return res.status(200).json(result);
    } catch (createUserError) {
        console.error(createUserError);
        return res.status(500).json({ msg: 'internal server error' });
    }
});

module.exports = router;
