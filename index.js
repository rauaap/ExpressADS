#!/usr/bin/env node
const { app } = require('./app');
const config = require('./config')

const port = (process.env.PORT || config.expressPort) || 8000
app.listen(port, () => console.log(`listening on http://localhost:${port}/`));