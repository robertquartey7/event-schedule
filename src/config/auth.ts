import { PassportStatic } from "passport";

function setUpPassport(passport: PassportStatic) {
  passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.user_id,
        email: user.email,
      });
    });
  });

  passport.deserializeUser(function (user: any, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}
