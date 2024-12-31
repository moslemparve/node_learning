import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the node js' });
});

router.get('/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

router.post('/users',[
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('age').notEmpty().withMessage('Age is required').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
],(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, age } = req.body;
  console.log(`Received Name: ${name}, Age: ${age}`);

  res.json({
    message: 'Data received successfully',
    receivedData: { name, age },
  });
});

export default router;
