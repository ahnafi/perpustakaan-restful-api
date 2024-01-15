# ADMIN API SPECH 

### REGISTER ADMIN API

- `POST /api/admin/register`

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

### LOGIN ADMIN API

- `POST /api/admin/login`

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

### LOGOUT ADMIN API

- `POST /api/admin/logout`

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