import { auth } from "express-oauth2-jwt-bearer";

export const checkJWT = auth({
    audience: `${process.env.AUTH0_AUDIENCE}`,
    issuerBaseURL: `${process.env.AUTH0_ISSUER_URL}`,
});
