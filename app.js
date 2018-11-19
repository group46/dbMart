// server side

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();


const {getLogin, gotoSettings,updateUser} = require('./routes/login');
const {getMainPage, getMainDate, getMainPrice, getMainLikes, getAccCreatePage} = require('./routes/index');

const {getUsers, getUsersDate, insertUser} = require('./routes/users');
const {addPostPage, getAddPostPage, editPost, editPostPage, deletePostPopUp, deletePost} = require('./routes/post');
const {getPostPage, soldUpdate} = require('./routes/products')
const {getPriceRange ,getPriceTable, getUserAd, getBestPost} = require('./routes/popq')
const {getProductComments} = require('./routes/seepost')

const port = 5000;

// create connection to database
// mysql.createConnection takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'ginahong',
    password: 'ghdatabase',
    database: 'marketdb',
    multipleStatements : true
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

// MAIN PAGE
app.get('/', getMainPage); // Go to Main Page
app.get('/date', getMainDate); // Sort main page by DATE
app.get('/price', getMainPrice); // Sort main page by PRICE
app.get('/likes', getMainLikes);

// USER related pages or queries
app.get('/login', getLogin); // Go to LOGIN page

app.get('/users', getUsers); // Go to USERS page
app.get('/users/date', getUsersDate); // SORT users by date
app.post('/acc-settings', gotoSettings); // EDIT a user (get here by logging in)
app.post('/update', updateUser); // UPDATE user info
app.get('/getacccreate', getAccCreatePage); // Go to ACC CREATE page
app.post('/getacccreate', insertUser); // INSERT user

// PRODUCT_POSTS
app.get('/see_post/:postid', getProductComments); // Go to ONE POST page (see more)
app.get('/add_post', getAddPostPage); // Go to CREATE POST page
app.post('/add_post', addPostPage); // INSERT product_post
app.get('/deletepopup/:postid', deletePostPopUp); // DELETE a certain post
app.post('/deletepopup/:postid', deletePost); // DELETE a certain post
app.get('/edit/:postid', editPostPage);
app.post('/edit/:postid', editPost);
app.post('/sold:postid', soldUpdate); //Update the post to sold, once transaction occurs

// POPULAR QUERIES
app.get('/pop_q/chooseprice', getPriceRange); // Products in price range feature
app.post('/pop_q/chooseprice', getPriceTable); // Products in price range feature
app.get('/pop_q/user_interest', getUserAd); // Users and advertisements they could see
app.get('/pop_q/best_post', getBestPost); // Posts liked by ALL users (DIVISION)

// app.get('/users/buyers/', getBuyers);
// app.get('/users/sellers', getSellers);
// app.post('/makepurchase', insertSeller);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
