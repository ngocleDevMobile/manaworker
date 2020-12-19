const express = require('express');
const router = express.Router();
const passport = require('passport');
const database = require('../config/keys').admins.database();


//Welcome
router.get('/', (req, res) => {
    res.render('login');
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/',
//         failureFlash: true
//     })(req, res, next);
// });
router.post('/login', (req, res) => {
    const {email} = req.body;
    let errors = [];
    if (!email) {
        errors.push({ msg: 'Please fill in all fiels' });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            email,
        });
    } else {
        var ref = database.ref("Users");
                ref.orderByChild('email').on("child_added", function(snapshot) {
                if(snapshot.val().email !== email) {
                    errors.push({ msg: 'Email is already rergisted' });
                res.render('login', {
                    errors,
                    email,
                });
                } else {
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/dashboard');
                }
                })
        // User.findOne({ email: email }).then(user => {
        //     if (user) {
        //         errors.push({ msg: 'Email is already rergisted' });
        //         res.render('register', {
        //             errors,
        //             email,
        //         });
        //     } else {
        //         const newUser = new User({
        //             name,
        //             email,
        //             password
        //         });
        //         bcrypt.genSalt(10, (err, salt) => {
        //             bcrypt.hash(newUser.password, salt, (err, hash) => {
        //                 if (err) throw err;
        //                 newUser.password = hash;
        //                 newUser.save()
        //                     .then(user => {
        //                         req.flash('success_msg', 'You are now registered and can log in');
        //                         res.redirect('/users/login');
        //                     })
        //                     .catch(err => console.log(err));

        //             });
        //         });


        //     }
        // });
    }
});

module.exports = router;