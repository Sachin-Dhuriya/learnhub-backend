import jwt from 'jsonwebtoken';

const blacklistedToken = new Set();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Please login first..!!!' })
    }

    if (blacklistedToken.has(token)) {
        return res.status(401).json({ message: 'Session expired please login again..!!!' })
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid token' })
    }

}

const logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(400).json({ message: 'Unauthoriza Action..!!!' })
    } else {
        blacklistedToken.add(token)
    }

    res.status(200).json({ message: 'Logged out successfully..!!!!' })
}

export { authenticate, logout };