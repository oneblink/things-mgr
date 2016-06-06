import { TextDecoder, TextEncoder } from 'text-encoding';

global.TextDecoder = global.TextDecoder || TextDecoder;
global.TextEncoder = global.TextEncoder || TextEncoder;
