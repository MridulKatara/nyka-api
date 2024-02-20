const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.send({msg:"login first"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){
      const userId=decoded.userId
      req.userId=userId
      next();
  }
  } catch (e) {
    res.status(401).send({ message: 'Please authenticate.' });
  }
};

module.exports = auth;
