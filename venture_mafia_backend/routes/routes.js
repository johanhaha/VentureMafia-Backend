const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/target_org/:uuid', controllers.getTargetOrgInfo);
router.get('/alumni_info/:uuid', controllers.getAlumniInfo);
router.get('/subsequent_orgs_info/:uuid', controllers.getSubsequentOrgsInfo);
router.get('/relations/:uuid', controllers.getRelations);

module.exports = router;
