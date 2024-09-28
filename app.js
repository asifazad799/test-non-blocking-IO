const express = require('express');
const modulesRouter = require('./src');

const app = express();

app.use(express.json())
app.use('/', modulesRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});