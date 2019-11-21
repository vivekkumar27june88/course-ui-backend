const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/profile', require('./routes/profile'));
app.use('/api/movies/', require('./routes/movies'));

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
