import '@testing-library/jest-dom';

// Polyfill for MSW in Node.js environment
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;