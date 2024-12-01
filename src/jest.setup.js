import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom/'; 

// Polyfill the missing TextEncoder/TextDecoder globally
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


// // jest.setup.ts
// Mocking window.fetch globally
global.fetch = jest.fn().mockResolvedValue({});

jest.mock('next/image', () => {
    const MockImage = (props) => {
        return <img {...props} />;
    };
    MockImage.displayName = 'Image';
    return MockImage;
  });