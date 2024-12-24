import jwt from 'jsonwebtoken'

export class AuthMiddleware{
    static async isAuth(req,res,next){
        try{
            const auth = req.headers.authorization;
            if(!auth){
                return res.status(401)({msg: "НЕ авторизован"})
            }
            const token = auth.split('')[1];
            const is_verifyed = await jwt.verify(token, `${process.env.SECRET}`)
            if (!is_verifyed){
                return res.status(403)({msg:"Доступ запрещен"})
            }
            next();
        }
        catch(error){
            return res.status(500)({error})
        }
    }
}