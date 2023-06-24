import express from 'express';
import UserController from '../controllers/UserController';
import ContactController from '../controllers/ContactController'
import MessageController from '../controllers/MessageController'

const router = express.Router();
const userController = new UserController();
const contactController = new ContactController();
const messageController = new MessageController();


router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users/handle-login', userController.postUserLogin)
router.post('/users', userController.postCreateUser);
router.put('/users/:id', userController.putUser);

router.get('/contacts', contactController.getAllContacts);
router.get('/contacts/:id', contactController.getContactById);
router.post('/contacts', contactController.postCreateContact);
router.put('/contacts/:id', contactController.putContact);

router.post('/message', messageController.sendMessage);



export default router;
