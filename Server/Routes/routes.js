const express = require('express');
const router = express.Router();
db = require('../Config/DB')
const {
  saveOfferLetter,
  getOfferLetters,
  downloadPdf,
} = require('../Controller/Controller')



router.post('/api/saveOfferLetter', saveOfferLetter);
router.get('/api/getOfferLetters', getOfferLetters);
router.get('/api/downloadPdf/:id', downloadPdf);




module.exports = router;
