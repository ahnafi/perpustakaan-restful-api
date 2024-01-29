import supertest from "supertest";
import { prisma } from "./../src/app/database.js";
import {
  createAdmin,
  createBook,
  createUser,
  deleteAllBook,
  deleteAllUsers,
} from "./utils.js";
import { app } from "./../src/app/app.js";
import { logger } from "../src/app/logging.js";
import fs from "fs";

describe("create book api POST /api/books", () => {
  beforeAll(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await deleteAllBook();
  });
  afterAll(async () => {
    await deleteAllUsers();
  });

  it("should can create books", async () => {
    const book = await supertest(app)
      .post("/api/books")
      .set("Authorization", "test")
      .send({
        title: "test",
        author: "sy",
        totalQty: 10,
        description: "desc",
      });

    expect(book.status).toBe(200);
    expect(book.body.data.title).toBe("test");
    logger.info(book.body);
  });
  it("should cant create books karena belum login", async () => {
    const book = await supertest(app)
      .post("/api/books")
      // .set("Authorization", "test")
      .send({
        title: "test",
        author: "sy",
        totalQty: 10,
        description: "desc",
      });

    expect(book.status).toBe(401);
    logger.info(book.body);
  });
});

describe("create book api POST /api/books", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await deleteAllBook();
    await deleteAllUsers();
  });

  it("should cant create books karena bukan admin", async () => {
    const book = await supertest(app)
      .post("/api/books")
      .set("Authorization", "test")
      .send({
        title: "test",
        author: "sy",
        totalQty: 10,
        description: "desc",
      });

    expect(book.status).toBe(401);
    logger.info(book.body);
  });
});

describe("update books api PUT /api/books/:idBook", () => {
  beforeAll(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await deleteAllBook();
  });
  afterAll(async () => {
    await deleteAllUsers();
  });

  it("should can update book ", async () => {
    const oldBook = await createBook();

    const newBook = await supertest(app)
      .put("/api/books/" + oldBook.id)
      .set("Authorization", "test")
      .send({
        author: "slebew",
        totalQty: 50,
        availableQty: 40,
        description: "ini buku testing",
      });

    expect(newBook.status).toBe(200);
    expect(newBook.body.data.author).toBe("slebew");
    expect(newBook.body.data.totalQty).toBe(50);
  });
  it("should cant update book karena id tidak ada", async () => {
    const oldBook = await createBook();

    const newBook = await supertest(app)
      .put("/api/books/" + oldBook.id + 1)
      .set("Authorization", "test")
      .send({
        author: "slebew",
        totalQty: 50,
        availableQty: 40,
        description: "ini buku testing",
      });

    expect(newBook.status).toBe(404);
    expect(newBook.body.errors).toBeDefined();
  });
  it("should cant update book karena tidak login", async () => {
    const oldBook = await createBook();

    const newBook = await supertest(app)
      .put("/api/books/" + oldBook.id)
      // .set("Authorization", "test")
      .send({
        author: "slebew",
        totalQty: 50,
        availableQty: 40,
        description: "ini buku testing",
      });

    expect(newBook.status).toBe(401);
    expect(newBook.body.errors).toBeDefined();
  });
});

describe("update books api PUT /api/books/:idBook", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await deleteAllBook();
    await deleteAllUsers();
  });

  it("should cant update book karena bukan admin", async () => {
    const oldBook = await createBook();

    const newBook = await supertest(app)
      .put("/api/books/" + oldBook.id)
      .set("Authorization", "test")
      .send({
        author: "slebew",
        totalQty: 50,
        availableQty: 40,
        description: "ini buku testing",
      });

    expect(newBook.status).toBe(401);
    expect(newBook.body.errors).toBeDefined();
  });
});
describe("delete books api DELETE /api/books/:idBook", () => {
  beforeEach(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await deleteAllBook();
    await deleteAllUsers();
  });

  it("should can delete book ", async () => {
    const book = await createBook();
    const rmBook = await supertest(app)
      .delete("/api/books/" + book.id)
      .set("Authorization", "test");

    expect(rmBook.status).toBe(200);
    expect(rmBook.body.data).toBeDefined();
  });
  it("should cant delete book karena buku tidak ada ", async () => {
    const book = await createBook();
    const rmBook = await supertest(app)
      .delete("/api/books/" + book.id + 1)
      .set("Authorization", "test");

    expect(rmBook.status).toBe(404);
    expect(rmBook.body.errors).toBeDefined();
  });
  it("should cant delete book karena tidak login ", async () => {
    const book = await createBook();
    const rmBook = await supertest(app).delete("/api/books/" + book.id + 1);
    // .set("Authorization", "test");

    expect(rmBook.status).toBe(401);
    expect(rmBook.body.errors).toBeDefined();
  });
});
describe("delete books api DELETE /api/books/:idBook", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await deleteAllBook();
    await deleteAllUsers();
  });
  it("should cant delete book karena user biasa ", async () => {
    const book = await createBook();
    const rmBook = await supertest(app)
      .delete("/api/books/" + book.id)
      .set("Authorization", "test");

    expect(rmBook.status).toBe(401);
    expect(rmBook.body.errors).toBeDefined();
  });
});

