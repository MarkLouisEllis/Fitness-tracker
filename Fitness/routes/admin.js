//routes used

const express = require("express");
const router = express.Router();
const {all,update,remove} = require('../controllers/admin');

router.get('/',all);
router.put('/update/:id',update);
router.delete('/delete/:id',remove);

module.exports = router;