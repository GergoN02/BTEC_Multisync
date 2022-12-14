/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './index.html',
        './packages/renderer/*.{js,ts,jsx,tsx}',
        './packages/renderer/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};