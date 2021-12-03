const express = require('express');

const router = express.Router();

router.get('/', (_, res) => res.redirect(process.env.DOCUMENTATION_URL));

module.exports = router;
