const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const database = {
    users: [
        {
            id: '123',
            name: 'Pablo',
            email: 'pablo@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ]
};
app.use(bodyParser.json());

const verifyUserId = (id) => {
    let userFound = database.users.find(user => {
        return user.id === id;
    });
    return userFound;
}

app.get('/', (req, res) => {
    res.send('this is working');
});

app.post('/signin', (req, res) => {

});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
});

app.get('/profile/:id', (req, res) => {
    const user = verifyUserId(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json("None user has been found!");
    }
});

app.put('/image', (req, res) => {
    const user = verifyUserId(req.body.id);
    if (user) {
        user.entries++
        res.json(user.entries);
    } else {
        res.status(404).json("None user has been found!");
    }
});

app.listen(3000, () => {
    console.log("app is running on port 3000");
});