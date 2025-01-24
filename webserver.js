const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
console.log('Environment:', process.env.NODE_ENV);

const app = next({ dev });
const handle = app.getRequestHandler();

const port = 8080;

console.log('Starting Next.js preparation...');
app.prepare().then(() => {
    console.log('Next.js prepared successfully!');
    
    const server = express();
    console.log('Express server initialized.');

    server.use('/public', express.static(path.join(__dirname, 'public')));
    console.log('Static files middleware added.');

    server.all('*', (req, res) => {
        console.log(`Handling request: ${req.url}`);
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) {
            console.error('Error starting server:', err);
            process.exit(1); // Exit if there's a fatal error
        }
        console.log(`> Ready on http://3.25.192.169:${port}`);
    });
}).catch((err) => {
    console.error('Error during Next.js preparation:', err);
});
