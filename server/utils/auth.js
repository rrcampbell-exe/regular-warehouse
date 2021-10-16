const jwt = require("jsonwebtoken");

const secret = "thiswarehouseisextremelynormalandithasaregularsecretaswell90210!";
const expiration = "24h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function({ req }) {
    // permits token to be sent via any of the below
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    // separate "Bearer" from the value of the token itself
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }
  
    // if no token has been provided, return request object as is
    if (!token) {
      return req;
    }
  
    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('This token is invalid. There\'ll be no entering this completely mundane, almost mind-numbingly ordinary warehouse with a token like that.');
    }
  
    // return updated request object
    return req;
  }
};
