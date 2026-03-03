const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Load the HTML file
        const filePath = `file:///${path.resolve(__dirname, 'Resume_Ojaswee_Upadhyay.html').replace(/\\/g, '/')}`;
        console.log(`Loading: ${filePath}`);

        await page.goto(filePath, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdfPath = path.resolve(__dirname, 'OjasweeUpadhyay_2025_Resume.pdf');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '10px',
                right: '0px',
                bottom: '10px',
                left: '0px'
            }
        });

        console.log(`Successfully generated PDF at: ${pdfPath}`);
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
