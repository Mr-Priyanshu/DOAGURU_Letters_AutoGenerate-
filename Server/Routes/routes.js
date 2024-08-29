const express = require('express');
const router = express.Router();
db = require('../Config/DB')
const {
  // saveOfferLetter,
  getOfferLetters,
  downloadPdf,
} = require('../Controller/Controller');
const { saveOfferLetter } = require('../Controller/PdfController');
const { RegisterAuth, LoginAuth } = require('../Controller/Auth');

router.post('/api/register', RegisterAuth);
router.post('/api/login', LoginAuth);

router.post('/api/saveOfferLetter', saveOfferLetter);
router.get('/api/getOfferLetters', getOfferLetters);
router.get('/api/downloadPdf/:id', downloadPdf);




module.exports = router;
