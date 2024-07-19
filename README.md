# Sleep Tracker App

This is the Sleep Tracker application.

## Run Locally

### Server

- Navigate to server application `cd /server` in terminal
- Install dependencies by running `npm i` in terminal
- Start the DB (Postgresql) container with `docker compose up`
- Create .env file and put the following definition for DB url
  ```js
  DATABASE_URL = "postgresql://root:root@localhost:5432/sleeper";
  ```
- **TODO**: What else is needed?
- Finally start the server with `npm run dev`

### Client

- Navigate to client application folder `cd /client`
- Install dependencies by running `npm i`
- Run `npm run dev` in terminal

### Todo

- Add more validations on the Client/Server
- More strict typings
- Proper logic to getting all the sleep entries for users. Atm it is relying on the name/gender only which is not great
- Add some tests
- Add comments
