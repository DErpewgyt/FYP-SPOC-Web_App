const jwt = require('jsonwebtoken');
const config = require('../config')

const isTokenValid = (req, res, next) => {

    // Check if token is in req.headers
    if (!Object.prototype.hasOwnProperty.call(req.headers, "token")) {
        return res.status(403).json({
            "err_message": "No token found"
        })
    }

    try {
        // Check if the token is valid
        const token = req.headers.token;
        const verifiedData = jwt.verify(token, config.key);

        // Extract the data
        const id = verifiedData.id;
        const role = verifiedData.role;

        // Pass id and role to next middleware
        // can access in the next middleware in req.id or req.role
        req.id = id;
        req.role = role;

        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            "err_message": "Token is invalid"
        })
    }
}

module.exports = isTokenValid;