const fs = require('fs');
const path = require('path');

const apiKey = process.env['API_KEY'] || '';
const envDir = path.join(__dirname, '..', 'src', 'environments');

const files = [
  { file: 'environment.ts', production: false },
  { file: 'environment.prod.ts', production: true },
];

files.forEach(({ file, production }) => {
  const content = `export const environment = {
  production: ${production},
  base_url: 'https://api.restcountries.com/countries/v5',
  api_key: '${apiKey}'
};
`;
  const targetPath = path.join(envDir, file);
  fs.writeFileSync(targetPath, content);
  console.log(`Written API_KEY to ${targetPath}`);
});
