import supertest from "supertest";
import { app } from "../src/app/app.js";
import {
  createBook,
  createUser,
  deleteAllBook,
  deleteAllUsers,
  deleteBorrow,
} from "./utils.js";

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
        username: "test",
        idBook: book.id,
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
        username: "test",
        idBook: book.id,
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
        username: "testa",
        idBook: book.id + 1,
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
    // });

    console.log(borrow.body);
    expect(borrow.status).toBe(400);
    // delete
    // await deleteBorrow(borrow.body.data.id);
  });
});
