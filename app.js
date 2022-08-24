const express = require('express')
const app = express();
const wsInstance = require('express-ws')(app);
const ads = require('./ads');

app.use(express.json())

app.ws('/ws', (ws, req) => {
    ws.on('message', (msg) => {
        let symbolPath, interval;
        try {
            ( { symbolPath, interval } = JSON.parse(msg) );
        }
        catch {
            res.status(400).send(JSON.stringify({ message: 'Invalid data' }));
        }

        if (!symbolPath) {
            ws.send(JSON.stringify(
                { message: 'Missing symbol path' }
            ));
            return;
        }

        ads.client.subscribe(
            symbolPath,
            (data, sub) => ws.send(JSON.stringify({ data, sub })),
            interval
        ).catch(
            e => ws.send(JSON.stringify({ error: e }))
        );
    });
});

app.post('/read', (req, res) => {
    const { symbolPath } = req.body;

    if (!symbolPath) {
        res.status(400).send({ message: 'Missing symbol path' });
        return;
    }

    ads.client.readSymbol(symbolPath).then((symbolData) => {
        res.send(symbolData);
    }).catch(e => {
        res.status(500).send({ error: e });
    });
});

app.post('/write', (req, res) => {
    const { symbolPath, writeValue } = req.body;

    if (!symbolPath || !writeValue) {
        res.status(400).send({ message: 'Missing symbol path and/or write value' });
        return;
    }

    ads.client.writeSymbol(symbolPath, writeValue).then((symbolData) => {
        res.send(symbolData);
    }).catch(e => {
        res.status(500).send({ error: e });
    });
});

app.get('/', (req, res) => res.status(200).send('<style>body {background-color: black}</style>'));

module.exports = {
    app
}