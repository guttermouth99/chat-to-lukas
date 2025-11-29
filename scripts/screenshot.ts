import puppeteer, { PDFOptions } from 'puppeteer';

async function screenshot() {
const browser = await puppeteer.launch({
  headless: true,
});



const page = await browser.newPage();

await page.goto('https://hirelukas.dev/citylab/cv?pdf=true');
await page.emulateMediaType('screen');

const pdfConfig = {
  path: 'cv.pdf',
  format: 'A4',
  printBackground: true,
  margin: {
    top: '0cm',
    bottom: '0cm',
    left: '0cm',
    right: '0cm'
  }
  
};

await page.pdf(pdfConfig as PDFOptions);

await browser.close();
}

screenshot();