describe("get book api GET /api/public/books/:idBook", () => {
  beforeEach(async () => {});
  afterEach(async () => {
    await deleteAllBook();
  });

  it("should can get book by id", async () => {
    const book = await createBook();
    const result = await supertest(app).get("/api/public/books/" + book.id);

    expect(result.status).toBe(200);
    expect(result.body.data.title).toBe("test");
  });
  it("should cant get book karena buku tidak ada", async () => {
    const book = await createBook();
    const result = await supertest(app).get("/api/public/books/" + book.id + 1);

    expect(result.status).toBe(404);
    // expect(result.body.data.title).toBe("test");
  });
  it("should cant get book karena id tidak ada", async () => {
    const book = await createBook();
    const result = await supertest(app).get("/api/public/books/");

    expect(result.status).toBe(200);
    // expect(result.body.data.title).toBe("test");
  });
});

describe("search books api GET /api/public/books", () => {
  beforeEach(async () => {
    await createBook();
    await createBook();
    await createBook();
  });
  afterEach(async () => {
    await deleteAllBook();
  });
  it("should can search all", async () => {
    const books = await supertest(app).get("/api/public/books");

    expect(books.status).toBe(200);
    console.info(books.body);
  });
  it("should can search by title author totalqty availableqty", async () => {
    const books = await supertest(app).get(
      "/api/public/books?title=test&size=3"
    );
    expect(books.status).toBe(200);
    console.info(books.body);
  });
});

describe("upload file image to create book post /api/books/", () => {
  beforeAll(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await deleteAllBook();
  });
  afterAll(async () => {
    await deleteAllUsers();
  });

  it("should can upload", async () => {
    const imageBuffer = await fs.promises.readFile("./test/Capture.png");

    const book = await supertest(app)
      .post("/api/books/")
      .set("Authorization", "test")
      .field("title", "test")
      .field("author", "test")
      .field("totalQty", 1)
      .field("description", "test")
      .attach("image", imageBuffer, "image.jpg");

    console.log(book.body);
    console.log(book.body.data.image);
    expect(book.status).toBe(200);
    await fs.promises.rm("." + book.body.data.image);
  });
  it("should cant upload", async () => {
    const imageBuffer = await fs.promises.readFile("./test/Capture.png");
    // const imageBuffer = await fs.promises.readFile("./test/book.test.js");

    const book = await supertest(app)
      .post("/api/books/")
      .set("Authorization", "test")
      .field("title", "test")
      .field("author", "test")
      .field("totalQty", 1)
      .field("description", "test")
      .attach("image", imageBuffer, "image.js");

    expect(book.status).toBe(503);
    console.log(book.body.errors);
    // await fs.promises.rm("." + book.body.data.image);
  });
});
describe("update book image", () => {
  beforeAll(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await deleteAllBook();
  });
  afterAll(async () => {
    await deleteAllUsers();
  });
  it("should can update book", async () => {
    const imageBuffer = await fs.promises.readFile("./test/Capture.png");
    const idbook = await createBook();
    const book = await supertest(app)
      .put("/api/books/" + idbook.id)
      .set("Authorization", "test")
      .field("title", "test")
      .field("author", "konsol")
      .field("totalQty", 1)
      .field("description", "test")
      .attach("image", imageBuffer, "image.png");

    console.log(book.body);

    expect(book.status).toBe(200);
  });
  it("should cant update book", async () => {
    const imageBuffer = await fs.promises.readFile("./test/Capture.png");
    const idbook = await createBook();
    const book = await supertest(app)
      .put("/api/books/" + idbook.id)
      .set("Authorization", "test")
      .field("title", "test")
      .field("author", "konsol")
      .field("totalQty", 1)
      .field("description", "test")
      .attach("image", imageBuffer, "image.docx");

    console.log(book.body);

    expect(book.status).toBe(503);
  });
  it("should cant update book no id", async () => {
    const imageBuffer = await fs.promises.readFile("./test/Capture.png");
    const idbook = await createBook();
    const book = await supertest(app)
      .put("/api/books/" + idbook.id + 1)
      .set("Authorization", "test")
      .field("title", "test")
      .field("author", "konsol")
      .field("totalQty", 1)
      .field("description", "test")
      .attach("image", imageBuffer, "image.docx");

    console.log(book.body);

    expect(book.status).toBe(404);
  });
});

// reate admin
describe("create admin", () => {
  it("create admin", async () => {
    await createAdmin();
    console.log("admin");
  });
  it("rm book", async () => {
    await deleteAllBook();
    console.log("delete book");
  });
  it("delete admin", async () => {
    await deleteAllUsers();
  });
  it("cretae book", async () => {
    await createBook();
    console.log("create book");
  });
});
