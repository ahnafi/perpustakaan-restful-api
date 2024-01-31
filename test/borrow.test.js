import supertest from "supertest";
import { app } from "../src/app/app.js";
import {
  createBook,
  createBorrow,
  createUser,
  deleteAllBook,
  deleteAllUsers,
  deleteBorrow,
} from "./utils.js";
import { validate } from "../src/validation/validate.js";
import { borrowValidation } from "../src/validation/borrow-validation.js";

describe("borrow book api /api/users/{username}/borrows", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await deleteAllUsers();
    await deleteAllBook();
  });

  it("should can borrow books", async () => {
    const book = await createBook();
    const borrow = await supertest(app)
      .post("/api/users/borrows")
      .set("Authorization", "test")
      .send({
        idBook: book.id,
        borrowDate: "2024-01-31T14:05:28.651Z",
      });

    console.log(borrow.body);
    expect(borrow.status).toBe(200);
    // delete
    await deleteBorrow(borrow.body.data.id);
  });
  it("should cant borrow books not user", async () => {
    const book = await createBook();
    const borrow = await supertest(app)
      .post("/api/users/borrows")
      // .set("Authorization", "test")
      .send({
        // username: "test",
        idBook: book.id,
        borrowDate: "2023-01-01",
      });

    console.log(borrow.body);
    expect(borrow.status).toBe(401);
    // delete
    // await deleteBorrow(borrow.body.data.id);
  });
  it("should cant borrow books ,book is not found and user is not found", async () => {
    const book = await createBook();
    const borrow = await supertest(app)
      .post("/api/users/borrows")
      .set("Authorization", "test")
      .send({
        // username: "testa",
        idBook: book.id + 1,
        borrowDate: "2023-01-01",
      });

    console.log(borrow.body);
    expect(borrow.status).toBe(404);
    // delete
    // await deleteBorrow(borrow.body.data.id);
  });
  it("should cant borrow books ,book is not found and user is not found", async () => {
    const book = await createBook();
    const borrow = await supertest(app)
      .post("/api/users/borrows")
      .set("Authorization", "test");
    // .send({
    //   username: "testa",
    //   idBook: book.id + 1,
    // borrowDate : "2023-01-01"
    // });

    console.log(borrow.body);
    expect(borrow.status).toBe(400);
    // delete
    // await deleteBorrow(borrow.body.data.id);
  });
});

describe("get borrow api with user GET /api/users/borrows/", () => {
  beforeEach(async () => {
    // await createUser();
    // await createBook();
  });
  afterEach(async () => {
    await deleteAllUsers();
    await deleteAllBook();
  });

  it("should can get borrow ", async () => {
    const user = await createUser();
    const book = await createBook();
    const borrowId = await createBorrow(user.username, book.id);
    //
    const borrow = await supertest(app)
      .get("/api/users/borrows")
      .set("Authorization", "test");

    console.log(borrow.body);
    expect(borrow.status).toBe(200);
    // delete
    await deleteBorrow(borrowId.id);
  });
  it("should cant get borrow because not user", async () => {
    const user = await createUser();
    const book = await createBook();
    const borrowId = await createBorrow(user.username, book.id);
    //
    const borrow = await supertest(app).get("/api/users/borrows");
    // .set("Authorization", "test");

    console.log(borrow.body);
    expect(borrow.status).toBe(401);
    // delete
    await deleteBorrow(borrowId.id);
  });
  it("should cant get borrow because not user", async () => {
    const user = await createUser();
    const book = await createBook();
    const borrowId = await createBorrow(user.username, book.id);
    //
    const borrow = await supertest(app)
      .get("/api/users/borrows")
      .set("Authorization", "testa");

    console.log(borrow.body);
    expect(borrow.status).toBe(401);
    // delete
    await deleteBorrow(borrowId.id);
  });
});

describe("get time", () => {
  // 2024-01-31T00:00:00.000Z
  it("should can get time", () => {
    let time = new Date();
    // time.setMonth(12);
    // console.log(time.getDate());
    // console.log(time.getFullYear());
    console.log(time);
    // console.log(
    //   `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
    // );
    // console.log(time.getTime())
  });

  it("should test validation", () => {
    const datevalid = validate(borrowValidation, {
      username: "test",
      idBook: "11",
      borrowDate: "2024-01-31",
    });
    console.log(datevalid);
  });
});

describe("can restroe book ", () => {
  beforeEach(async () => {
    // await createUser();
    // await createBook();
  });
  afterEach(async () => {
    await deleteAllUsers();
    await deleteAllBook();
  });

  it("should can restroe book", async () => {
    const user = await createUser();
    const book = await createBook();
    const borrowId = await createBorrow(user.username, book.id);
    //
    const borrow = await supertest(app)
      .put("/api/users/borrows")
      .set("Authorization", "test")
      .send({
        idBook: book.id,
        restoreDate: "2024-01-31T14:05:28.651Z",
      });

    console.log(borrow.body);
    expect(borrow.status).toBe(200);
    // delete
    await deleteBorrow(borrowId.id);
  });
  it("should cant restroe book karena bukan user", async () => {
    const user = await createUser();
    const book = await createBook();
    const borrowId = await createBorrow(user.username, book.id);
    //
    const borrow = await supertest(app)
      .put("/api/users/borrows")
      // .set("Authorization", "test")
      .send({
        idBook: book.id,
        restoreDate: "2024-01-31",
      });

    console.log(borrow.body);
    expect(borrow.status).toBe(401);
    // delete
    await deleteBorrow(borrowId.id);
  });
  it("should cant restroe book karena buku tidak ada", async () => {
    const user = await createUser();
    const book = await createBook();
    const borrowId = await createBorrow(user.username, book.id);
    //
    const borrow = await supertest(app)
      .put("/api/users/borrows")
      .set("Authorization", "test")
      .send({
        idBook: book.id+1,
        restoreDate: "2024-01-31",
      });

    console.log(borrow.body);
    expect(borrow.status).toBe(401);
    // delete
    await deleteBorrow(borrowId.id);
  });
});
