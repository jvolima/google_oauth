import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import dotenv from "dotenv";
import { CreateUserUseCase } from "./modules/users/useCases/createUser/CreateUserUseCase";
import { FindUserByEmailUseCase } from "./modules/users/useCases/findUserByEmail/FindUserByEmailUseCase";
dotenv.config();

passport.use(new Strategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const findUserByEmailUseCase = new FindUserByEmailUseCase();
    const user = await findUserByEmailUseCase.execute(profile.email);

    if(user) {
      return cb(null, profile)
    }

    const createUserUseCase = new CreateUserUseCase();
    await createUserUseCase.execute({
      name: profile.displayName,
      email: profile.email
    });
    
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: any, done) {
  done(null, user)
})
