const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');
const MicrosoftStrategy = require('passport-outlook');

const googleCreds = require('./credentials/google');
const facebookCreds = require('./credentials/facebook');
const twitterCreds = require('./credentials/twitter');
const microsoftCreds = require('./credentials/microsoft');
const chalk = require('chalk');
const Account = require('./../models/account');

passport.serializeUser((acc, done) => {
  done(null, acc.attrs.email);
});

passport.deserializeUser((email, done) => {
  Account.get(`${email}`, (err, acc) => {
    if (err) done(null, err);
    else {
      done(null, acc);
    }
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookCreds.clientID,
      clientSecret: facebookCreds.clientSecret,
      callbackURL: '/auth/facebook/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      Account.get(`${profile.email}`, (err, acc) => {
        if (err) console.log(chalk.red(err));
        else {
          if (acc == null) {
            // User doesn't exist in our DB. Create new.
            CreateNewUser(
              profile.email,
              'facebook',
              profile.id,
              profile.displayName,
              ['user'],
              profile.gender
            ).then((err, newAcc) => {
              if (err) {
                console.log(chalk.red(err));
              }
              done(err, newAcc);
            });
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
            CreateNewUser(
              profile.emails[0].value,
              'google',
              profile.id,
              profile.displayName,
              ['user'],
              profile.gender
            ).then((err, newAcc) => {
              if (err) {
                console.log(chalk.red(err));
              }
              done(err, newAcc);
            });
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
      Account.get(`${profile.emails[0].value}`, (err, acc) => {
        if (err) console.log(chalk.red(err));
        else {
          if (acc == null) {
            // User doesn't exist in our DB. Create new.
            CreateNewUser(
              profile.emails[0].value,
              'twitter',
              profile.id,
              profile.displayName
            ).then((err, newAcc) => {
              if (err) {
                console.log(chalk.red(err));
              }
              done(err, newAcc);
            });
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
  new MicrosoftStrategy(
    {
      clientID: microsoftCreds.clientID,
      clientSecret: microsoftCreds.clientSecret,
      callbackURL: '/auth/microsoft/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      Account.get(`${profile.emails[0].value}`, (err, acc) => {
        if (err) console.log(chalk.red(err));
        else {
          if (acc == null) {
            // User doesn't exist in our DB. Create new.
            CreateNewUser(
              profile.emails[0].value,
              'microsoft',
              profile.id,
              profile.displayName
            ).then((err, newAcc) => {
              if (err) {
                console.log(chalk.red(err));
              }
              done(err, newAcc);
            });
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

function CreateNewUser (
  email,
  idKey,
  idValue,
  name = 'A man has No Name',
  roles = ['user'],
  gender = 'male'
) {
  return new Promise((resolve, reject) => {
    Account.create(
      {
        email: email,
        oauth: { [idKey]: { id: idValue } },
        name: name,
        roles: roles,
        gender: gender
      },
      (err, newAcc) => {
        if (err) {
          console.log(chalk.red(err));
          reject(err, null);
        }
        resolve(null, newAcc);
      }
    );
  });
}
