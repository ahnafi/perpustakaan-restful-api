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

describe("test prisma create ", () => {
  afterEach(async () => {
    await prisma.book.deleteMany({
      where: {
        title: "test",
      },
    });
    await prisma.category.deleteMany({
      where: {
        categoryName: "test",
      },
    });
  });

  test("should ", async () => {
    const book = await prisma.book.create({
      data: {
        title: "test",
        author: "sy",
        totalQty: 10,
        availableQty: 10,
        description: "desc",
        categories: {
          create: {
            categoryName: "test",
          },
        },
      },
      include: {
        categories: true,
      },
    });

    console.log(book);
  });
});

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
