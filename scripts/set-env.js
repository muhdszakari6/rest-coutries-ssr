const fs = require('fs');
const path = require('path');

const apiKey = process.env['API_KEY'] || '';

const envContent = `export const environment = {
  production: true,
  base_url: 'https://api.restcountries.com/countries/v5',
  api_key: '${apiKey}'
};
`;

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');
fs.writeFileSync(targetPath, envContent);
console.log(`Written API_KEY to ${targetPath}`);
