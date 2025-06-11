require('dotenv').config();
const express=require('express')
const app=express();
const cors = require('cors');

const {connectDB} =require('./config/db')
const bodyparser=require('body-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect to database
connectDB();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // only if using cookies or auth headers
}));

//router stitch api/company/register
const companyRouter=require('./routes/companyRoute')
app.use('/api',companyRouter)

app.listen(process.env.PORT,()=>{
    console.info('Server is connected at port no.'+process.env.PORT);
})

