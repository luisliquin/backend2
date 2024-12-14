import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";

const cookieExtractor = (req) => {
  const token = req.cookies.token;
  console.log("cookie--->", token);
  return token;
};

const strategyOptionsCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: "1234",
};

passport.use(
  "jwtCookies",
  new jwtStrategy(strategyOptionsCookies, verifyToken)
);
passport.serializeUser((user, done)=>{
  done(null, user.userId);
});

passport.deserializeUser(async(id, done)=>{
  const user = await userDao.getById(id);
  return done(null, user);
});
