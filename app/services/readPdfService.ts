const PDFParser = require('pdf-parse');
const fs = require('fs');

export const readPdfContent = (pdfFile: any ) => {
    const dataBuffer = fs.readFileSync(pdfFile?.path);
    return new Promise((resolve, reject) => {
        PDFParser(dataBuffer)
            .then(function(data: any) {
                const { text, numpages } = data;
                fs.unlink(pdfFile?.path, (err: Error) => {
                    if (err) throw err;
                    console.log('File deleted!');
                  });
                resolve({pageNumber: numpages, content: text})
            })
            .catch((err: Error) => reject(err))
    });
}