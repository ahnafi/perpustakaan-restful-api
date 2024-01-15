import supertest from "supertest";
import { prisma } from "./../src/app/database.js";
import {
  createAdmin,
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
