import express from "express";
import passport from "passport";
import session from "express-session";

import "./auth"
import { routes } from "./routes";

const app = express();

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log("Server is running!"));