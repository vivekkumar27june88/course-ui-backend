const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const THE_MOVIE_DB_API_KEY = '230d7108dac5cc450542854027b11318';

router.get('/trending', async (req, res, next) => {
    var options = {
        method: 'GET',
        uri: 'https://api.themoviedb.org/3/trending/movie/week',
        qs: {
            api_key: THE_MOVIE_DB_API_KEY
        },
        headers: {},
        json: true
    };

    try {
        const rpRes = await rp(options);
        console.log(rpRes);

        return res.status(200).json({
            data: rpRes,
            imageBaseUrl: 'https://image.tmdb.org/t/p/w1280/'
        });
    } catch (err) {
        return res.status(400).json({});
    }
});

router.get('/popular', async (req, res, next) => {
    var options = {
        method: 'GET',
        uri: 'https://api.themoviedb.org/3/movie/popular',
        qs: {
            page: 1,
            language: 'en-US',
            api_key: THE_MOVIE_DB_API_KEY
        },
        headers: {},
        json: true
    };

    try {
        const rpRes = await rp(options);
        console.log(rpRes);

        return res.status(200).json({
            data: rpRes,
            imageBaseUrl: 'https://image.tmdb.org/t/p/w1280/'
        });
    } catch (err) {
        return res.status(400).json({});
    }
});

router.get('/:id', async (req, res, next) => {
    var options = {
        method: 'GET',
        uri: `https://api.themoviedb.org/3/movie/${req.params['id']}`,
        qs: {
            page: 1,
            language: 'en-US',
            api_key: THE_MOVIE_DB_API_KEY
        },
        headers: {},
        json: true
    };

    try {
        const rpRes = await rp(options);
        console.log(rpRes);

        return res.status(200).json({
            data: rpRes,
            imageBaseUrl: 'https://image.tmdb.org/t/p/w1280/'
        });
    } catch (err) {
        return res.status(400).json({});
    }
});

module.exports = router;
