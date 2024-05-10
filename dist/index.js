"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// Read the original JSON file
const rawData = fs.readFileSync('test data/test-Result.json', 'utf8');
const originalData = JSON.parse(rawData);
// Extract necessary information
const extractedData = [];
let count = 0;
originalData.suites.forEach((suite) => {
    if (suite.suites) {
        suite.suites.forEach((suitee) => {
            suitee.specs.forEach((spec) => {
                spec.tests.forEach((test) => {
                    test.results.forEach((result) => {
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
