const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');
const MicrosoftStrategy = require('passport-outlook');

const chalk = require('chalk');
const Account = require('./../models/account');

passport.serializeUser((acc, done) => {
  done(null, acc._id);
});

passport.deserializeUser((id, done) => {
  Account.findById(id, (err, acc) => {
    if (err || acc == null) done(null, err);
    else {
      done(null, acc);
    }
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FacebookId,
      clientSecret: process.env.FacebookSecret,
      callbackURL: '/auth/facebook/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      Account.findOne({ email: profile.email }, (err, acc) => {
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
      clientID: process.env.GoogleId,
      clientSecret: process.env.GoogleSecret,
      callbackURL: '/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      Account.findOne({ email: profile.emails[0].value }, (err, acc) => {
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
      consumerKey: process.env.TwitterId,
      consumerSecret: process.env.TwitterSecret,
      userProfileURL:
        'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
      callbackURL: '/auth/twitter/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      Account.findOne({ email: profile.emails[0].value }, (err, acc) => {
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
      clientID: process.env.MicrosoftId,
      clientSecret: process.env.MicrosoftSecret,
      callbackURL: '/auth/microsoft/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      Account.findOne({ email: profile.emails[0].value }, (err, acc) => {
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

/**
 * Creates a new user in the mongo db and returns it.
 * @function CreateNewUser
 * @return {account} {Newly created account}
 */
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
        oauth: { [idKey]: idValue },
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
