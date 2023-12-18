/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontSize: {
                '2xs': ['0.625rem', '0.875rem'],
            },
            gridTemplateRows: {
                24: 'repeat(24, minmax(0, 1fr))',
            },
        },
    },
    plugins: [],
};
