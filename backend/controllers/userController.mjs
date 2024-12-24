import {User} from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export default class UserController{
    static async create(req,res) {
        try{
            const {username,email,password} = req.body;
            const hashed = await bcrypt.hash(password,5);
            const user = new User({
                username,
                email,
                password: hashed
            });
            await user.save();
            return res.status(201)({msg: "Создан новый пользователь"})

        }
        catch(error){
            console.log(error);
            return res.status(500)({error})
        }
    }
    static async login(req,res) {
        try{
            const {email,password} = req.body;
            const finded = await User.findOne({email:email});
            if(!finded){
                return res.status(401)({msg:"NE naiden"})
            }
            const findedByPassword = await bcrypt.compare(password, finded.password);
            if(!findedByPassword) {
                return res.status(404)({msg:"ne naiden"})
            }
            const payload = {
                _id: finded._id,
                username:finded.username
            };
            const token = await jwt.sign(payload, process.env.SECRET, {expiresIn:'10h'});
            return res.status(200)({...finded._doc, token})
        }
        catch(error){
            return res.status(500)({eror});
        }
    }
}