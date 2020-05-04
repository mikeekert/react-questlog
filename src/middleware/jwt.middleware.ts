import jwt = require('express-jwt');
import jwksRsa = require("jwks-rsa");

require('dotenv').config();

export const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    audience: `${process.env.AUTH0_DOMAIN}/api/v2/`,
    issuer: `${process.env.AUTH0_DOMAIN}/`,
    algorithm: ["RS256"]
});
