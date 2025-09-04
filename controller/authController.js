import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userValidator from '../validators/userValidator.js';

const userRegister = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Please fill the data..!!1' })
        }

        let { error } = userValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { name, email, password } = req.body;

        let existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: 'Email id already registered..!!!!' })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        })

        res.status(200).json({ message: 'User Registered successfully..!!!', user: { name: user.name, email: user.email } })

    } catch (err) {
        next(err)
    }
}

const userLogin = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password is required...!!!!' })
        }

        let userData = await prisma.user.findUnique({ where: { email } })
        if (!userData) {
            return res.status(401).json({ message: 'Email does not exist please signup before login...!!!' })
        }

        let hashPassword = userData.password;
        
        let checkPassword = await bcrypt.compare(password,hashPassword)
        if(!checkPassword){
            return res.status(401).json({message: 'Incorrect password..!!!!'})
        }

        let token = jwt.sign(
            {id: userData.id, name: userData.name, email: userData.email, role: userData.role},
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
        )

        res.status(200).json({ message: `Welcome Back ${userData.name}`,token })
    } catch (err) {
        next(err)
    }
}

const userProfile = async(req,res, next)=>{
    try {

        res.status(200).json({message: `Welcome ${req.user.name}`, profile: {email: req.user.email, role: req.user.role}})
        
    } catch (err) {
        next(err)
    }
}


export {userRegister, userLogin, userProfile }