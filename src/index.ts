
import * as fs from 'fs';

interface ExtractedData {
  title: string;
  status: string;
}

// Read the original JSON file
const rawData: string = fs.readFileSync('test data/test-Result.json', 'utf8');
const originalData: any = JSON.parse(rawData);

// Extract necessary information
const extractedData: ExtractedData[] = [];
let count = 0;
originalData.suites.forEach((suite: any) => {
    if(suite.suites){
    suite.suites.forEach((suitee: any) => {
      suitee.specs.forEach((spec: any) => {
        spec.tests.forEach((test:any) => {
        test.results.forEach((result: any) => {
          extractedData.push({
            title: spec.title,
            status: result.status.charAt(0).toUpperCase() + result.status.slice(1)
          });
          count++;
        });
        });
      });
    });
    }
  });

// Write the extracted data to a new JSON file
fs.writeFileSync('test data/output.json', JSON.stringify(extractedData, null, 2));

console.log(count);
