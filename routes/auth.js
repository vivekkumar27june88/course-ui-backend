const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/register', async (req, res, next) => {
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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
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

router.post('/login', async (req, res, next) => {
    try {
        const userExist = await db.User.findAll({
            where: {
                email: req.body.email,
                
            }
        });

        if (userExist && userExist.length > 0) {
            return res.status(409).json({ msg: 'already exist' });
        }
    } catch(error) {

    }
});

module.exports = router;
