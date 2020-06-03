const OktaJwtVerifier = require('@okta/jwt-verifier');



module.exports = (req, res, next) => {
    oktaJwtVerifier = new OktaJwtVerifier({
        issuer: process.env.ISSUER,
        clientId: process.env.CLIENTID,
        assertClaims: {
            aud: process.env.AUD
        }
    })

    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) {
        return res.status(401).end();
    }
    const accessToken = match[1];
    const expectedAudience = 'api://default';
    return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
    .then(() => {
        next();
    })
    .catch(err=> {
        return res.status(401).json({error: err})
    })

}

