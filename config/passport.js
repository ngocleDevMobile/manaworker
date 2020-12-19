const LocalStrategy = require('passport-local').Strategy;

const database = require('./keys').admins.database();
//Load User Models
// const User = require('../models/Admins');
//const User_client = require('../models/UserCilent');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //MAtch User
            // User.findOne({ email: email })
            //     .then(user => {
            //         if (!user) {
            //             return done(null, false, { message: 'That email is not registered' });
            //         }
            //         //Match pssword
            //         bcrypt.compare(password, user.password, (err, isMatch) => {
            //             if (err) throw err;
            //             if (isMatch) {
            //                 return done(null, user);
            //             } else {
            //                 return done(null, false, { message: 'Passwoed incorrect' });
            //             }
            //         });
            //     })
            //     .catch(err => console.log(err));

                var ref = database.ref("Users");
                ref.orderByChild('email').on("child_added", function(snapshot) {
                if(snapshot.val().email !== email) {
                    return done(null, false, { message: 'That email is not registered' });
                } else {
                    return done(null, snapshot.val());
                }
                })

        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}

