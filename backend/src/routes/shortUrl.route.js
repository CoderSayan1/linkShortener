import {Router} from 'express';
import { handleNewShortUrl, handleTotalClicks, getAllUrl } from '../controllers/shortUrl.controller.js';

const router = Router();

router.post('/shortUrl', handleNewShortUrl);
router.get('/shortUrl/:id',  handleTotalClicks);
router.get('/shortUrl/id/:id2',  getAllUrl); // for the user id, taken from localstorage (session)

export default router