const { spawn } = require('child_process');
const fs = require('fs');

const logStream = fs.createWriteStream('debug_log.txt');

console.log('Starting vite...');
const child = spawn('npm.cmd', ['run', 'dev'], {
    cwd: process.cwd(),
    shell: true
});

child.stdout.pipe(logStream);
child.stderr.pipe(logStream);

child.on('close', (code) => {
    console.log(`Child exited with code ${code}`);
    logStream.end();
});
