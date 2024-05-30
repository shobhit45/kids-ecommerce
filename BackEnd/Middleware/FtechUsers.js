var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const fetchUSER = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "please authenticate using valid auth-token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }

}


module.exports = fetchUSER;




