import bcrypt from "bcrypt";
import passport from "passport";
import local from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserModel from "../dao/models/UserModel.js";

const LocalStrategy = local.Strategy;

const initializatePassport = () => {

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ email: username });
      if (!user) return done(null, false, { message: "Usuario no encontrado" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Contraseña incorrecta" });
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("entre aca github strategy");
      console.log(profile);
      try {
        let user = await UserModel.findOne({ email: profile._json.email });
        if (!user) {
          user = new UserModel({
            first_name: profile.displayName,
            last_name: profile.username,
            email: profile.emails[0].value,
            password: "",
            isGithub: true,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

const cookieExtractor = (req) => {
  let token = null;
  if (req?.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

const strategyOptionsCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: '1234',
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "nEDakKhN8m"
};

passport.use(
  'jwt',
  new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
      const user = await UserModel.findById(jwt_payload.sub);
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  } catch (err) {
      return done(err);
  }
}));

passport.use('jwtCookies', new JwtStrategy(strategyOptionsCookies, async (jwt_payload, done) => {
  try {
    const user = await UserModel.findById(jwt_payload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  return done(null, user);
});
};

export default initializatePassport;