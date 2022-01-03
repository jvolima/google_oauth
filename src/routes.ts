import { Router, Request, Response, NextFunction } from "express";
import passport from "passport"

const routes = Router();

function isLoggedIn(request: Request, response: Response, next: NextFunction) {
  request.user ? next() : response.sendStatus(401)
}

routes.get("/", (request, response) => {
  response.send('<a href="/auth/google">Authenticate with Google</a>');
})

routes.get("/auth/google",
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

routes.get("/auth/google/callback",
  passport.authenticate('google', {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure"
  })
);

routes.get("/auth/failure", (request, response) => {
  response.send("something went wrong!");
})

routes.get("/protected", isLoggedIn, (request, response) => {
  if(!request.user) {
    throw new Error("Unauthorized!")
  }
  response.send(`Hello ${request.user.displayName}`)
});

export { routes }