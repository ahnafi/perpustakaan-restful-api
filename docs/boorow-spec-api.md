# BORROW API SPECH

### ADD BORROW API

- `POST /api/users/borrows`

  - Authorization

  request body

  ```json
  {
    "idbook": 1,
    "borrowDate": "2022-02-02" // yyyy-mm-dd
  }
  ```

  **success 200**

  ```json
  "data" : {
    "id": 1,
    "username": "test",
    "idBook": 1,
    "borrowDate": "2022-02-02" // yyyy-mm-dd
  }
  ```

  **response error**

  ```json
  {
    "errors": "book is not found"
  }
  ```

### GET BORROW API

- `GET /api/users/borrows`

  - Authorization

  **success 200**

  ```json
  "data" : [
        {
        "id": 1,
        "username": "test",
        "idBook": 1,
        "borrowDate": "2022-02-02", // yyyy-mm-dd
        "restoreDate": null
    },
    {...}
  ]
  ```

  **response error**

  ```json
  {
    "errors": "book is not found"
  }
  ```

- `PUT /api/users/borrows`

  - Authorization

  request body

  ```json
  {
    "idbook": 1,
    "restoreDate": "2022-02-02" // yyyy-mm-dd
  }
  ```

  **success 200**

  ```json
  "data" : {
    "id": 1,
    "username": "test",
    "idBook": 1,
    "borrowDate": "2022-02-02", // yyyy-mm-dd
    "restoreDate":"2023-02-02" // yyyy-mm-dd
  }
  ```

  **response error**

  ```json
  {
    "errors": "book is not found"
  }
  ```
