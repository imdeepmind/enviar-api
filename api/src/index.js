import express from 'express';

const app = express();

const PORT = process.env.PORT || 4999;

app.listen(PORT)

console.log(`The server is running using the port ${PORT}`);