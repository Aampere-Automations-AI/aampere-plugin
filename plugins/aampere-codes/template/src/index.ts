import { validateEnv } from './env.js';

// Always validate secrets first — if something is missing, the app stops here
// with a friendly message instead of crashing somewhere deep inside.
validateEnv();

console.log('Hello from your new Aampere app! Replace this with real code.');
