// server side

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getMainPage, getMainDate, getMainPrice} = require('./routes/index');
const {getLogin} = require('./routes/login');
const {getUsers, getBuyers, getSellers, insertBuyer, insertSeller} = require('./routes/users');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;

// create connection to database
// mysql.createConnection takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password1',
    database: 'marketdb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MarketDB!');
});
global.db = db;

app.set('port', process.env.port || port); // express will use specified port
app.set('views', __dirname + '/views'); // express will look at /views folder to render view
app.set('view engine', 'ejs') // configure template engine
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))) // conf express to use the public folder
app.use(fileUpload()); // configure fileUpload

// routes for the app

app.get('/', getMainPage);
app.get('/date', getMainDate);
app.get('/price', getMainPrice);
app.get('/login', getLogin);
app.get('/users', getUsers);
/*
app.get('/productpost:postid', getPostPage);
app.get('/productpost/edit:uid', editPostPage);
app.get('/productpost/delete:uid', deletePostPage);
*/
//Show separate list for buyers and sellers
app.get('/users/buyers/', getBuyers)
app.get('/users/sellers', getSellers)

//If user sells a thing, he joins buyers list, if he purchases a thing, he joins sellers list
app.post('/makepost-buy', insertBuyer)
app.post('/makepurchase', insertSeller)

//Update info of users
//app.post('/accinfo', updateUserInfo)

//Update the post to sold, once transaction occurs
//app.post('/transactionsuccessful', soldUpdate)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
