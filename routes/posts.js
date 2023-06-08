import express from 'express';
import { getAllPosts,getPost,createPost,deletePost,updatePost } from '../controllers/postControllers.js';  
import { requireAuth } from '../middleware/auth.js';
//requireauth function h isiliye destructing ka use kiye now hum chahte h ki jb bhi koi post dekhe usse phle authentication chech ho so thats why we have used middleware

const router=express.Router();  
router.use(requireAuth);
router.get('/',getAllPosts);
router.get('/:id',getPost);
router.post('/',createPost);
router.delete('/:id',deletePost);
router.patch('/:id',updatePost);
export default router;