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
![Redux](<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754c-.047-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 0 0-1.648 1.769c.03.479.226.869.494 1.153c-1.048 2.038-2.621 3.536-5.005 4.795c-1.603.838-3.296 1.154-4.944.93c-1.378-.195-2.456-.81-3.116-1.799c-.988-1.499-1.078-3.116-.255-4.734c.6-1.17 1.499-2.023 2.099-2.443a9.96 9.96 0 0 1-.42-1.543C-.868 14.408-.416 18.752.932 20.805c1.004 1.498 3.057 2.456 5.304 2.456c.6 0 1.23-.044 1.843-.194c3.897-.749 6.848-3.086 8.541-6.532zm5.348-3.746c-2.32-2.728-5.738-4.226-9.634-4.226h-.51c-.253-.554-.837-.899-1.498-.899h-.045c-.943 0-1.678.81-1.647 1.753c.03.898.794 1.648 1.708 1.648h.074a1.69 1.69 0 0 0 1.499-1.049h.555c2.309 0 4.495.674 6.488 1.992c1.527 1.005 2.622 2.323 3.237 3.897c.538 1.288.509 2.547-.045 3.597c-.855 1.647-2.294 2.517-4.196 2.517c-1.199 0-2.367-.375-2.967-.644c-.36.298-.96.793-1.394 1.093c1.318.598 2.652.943 3.94.943c2.922 0 5.094-1.647 5.919-3.236c.898-1.798.824-4.824-1.47-7.416zM6.49 17.042c.03.899.793 1.648 1.708 1.648h.06a1.688 1.688 0 0 0 1.648-1.768c0-.9-.779-1.647-1.693-1.647h-.06c-.06 0-.15 0-.226.029c-1.243-2.098-1.768-4.347-1.572-6.772c.12-1.828.72-3.417 1.797-4.735c.9-1.124 2.593-1.68 3.747-1.708c3.236-.061 4.585 3.971 4.689 5.574l1.498.45C17.741 3.197 14.686.62 11.764.62C9.02.62 6.49 2.613 5.47 5.535C4.077 9.43 4.991 13.177 6.7 16.174c-.15.195-.24.539-.21.868z" fill="#764abc"/></svg>)

## Live Demo

Try the application live at: [om.benimberman.com](https://om.benimberman.com)

## Features

* User can view a catalog of items for sale
* User can view the details of an item
* User can add an item to their cart
* User can view their cart summary
* User can place an order

## Preview
![Live demo](https://raw.githubusercontent.com/bimberman/om/master/live-demo.gif)

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher

### Getting Started

1. Clone the repository
    ```shell
    git clone https://github.com/bimberman/om.git
    cd om
    ```
2. Make a copy of the .env.example file, name the new file .env, and edit the file
    1. Edit the .env file as appropriate for your setup (for examaple if port 3000 is used by another program, then use a different port) 
    2. Change the user to dev and password to lfz
    ```
    PORT=3001
    DEV_SERVER_PORT=3000
    DATABASE_URL=postgres://user:pass@localhost/om
    SESSION_SECRET=secret
    SESSION_EXPIRY=28800000
    ```
3. Install all of the dependencies via NPM
    ```shell
    npm install
    ```
4. Verify the postgresql service is running
    1. Please note that if the postgresql service is not running, then change **STATUS** with **START** in the following command
    ```shell
    sudo service postgresql status
    ```
5. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    ```shell
    npm run dev
    ```
