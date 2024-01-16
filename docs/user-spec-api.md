# USER API SPECH

### REGISTER USER API
- `POST /api/users/register`

  request body

  ```json
  {
    "username": "username",
    "password": "password",
    "name": "name"
  }
  ```

  response success 200

  ```json
  {
    "data": {
      "username": "username",
      "name": "name"
    }
  }
  ```

  response error 

  ```json
  {
    "errors": "username is already exist"
  }
  ```

### LOGIN USER API

- `POST /api/users/login`

  request body

  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```

  response success 200

  ```json
  {
    "data": "OK"
  }
  ```

  response error 

  ```json
  {
    "errors": "password or username is wrong"
  }
  ```

### LOGOUT USER API

- `POST /api/users/logout`

  - authorization

  response success 200

  ```json
  {
    "data": "OK"
  }
  ```

  response error 

  ```json
  {
    "errors": "unauthorized"
  }
  ```

### GET USER API 

- `GET /api/users/current`

  response success 200

  ```json
  {
    "data": {
      "username": "username",
      "name": "name"
    }
  }
  ```

  response error 

  ```json
  {
    "errors": "unauthorized"
  }
  ```

### UPDATE USER API

- `PUT /api/users/current`

  - authorization

  request body

  ```json
  {
    "password": "password",
    "name": "name"
  }
  ```

  response success 200

  ```json
  {
    "data": {
      "username": "username",
      "name": "name"
    }
  }
  ```

  response error 

  ```json
  {
    "errors": "unauthorized"
  }
  ```
