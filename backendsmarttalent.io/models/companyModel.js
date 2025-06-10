const mongoose=require('mongoose');

const company=new mongoose.Schema({

    entity_code:{type:String,Unique:true,default:"A"},
    
})