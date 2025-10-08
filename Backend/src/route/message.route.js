import { getAllContacts,getChatPartners,getMessagesByUserId,sendMessage} from '../controller/message.controller.js';
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';
const router = express.Router();



router.use(arcjetProtection,protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;