import { comparePassword, hashPassword } from '../helper/user.helper.js';
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken';

const registerUser = async(req, res) =>{
    const {name, email, password} = req.body;
    try {
        if(!name){
            return res.json({error: "Name is required.",status:401});
        }
        if(!password || password.length < 6){
            return res.json({error: "Password is required and must be at least six characters",status:401});
        }
        const existedUser = await User.findOne({
            email
        });
        if(existedUser){
            return res.json({error: "Email already exists.",status:401});
        }

        //Hash password
        const hashedPassword = await hashPassword(password);

        const createNewUser = await User.create({
            email,
            fullName:name,
            password: hashedPassword
        })
        return res.status(200).json({
            message: "Register successfully!",
            user: createNewUser,
            status:201
        });
    } catch (error) {
        console.log("User registration failed", error);
    }
}

const loginUser = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            email
        });
        if(!user){
            return res.json({
                error: "No user found"
            });
        }
        const checkPassword = await comparePassword(password, user.password);
        if(checkPassword){
            jwt.sign({
                email: user.email,
                id: user._id,
                name: user.name
            }, process.env.JWT_SECRET, {}, (err, token) =>{
                if(err){
                    throw err;
                }
                res.cookie('token', token).json(user);
            })
        }
        if(!checkPassword){
            res.json({
                error: "Password is incorrect"
            });
        }

    } catch (error) {
        console.log(error);
    }
}



export {registerUser, loginUser}