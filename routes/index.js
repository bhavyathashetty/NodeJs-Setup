import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Just Testing! Dont mind me.');
});
export default router;