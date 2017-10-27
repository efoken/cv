const fs = require('fs');
const markdownPdf = require('markdown-pdf');
const startCase = require('lodash.startcase');

function titleCase(str) {
  return startCase(str)
    .replace(/QP media GmbH/i, 'QP media GmbH')
    .replace(/ABIAN GmbH/i, 'ABIAN GmbH');
}

fs.watch('./src', (eventType, filename) => {
  if (filename && filename.match(/\.md$/)) {
    markdownPdf({
      cssPath: './src/styles/main.css',
      remarkable: {
        breaks: false,
        linkify: true,
        typographer: true,
        quotes: '„“',
      },
    })
      .from(`./src/${filename}`)
      .to(`./dist/${titleCase(filename.replace(/\.md$/, ''))}.pdf`, () => {
        console.log(`${(new Date).toTimeString()} Compiled ${filename}`);
      });
  }
});
