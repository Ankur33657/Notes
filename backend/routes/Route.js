const express=require('express');
const Notes=require('../module/schema');
const { default: mongoose } = require('mongoose');
const router=express.Router();
router.get('/',async (req,res)=>{
    try{
        const notes=await Notes.find({}).sort({createdAt:-1});
        res.status(200).json(notes);
    }catch(error){
        res.status(400).json({error:error.message});
    }
})
router.post('/',async(req,res)=>{
    const {title,content}=req.body;
    try{
       const note=await Notes.create({title,content});
       res.status(200).json(note);
    }catch(error){
        res.status(400).json({error:error.message});
    }
})
router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such notes"});
    }
    const note=await Notes.findByIdAndDelete({_id:id});
    if(!note){
        return res.status(404).json({error:"No such notes present"});
    }
    return res.status(200).json(note);

})
router.patch('/:id',async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such notes"});
    }
    const note=await Notes.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    if(!note){
        return res.status(404).json({error:"No such notes present"});
    }
    return res.status(200).json(note);
})
router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No user found"});
    }
    const note= await Notes.findById(id);
    if(!note){
        return res.status(404).json({error:'No such user found'});
    }
    res.status(200).json(note)
})
module.exports=router;