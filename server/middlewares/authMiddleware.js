const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token    -   async
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: '❌ No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: '❌ Invalid token' });
        }
        // Payload put here into the request object
        req.user = decoded;
        next();
    });
};

// synchronous version of the middleware
// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Acces interzis!" });

//   try {
//     const decoded = jwt.verify(
//       token.replace("Bearer ", ""),
//       process.env.JWT_SECRET
//     );
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token invalid!" });
//   }
// };

module.exports = authMiddleware;
