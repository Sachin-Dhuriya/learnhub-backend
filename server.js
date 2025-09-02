//--------------------------------Express------------------------------
import express from 'express';
const app = express();
//--------------------------------.ENV----------------------------------
import dotenv from 'dotenv';
dotenv.config();
//--------------------------------Bcrypt---------------------------------
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import userValidator from './validators/userValidator.js' 
//--------------------------------DATA PARSING--------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//---------------------------------API----------------------------------------

app.post('/api/auth/register',async (req,res)=>{
    try {
        if(!req.body){
            return res.status(400).json({message : 'Please fill the data..!!1'})
        }

        let {error} = userValidator.validate(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }

        let {name, email, password} = req.body;

        let existingUser = await prisma.user.findUnique({where : {email}})
        if(existingUser){
            return res.status(400).json({message: 'Email id already registered..!!!!'})
        }

        let hashPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password: hashPassword
            }
        })

        res.status(200).json({message: 'User Registered successfully..!!!', user: {name: user.name, email: user.email}})
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error...!!!'})
    }
})














//-----------------------------Listening----------------------------
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}....`)
})