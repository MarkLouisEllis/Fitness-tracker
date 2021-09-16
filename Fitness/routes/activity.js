//routes used

const express = require("express");
const router = express.Router();
const {add,all,} = require('../controllers/activity');

router.get('/',all);
router.post('/add',add);

module.exports = router;