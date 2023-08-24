import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;