# Peblett Backend

## General Info
- A Etherium soft wallet.

- Create a wallet. Receive and transfer ETH.

- A REST API created with NodeJS - Express

- Uses MySQL

- Deployed on AWS and Heroku
    - AWS: http://peblett2-env.eba-nv3dgmk2.us-east-2.elasticbeanstalk.com/
    - Heroku: https://peblett.herokuapp.com/

### REST API

Parameters are stored in JSON format in request body. Token is stored in header under 'x-access-token'

* **/v1/user/register**
    - HTTP method: POST
    - Params:
        - uname : \<username>
        - password : \<password>
        - email : \<email>
    - Output:
        - success/fail message
* **/v1/user/login**
    - HTTP method: POST
    - Input:
        - uname : \<username>
        - password : \<password>
    - Output:
        - success/error message
        - new token
* **/v1/user/create-wallet**
    - HTTP method: POST
    - Input:
        - x-access-token : \<token> (placed in header)
        - password: \<password>
    - Output:
        - success/error message
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





