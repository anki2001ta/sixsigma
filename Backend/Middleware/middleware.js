const authMiddleware = (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).send({ message: 'Authorization token is missing' });
    }
    const token = headerToken.split(' ')[1];
    firebase.auth().verifyIdToken(token)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch(() => {
        return res.status(401).send({ message: 'Invalid authorization token' });
      });
  };
  
  module.exports = authMiddleware;