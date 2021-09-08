const express = require('express');
const cors = require('cors');
const { birthdays } = require('./data');
const app = express();

app.use(express.json());
app.use(cors());

app.set('port', 3001);

app.locals.title = 'Turing\'s Birthday Calendar'
app.locals.birthdays = birthdays;

app.get('/api/v1/birthdays', (request, response) => {
  return response.json(app.locals.birthdays)
});

app.post('/api/v1/birthdays', (request, response) => {
  const { name, month, day } = request.body;

  if (!name || !month || !day ) {
    return response.status(422).json({
      error: 'Expected format { name: <String>, month: <Number>, day: <Number> }. You are missing a required parameter.'
    })
  }

  const newBirthday = {id: Date.now(), name, month, day};

  app.locals.birthdays = [...app.locals.birthdays, newBirthday];

  return response.status(201).json(newBirthday);
});

app.delete('/api/v1/birthdays/:id', (request, response) => {
  const { id } = request.params;
  const parsedId = parseInt(id);
  const match = app.locals.birthdays.find(birthday => parseInt(birthday.id) === parsedId);

  if (!match) {
    return response.status(404).json({ error: `No birthday found with an id of ${id}.` })
  }

  const updatedBirthdays = app.locals.birthdays.filter(birthday => parseInt(birthday.id) !== parsedId);

  app.locals.birthdays = updatedBirthdays;

  return response.status(202).json(app.locals.birthdays)
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}!`);
});

module.exports = app;
