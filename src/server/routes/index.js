const router = express.Router();

// Mount all routes
router.use('/datasets', datasetRoutes);
router.use('/producers', producerRoutes);
router.use('/consumers', consumerRoutes);
router.use('/datasources', datasourceRoutes);
router.use('/fields', fieldRoutes);
router.use('/auth', authRoutes);