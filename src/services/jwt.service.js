import jwt from 'jsonwebtoken';

export const JwtService = {
    verifyToken: (token) => {
        try {
            const _token = token.split(" ")[1];
            return jwt.verify(_token, process.env.JWT_SECRET, (err, decoded) => {
      
              if (err != null) throw err;
              return decoded;
            });
          } catch (error) {
            console.log("[JWT] Error getting JWT token");
            throw error;
          }
    },
    jwtSign: (user) => {
        return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
}
