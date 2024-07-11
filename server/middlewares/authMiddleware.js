const jwt = require('jsonwebtoken')

exports.authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if(token){
        jwt.verify(
            token, 
            "Any_string_that_is_secret_key",
            (error, decoded) => {
                if (error) {
                    console.log(error)
                    return res.status(401).send({
                        isLoggedIn: false,
                        message: "failed to authenticate "
                    })
                }
                console.log(decoded)
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                next();
            }
        )
    } else {
        res.status(401).send({message: "Not logged in or signup to access this resource"})
    }
}
