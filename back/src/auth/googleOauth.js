const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { userAuthService } from "../services/userService";

const config = {
    clientID: process.env.GOOGLE_CLIEND_ID,
    clientSecret: process.env.GOOGLE_CLIEND_PW,
    callbackURL: "/auth/google/callback"
};

async function findOrCreateUser({ name, email }) {
    const user = await userAuthService.getUserOauth({ email });

    if (user) return user;

    await userAuthService.addUser({
        name,
        email,
        password: 'GOOGLE_OAUTH',
    });

    const newUser = await userAuthService.getUserOauth({ email });

    return newUser;
}

module.exports = new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json;
    console.log(email, name);
    try {
        const user = await findOrCreateUser({ email, name });
        done(null, user);
    } catch (e) {
        done(e, null);
    }
});