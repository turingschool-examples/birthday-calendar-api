### This repo is used as an assessment during the course of the Turing modules, if you are viewing this repository outside the context of an assessment, you’re in violation of the Academic Integrity policy you agreed to as a student.

# Turing Birthday Calendar API

This app is the back-end server for the Mod 3 FE mid-mod. It is tested with jest and supertest.

## Getting started

### Installation

1. Clone down this repository.
    - `git clone git@github.com:turingschool-examples/birthday-calendar-api.git`
2. Change into the new directory.
    - `cd birthday-calendar-api`
3. Install the dependencies.
    - `npm install`

### Usage

1. To fire up the server, run `node server.js` or `nodemon server.js`.

### Endpoints

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `http://localhost:3001/api/v1/months` | GET | not needed | Array of all months: `[{ id: 1, name: 'January'}, {id: 2, name: 'February'},...]` |
| `http://localhost:3001/api/v1/birthdays` | GET | not needed | Array of all existing birthdays: `[{ id: 18907224, name: 'Christie', month: 10, day: 23 }]` |
| `http://localhost:3001/api/v1/birthdays` | POST | `{name: <String>, month: <Number>, day: <Number>}` | New birthday: `{ id: 18939837, name: 'Kayla', month: 5, day: 15 }` |
| `http://localhost:3001/api/v1/birthdays/:id` | DELETE | not needed | Array of all remaining birthdays: `[{ id: 18907224, name: 'Christie', month: 10, day: 23 }]` |

Note: All of these endpoints will return semantic errors if something is wrong with the request.
