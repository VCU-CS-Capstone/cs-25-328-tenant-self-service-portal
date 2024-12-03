const router = express.Router();

router.get('/');              // Get all producers with pagination
router.get('/:producerId');   // Get single producer
router.post('/');             // Create new producer
router.put('/:producerId');   // Update producer
router.delete('/:producerId'); // Delete producer