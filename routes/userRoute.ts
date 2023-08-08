import express, { Router } from 'express';
import multer from 'multer';

import { 
    signIn,
    signUp,
    uploadPDF
} from '../controllers/UserCtr';


const router: Router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'app/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/uploadpdf', upload.single('pdfFile'), uploadPDF);

export default router;
