import {existsSync,readFileSync} from 'node:fs';
const source=readFileSync('src/pages/work/Industries.tsx','utf8');
for(const name of ['Healthcare','Insurance','Hospitality','Finance','Education','Sport'])if(!source.includes(name))throw Error('Missing industry: '+name);
if(!existsSync('dist/index.html'))throw Error('Run npm run build first');
console.log('Industry catalogue and build output present');
