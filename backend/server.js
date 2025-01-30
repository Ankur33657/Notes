const express=require('express');
const mongoose=require('mongoose');
const Routes=require('./routes/Route');

require('dotenv').config();
const app=express();
app.use(express.json());  //middleware
app.use('/notes',Routes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("listen in port db",process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
})
