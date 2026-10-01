/**
 * Module principal de l'application
 */

export function greet(name = 'World') {
  return `Hello, ${name}!`;
}

export function calculateSum(a, b) {
  return a + b;
}

export function formatAppInfo() {
  return {
    status: 'running',
    timestamp: new Date().toISOString()
  };
}
