const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const image = require('./controllers/image');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg', //postgreSQL
    connection: {
        host: '127.0.0.1',
        user: 'myuser',
        password: 'mypass',
        database: 'smart-brain'
    }
});
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', signin.handleSignIn(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall);

app.listen(3000, () => {
    console.log("App is running on port 3000");
});
