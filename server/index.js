// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

// Configuration of express
const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.use(cors());

/* @@@@@@@@@@@@@@@@@@@@@@@@ Routes @@@@@@@@@@@@@@@@@@@@@@@@ */
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
    next(new ClientError(`Expected a positive integer. ${id} is not a invalid id.`, 400));
    return;
  }
  const [rows] = await db.query('select * from users where id=?', [userId]);
  if (rows.length) {
    const row = rows[0];
    const { id, f_name: fName, l_name: lName, user_id: userId, address, phone, balance } = row;
    const data = {
      id,
      fName,
      lName,
      address,
      phone,
      userId,
      balance
    };
    res.json(data).status(200);
    return;
  }
  res.sendStatus(401);
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

  const [rows] = await db.query('select * from users where user_id=? and `password`=?', [userId, password]);

  if (rows.length) {
    const row = rows[0];
    const { id, f_name: fName, l_name: lName, user_id: userId, address, phone, balance } = row;
    const data = {
      id,
      fName,
      lName,
      address,
      phone,
      userId,
      balance
    };
    res.send(data).status(200);
    return;
  }
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
    amount,
    type
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
                                VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [fName, lName, address, phone, userId, password, balance]);
  const [dbUserId] = await db.query('select * from users where user_id=? and password=?', [userId, password]);
  await db.query(`INSERT INTO dollar_bank.accounts (type, balance, user_id)
                                VALUES (?, ?, ?)`,
  [type || 'CHECKING', balance, dbUserId[0].id]);
  const [dbAccountId] = await db.query('select id from accounts where user_id=? order by id desc limit 1', [dbUserId[0].id]);
  await db.query(`INSERT INTO dollar_bank.transactions (amount, label, user_id, account_id)
                                VALUES (?, ?, ?, ?)`,
  [balance, `Initial ${type || 'CHECKING'} deposit`, dbUserId[0].id, dbAccountId[0].id]);
  if (dbUserId.length) {
    const row = dbUserId[0];
    const { id, f_name: fName, l_name: lName, user_id: userId, address, phone, balance } = row;
    const data = {
      id,
      fName,
      lName,
      address,
      phone,
      userId,
      balance
    };
    res.json(data).status(200);
    return;
  }
  res.sendStatus(401);
});

// update a user
app.put('/api/users/update-user/:id', async (req, res, next) => {
  const {
    fName,
    lName,
    address,
    phone,
    userId,
    password
  } = req.body;

  const { id } = req.params;
  if (!id) {
    next(new ClientError('No id was provided and it is required!', 400));
    return;
  }

  const userSqlId = parseInt(id);
  if (isNaN(userSqlId) || userSqlId < 0) {
    next(new ClientError(`Expected a positive integer. ${id} is not a invalid id.`, 400));
    return;
  }

  if (fName) {
    await db.query(`UPDATE dollar_bank.users
                    SET f_name = ?
                    WHERE id=?`, [fName, userSqlId]);
  }
  if (lName) {
    await db.query(`UPDATE dollar_bank.users
                    SET l_name = ?
                    WHERE id=?`, [lName, userSqlId]);
  }
  if (address) {
    await db.query(`UPDATE dollar_bank.users
                    SET address = ?
                    WHERE id=?`, [address, userSqlId]);
  }
  if (phone) {
    await db.query(`UPDATE dollar_bank.users
                    SET phone = ?
                    WHERE id=?`, [phone, userSqlId]);
  }
  if (userId) {
    await db.query(`UPDATE dollar_bank.users
                    SET user_id = ?
                    WHERE id=?`, [userId, userSqlId]);
  }
  if (password) {
    await db.query(`UPDATE dollar_bank.users
                    SET password = ?
                    WHERE id=?`, [password, userSqlId]);
  }

  const [rows] = await db.query('select * from users where id=?', [userSqlId]);
  if (rows.length) {
    const row = rows[0];
    const { id, f_name: fName, l_name: lName, user_id: userId, address, phone, balance } = row;
    const data = {
      id,
      fName,
      lName,
      address,
      phone,
      userId,
      balance
    };
    res.json(data).status(200);
    return;
  }
  res.sendStatus(401);
});

/* @@@@@@@@@@@@@@@@@@@@@@@@ accounts @@@@@@@@@@@@@@@@@@@@@@@@ */
app.get('/api/accounts', async (req, res, next) => {
  const [rows] = await db.query('select * from accounts');
  res.json(rows);
});

app.get('/api/accounts/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new ClientError('No user id was provided and it is required!', 400));
    return;
  }
  const userId = parseInt(id);
  if (isNaN(userId) || userId < 0) {
    next(new ClientError(`Expected a positive integer. ${id} is not a invalid id.`, 400));
    return;
  }
  const [rows] = await db.query('select * from accounts where user_id=? order by id desc limit 5', [userId]);
  res.json(rows);
});

/* @@@@@@@@@@@@@@@@@@@@@@@@ transactions @@@@@@@@@@@@@@@@@@@@@@@@ */
app.get('/api/transactions', async (req, res, next) => {
  const [rows] = await db.query('select * from transactions');
  res.json(rows);
});

app.get('/api/transactions/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new ClientError('No user id was provided and it is required!', 400));
    return;
  }
  const userId = parseInt(id);
  if (isNaN(userId) || userId < 0) {
    next(new ClientError(`Expected a positive integer. ${id} is not a invalid id.`, 400));
    return;
  }
  const [rows] = await db.query('select * from transactions where user_id=? order by id desc limit 5', [userId]);
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

  const transactionAmount = parseFloat(amount) || 0;
  if (isNaN(transactionAmount)) {
    next(new ClientError(`Expected a deposit amount. Instead received ${amount}, which is invalid.`, 400));
    return;
  }

  await db.query(`INSERT INTO dollar_bank.transactions (amount, label, user_id, account_id)
                  VALUES (?, ?, ?, ?)`, [transactionAmount, label || 'transaction', userId, accountId]);
  await db.query('update dollar_bank.accounts set balance = balance+? where id = ? and user_id = ?', [transactionAmount, accountId, userId]);
  await db.query('update dollar_bank.users set balance = balance+? where id = ?', [transactionAmount, userId]);
  res.sendStatus(200);
});

/* @@@@@@@@@@@@@@@@@@@@@@@@ Generic health check and error messages. @@@@@@@@@@@@@@@@@@@@@@@@ */
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

/* @@@@@@@@@@@@@@@@@@@@@@@@ Server @@@@@@@@@@@@@@@@@@@@@@@@ */
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});

/* @@@@@@@@@@@@@@@@@@@@@@@@ Helper functions @@@@@@@@@@@@@@@@@@@@@@@@ */
// const dateFormatter = dateTime => {
//   const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const split = dateTime.split(' ');
//   const day = split[2];
//   const month = monthMap.indexOf(split[1]);
//   const year = split[3];
//   const time = split[4];
//   const date = `${year}-${month}-${day}`;
//   return `${date} ${time}`;
// };
