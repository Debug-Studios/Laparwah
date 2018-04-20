const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const googleCreds = require('./credentials/google');
const chalk = require('chalk');
const Account = require('./../models/account');

passport.serializeUser((acc, done) => {
  done(null, acc.id);
});

passport.deserializeUser((email, done) => {
  Account.get(`${email}`, (err, acc) => {
    if (err) done(null, null);
    else {
      done(null, acc);
    }
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleCreds.web.client_id,
      clientSecret: googleCreds.web.client_secret,
      callbackURL: '/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      Account.get(`${profile.emails[0].value}`, (err, acc) => {
        if (err) console.log(chalk.red(err));
        else {
          if (acc == null) {
            // User doesn't exist in our DB. Create new.
            Account.create(
              {
                email: profile.emails[0].value,
                username: profile.displayName
                  .toString()
                  .replace(/\s+/g, '')
                  .toLowerCase(),
                gender: profile.gender,
                oauth: { google: { id: profile.id } }
              },
              (err, newAcc) => {
                if (err) {
                  console.log(chalk.red(err));
                }
                return done(err, newAcc);
              }
            );
          } else {
            // User already exists in our DB.
            console.log(chalk.green('Already have the user'));
            return done(err, acc);
          }
        }
      });
    }
  )
);
