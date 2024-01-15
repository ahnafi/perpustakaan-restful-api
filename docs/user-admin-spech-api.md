- `POST /api/users/register`

  body

  ```json
  {
    "username": "username",
    "password": "password",
    "name": "name"
  }
  ```

  200

  ```json
  {
    "data": {
      "username": "username",
      "name": "name"
    }
  }
  ```

  400

  ```json
  {
    "errors": "username is already exist"
  }
  ```

- `POST /api/users/login`

  body

  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```

  200

  ```json
  {
    "data": "OK"
  }
  ```

  400

  ```json
  {
    "errors": "password or username is wrong"
  }
  ```

- `POST /api/users/logout`

  - authorization

  200

  ```json
  {
    "data": "OK"
  }
  ```

  400

  ```json
  {
    "errors": "unauthorized"
  }
  ```

- `GET /api/users/current`

  200

  ```json
  {
    "data": {
      "username": "username",
      "name": "name"
    }
  }
  ```

  400

  ```json
  {
    "errors": "unauthorized"
  }
  ```

- `PUT /api/users/current`

  - authorization

  body

  ```json
  {
    "password": "password",
    "name": "name"
  }
  ```

  200

  ```json
  {
    "data": {
      "username": "username",
      "name": "name"
    }
  }
  ```

  400

  ```json
  {
    "errors": "unauthorized"
  }
  ```
