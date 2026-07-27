import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const server = http.createServer((req, res) => {
    let safePath = req.url.split('?')[0];
    if (safePath === '/') safePath = '/index.html';
    let filePath = path.join(__dirname, safePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'index.html'), (err2, indexContent) => {
                if (err2) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(indexContent, 'utf-8');
                }
            });
        } else {
            let extname = path.extname(filePath);
            let contentType = 'text/html';
            switch (extname) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                    contentType = 'image/jpg';
                    break;
                case '.svg':
                    contentType = 'image/svg+xml';
                    break;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Chrono Rangers Server running on http://0.0.0.0:${PORT}`);
});
