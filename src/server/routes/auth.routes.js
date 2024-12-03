const router = express.Router();

router.post('/login');     // Authenticate user
router.get('/me');         // Get current user profile
router.get('/roles');      // Get user roles and permissions
