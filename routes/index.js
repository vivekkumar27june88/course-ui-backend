const router = require('express').Router();

router.use('/', (req, res, next) => {
    res.send('Welcome to course ui backend');
});

router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));

module.export = router;
