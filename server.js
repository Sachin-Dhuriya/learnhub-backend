//--------------------------------Express------------------------------
import express from 'express';
const app = express();
//--------------------------------.ENV----------------------------------
import dotenv from 'dotenv';
dotenv.config();
//--------------------------------Bcrypt---------------------------------
import bcrypt from 'bcrypt';
//--------------------------------JWT---------------------------------
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import userValidator from './validators/userValidator.js'
//--------------------------------DATA PARSING--------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//---------------------------------API----------------------------------------
import authenticate from './middleware/authMiddleware.js'

app.post('/api/auth/register', async (req, res) => {
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
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error...!!!' })
    }
})

app.post('/api/auth/login', async (req, res) => {
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
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }
})

app.get("/api/auth/profile",authenticate, async(req,res)=>{
    try {

        res.status(200).json({message: `Welcome ${req.user.name}`, profile: {email: req.user.email, role: req.user.role}})
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error..!!!'})
    }
})

//app.post('/api/auth/logout',logout)

//-----------------------------Listening----------------------------
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}....`)
})