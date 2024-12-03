const router = express.Router();

router.get('/');              // Get all consumers with pagination
router.get('/:consumerId');   // Get single consumer
router.post('/');             // Create new consumer
router.put('/:consumerId');   // Update consumer
router.delete('/:consumerId'); // Delete consumer
