import { PassportStatic } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import appConfig from "../config/app";

export default function setupJWTStrategy(passport: PassportStatic) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: appConfig.environment.dev.SECRET_KEY,
      },

      function (payload, done) {
        try {
          return done(null, {
            id: payload.id,
          });
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}
