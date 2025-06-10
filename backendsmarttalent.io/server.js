require('dotenv').config();
const express=require('express')
const app=express();
const {connectDB} =require('./config/db')
const bodyparser=require('body-parser')
app.use(express.json());

//connect to database
connectDB();


//router stitch api/company/register
const companyRouter=require('./routes/companyRoute')
app.use('/api',companyRouter)

app.listen(process.env.PORT,()=>{
    console.info('Server is connected at port no.'+process.env.PORT);
})



