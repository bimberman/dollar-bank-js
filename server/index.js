// Dependencies
require('dotenv').config();
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

// Configuration of express
const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// Routes
/* @@@@@@@@@@@@@@@@@@@@@@@@ users @@@@@@@@@@@@@@@@@@@@@@@@ */
app.get('/api/users', async (req, res, next) => {
  const [rows] = await db.query('select * from users');
  res.json(rows);
});

// convenient accessor for user information during testing
app.get('/api/users/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new ClientError('No user id was provided and it is required!', 400));
    return;
  }
  const userId = parseInt(id);
  if (isNaN(userId) || userId < 0) {
    next(new ClientError(`Expected an integer. ${id} is not a invalid id.`, 400));
    return;
  }
  const [rows] = await db.query('select * from users where id=?', [userId]);
  res.json(rows);
});

// user authentication
app.post('/api/users/auth', async (req, res, next) => {
  const { userId, password } = req.body;
  if (!userId) {
    next(new ClientError('No user id was provided and it is required!', 400));
    return;
  }
  if (!password) {
    next(new ClientError('No user password was provided and it is required!', 400));
    return;
  }

  const [rows] = await db.query('select * from users where user_id=? and password=?', [userId, password]);
  if (rows.length) res.json(rows);
  res.sendStatus(401);
});

// creates a new user
app.post('/api/users/new-user', async (req, res, next) => {
  const {
    fName,
    lName,
    address,
    phone,
    userId,
    password,
    amount
  } = req.body;

  if (!userId) {
    next(new ClientError('No userId was provided and it is required for registration!', 400));
    return;
  }

  if (!password) {
    next(new ClientError('No password was provided and it is required for registration!', 400));
    return;
  }

  const balance = parseFloat(amount) || 0;
  if (isNaN(balance) || balance < 0) {
    next(new ClientError(`Expected a deposit amount. Instead received ${amount}, which is invalid.`, 400));
    return;
  }
  await db.query(`INSERT INTO dollar_bank.users (f_name, l_name, address, phone, user_id, password, balance)
                                 VALUES (?, ?, ?, ?, ?, ?, ?)`, [fName, lName, address, phone, userId, password, balance]);
  res.sendStatus(200);
});

/* @@@@@@@@@@@@@@@@@@@@@@@@ accounts @@@@@@@@@@@@@@@@@@@@@@@@ */
app.get('/api/accounts', async (req, res, next) => {
  const [rows] = await db.query('select * from accounts');
  res.json(rows);
});

app.get('/api/accounts/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new ClientError('No account id was provided and it is required!', 400));
    return;
  }
  const accountId = parseInt(id);
  if (isNaN(accountId) || accountId < 0) {
    next(new ClientError(`Expected an integer. ${id} is not a invalid id.`, 400));
    return;
  }
  const [rows] = await db.query('select * from accounts where id=?', [accountId]);
  res.json(rows);
});

// creates a new account
app.post('/api/accounts/new-account', async (req, res, next) => {
  const {
    type,
    amount,
    userId
  } = req.body;

  if (!userId) {
    next(new ClientError('No user id was provided and it is required for registration!', 400));
    return;
  }

  const balance = parseFloat(amount) || 0;
  if (isNaN(balance) || balance < 0) {
    next(new ClientError(`Expected a deposit amount. Instead received ${amount}, which is invalid.`, 400));
    return;
  }
  await db.query(`INSERT INTO dollar_bank.accounts (type, balance, user_id)
                  VALUES (?, ?, ?)`, [type || 'CHECKING', balance, userId]);
  res.sendStatus(200);
});

/* @@@@@@@@@@@@@@@@@@@@@@@@ transactions @@@@@@@@@@@@@@@@@@@@@@@@ */
app.get('/api/transactions', async (req, res, next) => {
  const [rows] = await db.query('select * from transactions');
  res.json(rows);
});

app.get('/api/transactions/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new ClientError('No transaction id was provided and it is required!', 400));
    return;
  }
  const transactionId = parseInt(id);
  if (isNaN(transactionId) || transactionId < 0) {
    next(new ClientError(`Expected an integer. ${id} is not a invalid id.`, 400));
    return;
  }
  const [rows] = await db.query('select * from accounts where id=?', [transactionId]);
  res.json(rows);
});

// creates a new transaction
app.post('/api/transactions/new-transaction', async (req, res, next) => {
  const {
    amount,
    label,
    accountId,
    userId
  } = req.body;

  if (!userId) {
    next(new ClientError('No user id was provided and it is required for registration!', 400));
    return;
  }

  if (!accountId) {
    next(new ClientError('No account id was provided and it is required for registration!', 400));
    return;
  }

  const balance = parseFloat(amount) || 0;
  if (isNaN(balance) || balance < 0) {
    next(new ClientError(`Expected a deposit amount. Instead received ${amount}, which is invalid.`, 400));
    return;
  }

  await db.query(`INSERT INTO dollar_bank.accounts (amount, label, user_id, account_id)
                  VALUES (?, ?, ?, ?)`, [balance, label || 'transaction', userId, accountId]);
  res.sendStatus(200);
});

// Generic health check and error messages.
app.get('/api/health-check', async (req, res, next) => {
  const [rows] = await db.query('select \'successfully connected\' as "message"');
  res.json(rows[0]);
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
