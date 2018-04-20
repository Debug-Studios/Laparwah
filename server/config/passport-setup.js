const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');
const googleCreds = require('./credentials/google');
const facebookCreds = require('./credentials/facebook');
const twitterCreds = require('./credentials/twitter');
const chalk = require('chalk');
const Account = require('./../models/account');

passport.serializeUser((acc, done) => {
  done(null, acc.attrs.id);
});

passport.deserializeUser((id, done) => {
  Account.get({ id: `${id}` }, (err, acc) => {
    if (err) return;
    done(null, acc);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: facebookCreds.clientID,
      clientSecret: facebookCreds.clientSecret,
      callbackURL: '/auth/facebook/callback'
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
                oauth: { facebook: { id: profile.id } }
              },
              (err, newAcc) => {
                if (err) {
                  console.log(chalk.red(err));
                }
                done(err, newAcc);
              }
            );
          } else {
            // User already exists in our DB.
            console.log(chalk.green('Already have the user'));
            done(err, acc);
          }
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
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
                done(err, newAcc);
              }
            );
          } else {
            // User already exists in our DB.
            console.log(chalk.green('Already have the user'));
            done(err, acc);
          }
        }
      });
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: twitterCreds.consumerKey,
      consumerSecret: twitterCreds.consumerSecret,
      userProfileURL:
        'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
      callbackURL: '/auth/twitter/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      Account.get(`${profile.email}`, (err, acc) => {
        if (err) console.log(chalk.red(err));
        else {
          if (acc == null) {
            // User doesn't exist in our DB. Create new.
            Account.create(
              {
                email: profile.email,
                username: profile.username
                  .toString()
                  .replace(/\s+/g, '')
                  .toLowerCase(),
                oauth: { twitter: { id: profile.id } }
              },
              (err, newAcc) => {
                if (err) {
                  console.log(chalk.red(err));
                }
                done(err, newAcc);
              }
            );
          } else {
            // User already exists in our DB.
            console.log(chalk.green('Already have the user'));
            done(err, acc);
          }
        }
      });
    }
  )
);
