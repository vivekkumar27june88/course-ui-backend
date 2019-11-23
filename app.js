const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: true,
        optionsSuccessStatus: 204
    })
);
app.use(bodyParser.json());
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/profile', require('./routes/profile'));
app.use('/api/movies/', require('./routes/movies'));
app.use('/api/users/', require('./routes/users'));
app.use('*', (req, res) => res.status(404).json({ msg: 'not a valid resource' }));

app.listen(3000, () => {
    const routes = [];

    app._router.stack.forEach(middleware => {
        if (middleware.route) {
            routes.push(`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`);
        }
    });

    console.log(JSON.stringify(routes, null, 2));
    console.log('Server is listening on PORT 3000');
});
