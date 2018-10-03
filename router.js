var express = require('express');
var router = express.Router();

//router.use('/', require('./routes/index/index'));
router.use('/user-type', require('./routes/user_type/index'));
router.use('/user', require('./routes/user/index'));

module.exports = router;
