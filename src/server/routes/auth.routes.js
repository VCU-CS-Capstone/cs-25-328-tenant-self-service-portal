const router = express.Router();

router.post('/login');     // Authenticate user
router.get('/profile');         // Get current user profile
router.get('/roles');      // Get user roles and permissions
