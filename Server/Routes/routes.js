const express = require('express');
const router = express.Router();
db = require('../Config/DB')
const {OfferLatterPDF} = require('../Controller/pdfControllers')

router.post('/generate-pdf', OfferLatterPDF);

module.exports = router;
