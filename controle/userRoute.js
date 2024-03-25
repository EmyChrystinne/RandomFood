import express from 'express';
import e, { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

export default router;