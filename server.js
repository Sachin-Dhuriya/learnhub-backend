//--------------------------------Express------------------------------
import express from 'express';
const app = express();
//--------------------------------.ENV----------------------------------
import dotenv from 'dotenv';
dotenv.config();
//--------------------------------DATA PARSING--------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//---------------------------------API----------------------------------------
//----------Auth API----------
import authRoute from './routes/authRoute.js'
app.use('/api/auth', authRoute)


//-----------------------------Listening----------------------------
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}....`)
})