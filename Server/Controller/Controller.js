const db = require('../Config/DB');
const path = require('path'); 

// Save offer letter details
const saveOfferLetter = (req, res) => {
  const { name, offerReleaseDate, joiningDate, designation } = req.body;
  const pdfPath = path.join(__dirname, 'pdfs', `${name}_offer_letter.pdf`);

  // pdf ki path save krna he database me
  const query = 'INSERT INTO offer_letters (name, offerReleaseDate, joiningDate, designation, pdfPath) VALUES (?, ?, ?, ?, ?)';
  const values = [name, offerReleaseDate, joiningDate, designation, pdfPath];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Failed to save offer letter data:', error);
      res.status(500).send('Failed to save offer letter data');
    } else {
      res.status(200).send('Offer letter data saved successfully');
      console.log(results);
    }
  });
};

// Get all offer letters data
const getOfferLetters = (req, res) => {
  const query = 'SELECT * FROM offer_letters';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch offer letters:', error);
      res.status(500).send('Failed to fetch offer letters');
    } else {
      res.status(200).json(results);
    }
  });
};

// Download PDF by ID
const downloadPdf = (req, res) => {
  const { id } = req.params;

  db.query('SELECT pdfPath FROM offer_letters WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Failed to get PDF path:', error);
      res.status(500).send('Failed to get PDF path');
    } else if (results.length > 0) {
      const pdfPath = results[0].pdfPath;
      res.sendFile(path.resolve(pdfPath));
    } else {
      res.status(404).send('PDF not found');
    }
  });
};

module.exports = {
  saveOfferLetter,
  getOfferLetters,
  downloadPdf,
};
