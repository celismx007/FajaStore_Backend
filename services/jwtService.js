import jwt from 'jsonwebtoken';



const generateAccessToken = ( user ) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '1h' });
}

const validateToken = ( req, res, next ) => { 
    const accessToken = req.headers['authorization']; 
    if (!accessToken) {
        return res.status(403).send('Access denied: No token provided');
    }
    const token = accessToken.split(' ')[1];
    if (!token) {
        return res.status(403).send('Access denied: Invalid token format');
    }
    jwt.verify( token, process.env.SECRET, ( err, user ) => {
        if(err) { 
            return res.status(403).send('Access denid, token expired or incorrect');
        } else { 
            req.user = user;
            next();
        }
    })
}

export { generateAccessToken, validateToken };