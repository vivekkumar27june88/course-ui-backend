const router = require('express').Router();

router.use('/', (req, res, next) => {
    res.send('Welcome to course ui backend');
});

router.use('/api/auth', require('./auth'));
router.use('/api/profile', require('./profile'));
router.use('/api/movies/', require('./movies'));

module.export = router;
