# BOOK SPEC API

### ADD BOOK API

- `POST /api/books`

  - AUTHORIZATION

  body

  ```json
  {
    "title": "title",
    "author": "string",
    "description": "string 250",
    "totalQty": 123
  }
  ```

  SUCCESS 200

  ```json
  {
    "data": {
      "id": 123,
      "title": "book is the",
      "author": "book is the",
      "description": "book is the",
      "totalQty": 123,
      "availableQty": 123
    }
  }
  ```

  ERROR

  ```json
  {
    "errors": "Unauthorized"
  }
  ```

### UPDATE BOOK API

- `PUT /api/books/:idBook`

  - AUTHORIZATION

  - PARAMS = idBook : number

  body

  ```json
  {
    //optional
    "title": "book is the",
    "author": "book is the",
    "description": "book is the",
    "totalQty": 123,
    "availableQty": 123
  }
  ```

  SUCCESS 200

  ```json
  {
    "data": {
      "id": 123,
      "title": "book is the",
      "author": "book is the",
      "description": "book is the",
      "totalQty": 123,
      "availableQty": 123
    }
  }
  ```

  ERROR

  ```json
  {
    "errors": "Unauthorized"
  }
  ```

### DELETE BOOK API

- `DELETE /api/books/:idBook`

  - AUTHORIZATION

  - PARAMS = idBook : number

  SUCCESS 200

  ```json
  {
    "data": "OK"
  }
  ```

  ERROR

  ```json
  {
    "errors": "Unauthorized"
  }
  ```

### GET BOOK API BY ID

- `GET /api/public/books/:idBook`

  - PARAMS = idBook : number

  SUCCESS 200

  ```json
  {
    "data": {
      "id": 123,
      "title": "book is the",
      "author": "book is the",
      "description": "book is the",
      "totalQty": 123,
      "availableQty": 123
    }
  }
  ```

  ERROR

  ```json
  {
    "errors": "book is not found"
  }
  ```

### SEARCH BOOK API

- `GET /api/public/books`

  - QUERY

    - page : number
    - size : number
    - title : string
    - author : string
    - totalQty : number
    - availableQty : number

  SUCCESS 200

  ```json
  {
    "data": [
      {
        "id": 123,
        "title": "book is the",
        "author": "book is the",
        "description": "book is the",
        "totalQty": 123,
        "availableQty": 123
      },
      {
        "id": 123,
        "title": "book is the",
        "author": "book is the",
        "description": "book is the",
        "totalQty": 123,
        "availableQty": 123
      }
    ],
    "paging": {
      "page": 1,
      "total_item": 5,
      "total_page": 1
    }
  }
  ```

  ERROR

  ```json
  {
    "errors": "book is not found"
  }
  ```
