require('dotenv').config();
const express=require('express')
const app=express();
const {connectDB} =require('./config/db')
app.use(express.json());

//connect to database
connectDB();


//router stitch
const companyRouter=require('./routes/companyRoute')
app.use('/register',companyRouter)

app.listen(process.env.PORT,()=>{
    console.info('Server is connected at port no.'+process.env.PORT);
})



