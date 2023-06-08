import Post from "../models/Post.js"; 
import mongoose,{mongo} from "mongoose";
export const getAllPosts= async(req,res)=>{  
const user_id=req.user._id;

    try{
        const post=await Post.find({user_id}).sort({createdAt: -1});
        if(!post){
            return res.status(404).json({error:'post does not exist'});
        }  
        res.status(200).json(post);
      }catch(err){
        res.status(400).json({error:err.message});
      }
}
export const getPost= async(req,res)=>{
       const {id}=req.params;
       //if we have smoe sort of url than id can be taken out from that using params 
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'post does not exist'});
      }  
      try{
        const post=await Post.findById(id);
        if(!post){
            return res.status(404).json({error:'post does not exist'});
        }  
        res.status(200).json(post);
      }catch(err){
        res.status(400).json({error:err.message});
      }
}
export const createPost= async(req,res)=>{
       const {date, title, content}=req.body; 
       const user_id=req.user._id;
    //    console.log(req.body);
    //    console.log(date);
    //    console.log(title);
    //    console.log(content);
       try{
        const post=await Post.create({date, title, content,user_id});
       res.status(200).json(post);
       }catch(err){
         res.status(400).json({error:err.message});
       }
}
export const deletePost= async(req,res)=>{
    const {id}=req.params;
    //if we have smoe sort of url than id can be taken out from that using params 
   if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({error:'post does not exist'});
   }  
   try{
    //  const post=await Post.findOneAndDelete({_id:id});
    const post=await Post.findById(id);
     if(!post){
         return res.status(404).json({error:'post does not exist'});
     }   
     const deletePost=await Post.findOneAndDelete({_id:id});
     res.status(200).json(deletePost);
   }catch(err){
     res.status(400).json({error:err.message});
   }
}
export const updatePost= async(req,res)=>{
    const {id}=req.params;
    //if we have smoe sort of url than id can be taken out from that using params 
   if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({error:'post does not exist'});
   }  
   try{
    //  const post=await Post.findOneAndDelete({_id:id});
    const post=await Post.findById(id);
     if(!post){
         return res.status(404).json({error:'post does not exist'});
     }   
     const updatedPost=await Post.findOneAndUpdate({_id:id},{...req.body});
     res.status(200).json(updatedPost);
   }catch(err){
     res.status(400).json({error:err.message});
   }
}