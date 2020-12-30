const openapiDiff = require('openapi-diff');
const yaml = require('js-yaml');
const fs = require('fs');
const fsPromises = require('fs').promises; 


let sourceFileName = './output/api.yaml';
const source = yaml.safeLoad(fs.readFileSync(sourceFileName, 'utf8'));

let destinationFileName = './bin/api.yaml';
const destination = yaml.safeLoad(fs.readFileSync(destinationFileName, 'utf8'));


openapiDiff.diffSpecs({
  sourceSpec: {
    content: JSON.stringify(source),
    location: sourceFileName,
    format: 'openapi3'
  },
  destinationSpec: {
    content: JSON.stringify(destination),
    location: destinationFileName,
    format: 'openapi3'
  }
}).then((result) => {
  if (result.breakingDifferencesFound) {
    console.log('Breaking change found!');
    process.exit(-1);
  }
  fsPromises.copyFile(destinationFileName, sourceFileName).then(() => {
    console.log('File was copied to destination');
  }).catch((err) => { throw err; });
}).then(() => {
  process.exit(0);
}).catch((err) => {
  console.log(err);
  process.exit(-1);
});
