import express, { Router } from 'express';

import { 
  generateAnswerbyGPT,
} from '../controllers/GptCtr';


const router: Router = express.Router();

// define Routes
router.post('/generate-answer', generateAnswerbyGPT);

export default router;
