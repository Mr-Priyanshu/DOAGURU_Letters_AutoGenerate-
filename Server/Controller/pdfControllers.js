const PDFDocument = require('pdfkit');



const OfferLatterPDF = ((req, res) => {
  const { name, date, position, salary, offerReleaseDate, benefits, officeTimings, noticePeriod, jobResponsibilities } = req.body;

  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment;filename=offer_letter.pdf',
    }).end(pdfData);
  });

  // Customize your offer letter content here
  doc.fontSize(20).text('OFFER & APPOINTMENT LETTER', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text('1815, Wright Town, Jabalpur\nMadhya Pradesh, 482002\nwww.doaguru.com', { align: 'left' });
  doc.moveDown();
  doc.text(`Offer Release Date: ${offerReleaseDate}`, { align: 'right' });
  doc.moveDown();
  doc.text(`Dear ${name},`);
  doc.moveDown();
  doc.text(`Congratulations! We are pleased to offer you the position of ${position} at DOAGuru InfoSystems. Your skills, experience, and enthusiasm align perfectly with our company’s goals and vision, and we believe you will make a valuable addition to our team.`);
  doc.moveDown();
  doc.text(`Joining Date: ${date}`);
  doc.text(`Salary: ${salary} INR Per Month`);
  doc.text(`Benefits: ${benefits}`);
  doc.text(`Office Timings: ${officeTimings}`);
  doc.text(`Notice Period: ${noticePeriod}`);
  doc.moveDown();
  doc.text(`Job Responsibilities:`);
  doc.list(jobResponsibilities);
  doc.moveDown();
  doc.text(`Finally, we welcome you to DOAGuru InfoSystems and hope that your tenure with us will be long and beneficial. If you have any queries regarding the contents of this letter or the enclosed documents, please do not hesitate to contact the HR Team: info@doaguru.com.`);
  doc.moveDown();
  doc.text(`Please confirm your acceptance of this offer by [Date].`);
  doc.moveDown();
  doc.text(`We look forward to having you as part of our team.`);
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.text('R.S.Pandey', { align: 'left' });
  doc.text('(CEO) DOAGuru InfoSystems.', { align: 'left' });
  
  doc.end();
})

module.exports = {
  OfferLatterPDF
}