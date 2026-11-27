import ts from 'typescript';
import fs from 'node:fs';
const file='src/i18n/en.ts';
const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
let failed=false;
function visit(node){if(ts.isObjectLiteralExpression(node)){const keys=new Set();for(const p of node.properties){if(p.name&&(ts.isStringLiteral(p.name)||ts.isIdentifier(p.name))){const k=p.name.text;if(keys.has(k)){console.error(`Duplicate translation: ${k}`);failed=true;}keys.add(k);}}}ts.forEachChild(node,visit);}
visit(source);if(failed)process.exit(1);console.log('Translation keys unique');
