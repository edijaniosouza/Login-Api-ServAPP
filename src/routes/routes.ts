import {Router} from 'express';
import controller from '../controller/login';

export const router = Router();

router.get('/', (req, res) => {res.send("hello")})

router.get('/users', controller.getAllRelatedUsers)
router.get('/user/:id', controller.getUser)

router.post('/adduser', controller.newUser)

router.delete('/deleteUser/:id', controller.deleteUser)
router.get('/validateUser/:token', controller.validateUser)

