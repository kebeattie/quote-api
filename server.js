const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes)
    res.send({quote: quote});
})

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const person = req.query.person;
        const quotesToSend = quotes.filter((quote) => 
            quote.person === person
        );
        
        res.send({
                quotes: quotesToSend
        });
        
    } else {
        res.send({
            quotes: quotes
        })
    }
})

app.post('/api/quotes', (req, res, next) => {
    const { quote, person } = req.query;
    if (quote && person) {
        const newQuote = {
            quote: quote,
            person: person
        }
        quotes.push(newQuote)
        res.send({quote: newQuote});
    }
    else {
        res.status(400).send(newQuote);
    }
})

app.listen(PORT, () => {

});
