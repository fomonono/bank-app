# Bank App

A beginner-friendly banking demo built with Express, Knex, PostgreSQL, and plain HTML/CSS/JavaScript.

## Project Structure

```text
bank-app/
├── server/
│   └── server.js              # Express API and page redirects
├── public/
│   ├── pages/                 # All HTML pages
│   ├── css/                   # Shared styles
│   ├── js/
│   │   ├── pages/             # JavaScript for each page
│   │   └── shared/            # Reusable browser helpers
│   └── assets/                # Images and static files
├── migrations/                # Database table definitions
├── seeds/                     # Sample database data
├── knexfile.js                # Database connection config
└── package.json               # App scripts and dependencies
```

## Main Files

- `server/server.js` handles the Express server, API routes, and friendly redirects.
- `public/pages/home.html` is the dashboard page.
- `public/pages/accounts.html` lists accounts.
- `public/pages/account-transactions.html` shows transactions for one selected account.
- `public/pages/transaction-history.html` shows all transactions.
- `public/css/styles.css` contains the shared design.
- `public/js/shared/api.js` and `public/js/shared/dom.js` contain reusable frontend helpers.

## Scripts

```bash
npm start
npm run db:migrate
npm run db:seed
npm run db:reset
```

After starting the server, open:

```text
http://localhost:5050
```

If port `5050` is busy, start the app on another port:

```bash
PORT=5051 npm start
```

Use `npm run db:reset` after changing migrations. It rolls the database back, runs the latest migrations, and loads the seed data again.
