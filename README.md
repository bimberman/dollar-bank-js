# dollar-bank-js
A JS project for Collabera

## Technologies used

![HTML5](https://icongr.am/devicon/html5-original-wordmark.svg?size=128&color=currentColor)
![CSS3](https://icongr.am/devicon/css3-original-wordmark.svg?size=128&color=currentColor)
![JS](https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor)
![React](https://icongr.am/devicon/react-original-wordmark.svg?size=128&color=currentColor)
![MySQL](https://icongr.am/devicon/mysql-original-wordmark.svg?size=128&color=currentColor)
![NPM](https://icongr.am/devicon/npm-original-wordmark.svg?size=128&color=currentColor)
![Node.js](https://icongr.am/devicon/nodejs-original-wordmark.svg?size=128&color=currentColor)
![Express.js](https://icongr.am/devicon/express-original-wordmark.svg?size=128&color=currentColor)
Redux

## Features

* User can create an account
* User can login
* User can view personal details
* User can view last 5 transactions
* User can change user details
* User can deposit/withdraw/transfer funds

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- MySql 8 or higher

### Getting Started

1. Clone the repository
    ```shell
    git clone https://github.com/bimberman/om.git
    cd dollar-bank-js
    ```
2. Make a copy of the .env.example file, name the new file .env, and edit the file
    1. Edit the .env file as appropriate for your setup (for examaple if port 3000 is used by another program, then use a different port)
    2. Change the user to dev and password to lfz
    ```
    PORT=3000
    DEV_SERVER_PORT=3001

    DB_HOST=your_host (usually localhost)
    DB_NAME=dollar_bank
    DB_USER=super_secure_user
    DB_PASS=super_secure_password

    SESSION_SECRET=secret
    SESSION_EXPIRY=28800000
    ```
3. Install all of the dependencies via NPM
    ```shell
    npm install
    ```
4. Verify mysql database is running

5. Create the database and the tables
  ```mysql
  CREATE DATABASE`dollar_bank`

  CREATE TABLE`users`(
    `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
    `f_name` varchar(45) NOT NULL,
    `l_name` varchar(45) NOT NULL,
    `address` varchar(70) DEFAULT NULL,
    `phone` varchar(19) DEFAULT NULL,
    `user_id` varchar(45) NOT NULL,
    `password` varchar(45) DEFAULT NULL,
    `balance` float NOT NULL,
    PRIMARY KEY(`id`),
    UNIQUE KEY`id_UNIQUE`(`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 31 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


  CREATE TABLE`accounts`(
    `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
    `type` varchar(20) NOT NULL,
    `balance` float NOT NULL,
    `user_id` int(10) unsigned zerofill NOT NULL,
    PRIMARY KEY(`id`),
    UNIQUE KEY`id_UNIQUE`(`id`),
    KEY`user_ind`(`user_id`),
    CONSTRAINT`accounts_ibfk_1` FOREIGN KEY(`user_id`) REFERENCES`users`(`id`) ON DELETE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 25 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

  CREATE TABLE`transactions`(
    `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
    `amount` float NOT NULL,
    `label` text,
    `user_id` int(10) unsigned zerofill NOT NULL,
    `account_id` int(10) unsigned zerofill NOT NULL,
    `creation_time` datetime DEFAULT CURRENT_TIMESTAMP,
    `modification_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    UNIQUE KEY`id_UNIQUE`(`id`),
    KEY`FK_Customers_Transactions_id_idx`(`user_id`),
    KEY`FK_Accounts_Transactions_id_idx`(`account_id`),
    CONSTRAINT`FK_Accounts_Transactions_id` FOREIGN KEY(`account_id`) REFERENCES`accounts`(`id`),
    CONSTRAINT`FK_Customers_Transactions_id` FOREIGN KEY(`user_id`) REFERENCES`users`(`id`) ON DELETE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 30 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  ```

6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    ```shell
    npm run dev
    ```
