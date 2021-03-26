import jwt from 'jsonwebtoken'
import config from '../config/config';


const generarJWT = (uid: string) => {
    const payload = { uid };
    const token = jwt.sign(payload, config.jwtSecret,
        { expiresIn: "1h" }
    );

    return token;
}

export default generarJWT;

