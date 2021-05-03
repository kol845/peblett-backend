# Peblett Backend

## General Info
- A Etherium soft wallet.

- Create a wallet. Receive and transfer ETH.

- A REST API created with NodeJS - Express

- Uses MySQL

- Deployed on Heroku

## Testing Locally

### Database setup
- Ensure that you have a working MySQL server running.
- Create 4 local variables:
    - PEB_HOST: Database host name. If local MySQL is running then it will be "localhost"
    - PEB_USR: Database username
    - PEB_PSWD: Database user password
    - PEB_DB: Database name


### Code setup
```bash
git clone https://github.com/kol845/peblett-backend

cd peblett-backend

npm install

npm run dev (For Development environment) 

OR

npm run staging (For Staging environment)

OR

npm run prod (For Production environment)
```





