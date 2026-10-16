const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

const html = read('index.html');
const config = JSON.parse(read('vercel.json'));
const resumePath = path.join(root, 'ResumeOjaswee_5thSem.pdf');

assert.match(html, /href="ResumeOjaswee_5thSem\.pdf" download="ResumeOjaswee_5thSem\.pdf"/,
  'the hero must expose the current résumé as a named download');
assert.match(html, /id="cmdResults"[\s\S]*data-action="download"/, 'the command menu must keep a résumé action');
assert.match(html, /id="main"/, 'the page must expose a main landmark');
assert.ok(fs.existsSync(resumePath), 'the current résumé PDF must be bundled with the site');
assert.equal(fs.readFileSync(resumePath).subarray(0, 5).toString(), '%PDF-', 'the résumé must be a valid PDF');

const resumeHeaders = config.headers?.find(item => item.source === '/ResumeOjaswee_5thSem.pdf');
assert.ok(resumeHeaders, 'Vercel must define headers for the résumé asset');
assert.match(JSON.stringify(resumeHeaders), /attachment/);

for (const script of ['app.js', 'chatbot.js', 'contact.js']) {
  execFileSync(process.execPath, ['--check', path.join(root, script)], { stdio: 'pipe' });
}

console.log('site smoke checks passed');
