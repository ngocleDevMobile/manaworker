const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

// var admin = require("firebase-admin");

// var serviceAccount = require("./manaworker.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://safe-for-builder.firebaseio.com"
// });
const database = require('./config/keys').admins.database();
//Passport config
require('./config/passport')(passport);


const app = express();
//Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true

}));

//EJS
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set("views", "./views");

//Connect flash
app.use(flash());

//css
app.use(express.static('public'));
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
app.use(express.static(__dirname + '/public'));
app.use('/', require('./routes/index.js'));

var ref = database.ref("Users");
ref.orderByChild('email').on("child_added", function(snapshot) {
    // console.log(snapshot.key + " was " + snapshot.val().email + " meters tall");
    if(snapshot.val().email == 'admin@gmail.com') {
        console.log(snapshot.val());
    }
    // console.log(snapshot.val());
})
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });
// var usersRef = ref.child("users");
// usersRef.set({
//   alanisawesome: {
//     date_of_birth: "June 23, 1912",
//     full_name: "Alan Turing"
//   },
//   gracehop: {
//     date_of_birth: "December 9, 1906",
//     full_name: "Grace Hopper"
//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


