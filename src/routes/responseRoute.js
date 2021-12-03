const express = require('express');

const router = express.Router();

router.post('/', responseController.save)

module.exports = router