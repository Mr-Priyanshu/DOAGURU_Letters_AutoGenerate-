const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

// Load images
const loadImage = async (filePath) => {
  const imageBytes = fs.readFileSync(filePath);
  return imageBytes;
};

const saveOfferLetter = async (req, res) => {
  const { name, offerReleaseDate, joiningDate, designation, salary, benefits, officeTimings, noticePeriod, jobResponsibilities } = req.body;
  const pdfPath = path.join(__dirname, 'upload', `${name}_offer_letter.pdf`);

  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Load logo and signature images
    const logoImageBytes = await loadImage(path.join(__dirname, 'images', 'logo.png'));
    const signatureImageBytes = await loadImage(path.join(__dirname, 'images', 'signature.png'));

    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

    const logoDims = logoImage.scale(0.2);
    const signatureDims = signatureImage.scale(0.4);

    
    // Drawing header
    page.drawText('OFFER LETTER', {
      x: width / 2 - 50,
      y: height - logoDims.height - 5,
      size: 18,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Draw logo
    page.drawImage(logoImage, {
      x: width / 7 - logoDims.width / 2,
      y: height - logoDims.height -80,
      width: logoDims.width,
      height: logoDims.height,
    });

    // Company Address content
    page.drawText(
      `     1815, Wright Town, Jabalpur
      Madhya Pradesh, 482002
      www.doaguru.com
      `,
      {
        x: 20,
        y: height - logoDims.height - 92,
        size: 12,
        font: boldFont,
        lineHeight: 14,

    })

    // Drawing the rest of the content
    page.drawText(`Offer Release Date: ${offerReleaseDate}`, {
      x: width - 200,
      y: height - logoDims.height - 100,
      size: 12,
      font: boldFont,
    });

    page.drawText(`Dear ${name},`, {
      x: 30,
      y: height - logoDims.height - 160,
      size: 12,
      font: boldFont,
    });

    const letterUpaarContent =`
    Congratulations! We are pleased to offer you the position of ${designation} at DOAGuru Infosystems. Your skills, experience, and enthusiasm align perfectly with our company’s goals and vision, and we believe you will make a valuable addition to our team.
    `;
    page.drawText(letterUpaarContent, {
      x: 30,
      y: height - logoDims.height - 180,
      size: 12,
      font,
      maxWidth: 500,
      lineHeight: 14,
      
    });

    const letterContent = `
    Joining Date: ${joiningDate}
    Salary: ${salary} INR Per Month
    Benefits: ${benefits}
    Office Timings: ${officeTimings}
    Notice Period: ${noticePeriod}
    Job Responsibilities:
    `;
    page.drawText(letterContent, {
      x: 20,
      y: height - logoDims.height - 230,
      size: 12,
      font: boldFont,
      maxWidth: 500,
      lineHeight: 16,
    });

    let currentY = height - logoDims.height - 330;
    jobResponsibilities.forEach((responsibility, index) => {
      page.drawText(`${index + 1}. ${responsibility}`, {
        x: 35,
        y: currentY,
        size: 12,
        font,
      });
      currentY -= 20;
    });

    const footerContent = `Finally, we welcome you to DOAGuru InfoSystems and hope that your tenure with us will be long and beneficial. If you have any queries regarding the contents of this letter or the enclosed documents, please do not hesitate to contact the HR Team: info@doaguru.com.

    Please confirm your acceptance of this offer by 2 Days.
    We look forward to having you as part of our team.
    `;

    page.drawText(footerContent, {
      x: 30,
      y: currentY - 20,
      size: 12,
      font,
      maxWidth: 500,
      lineHeight: 16,
    });

    // Adding signature
    page.drawImage(signatureImage, {
      x: 80,
      y: currentY - 145,
      width: signatureDims.width,
      height: signatureDims.height,
    });

    // Adding footer
    page.drawText('R.S. Pandey', {
      x: 85,
      y: currentY - 155,
      size: 12,
      font: boldFont,
    });

    page.drawText('CEO, DOAGuru InfoSystems', {
      x: 50,
      y: currentY - 175,
      size: 12,
      font:boldFont,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(pdfPath, pdfBytes);

    // Save PDF path in the database
    const query = 'INSERT INTO offer_letters (name, offerReleaseDate, joiningDate, designation, salary, benefits, officeTimings, noticePeriod, jobResponsibilities, pdfPath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, offerReleaseDate, joiningDate, designation, salary, benefits, officeTimings, noticePeriod, JSON.stringify(jobResponsibilities), pdfPath];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Failed to save offer letter data:', error);
        res.status(500).send('Failed to save offer letter data');
      } else {
        res.status(200).send('Offer letter data saved successfully');
        console.log(results);
      }
    });
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    res.status(500).send('Failed to generate PDF');
  }
};

module.exports = {
  saveOfferLetter,
};
