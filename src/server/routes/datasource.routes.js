const router = express.Router();

router.get('/');                // Get all data sources with pagination
router.get('/:dataSourceId');   // Get single data source
router.post('/');               // Create new data source
router.put('/:dataSourceId');   // Update data source
router.delete('/:dataSourceId'); // Delete data source